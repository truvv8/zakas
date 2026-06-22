import { createClient, createAdminClient } from "@/lib/supabase/server";

const MAX_DEVICES = Number(process.env.MAX_DEVICES ?? 2);

export type AccessResult =
  | { ok: true; userId: string }
  | { ok: false; reason: "unauthenticated" | "unpaid" | "expired" | "device_limit" };

// Считает подписку активной: статус paid и срок не истёк.
function isSubscriptionActive(p: {
  status: string;
  access_until: string | null;
}): boolean {
  if (p.status !== "paid") return false;
  if (!p.access_until) return false;
  return new Date(p.access_until).getTime() > Date.now();
}

/**
 * Единая точка проверки доступа к закрытому контенту.
 * Проверяет: авторизацию -> активную подписку -> лимит устройств.
 * Регистрирует устройство при первом заходе (если есть свободный слот).
 */
export async function checkAccess(fingerprint: string): Promise<AccessResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false, reason: "unauthenticated" };

  // Чтение профиля и запись устройств — через admin-клиент,
  // чтобы пользователь не мог обойти лимит, дёргая БД сам.
  const admin = createAdminClient();

  const { data: profile } = await admin
    .from("profiles")
    .select("status, access_until")
    .eq("id", user.id)
    .single();

  if (!profile) return { ok: false, reason: "unpaid" };
  if (profile.status !== "paid") return { ok: false, reason: "unpaid" };
  if (!isSubscriptionActive(profile)) return { ok: false, reason: "expired" };

  if (!fingerprint) return { ok: false, reason: "device_limit" };

  // Уже известное устройство — обновляем last_seen и пускаем.
  const { data: existing } = await admin
    .from("devices")
    .select("id")
    .eq("user_id", user.id)
    .eq("fingerprint", fingerprint)
    .maybeSingle();

  if (existing) {
    await admin
      .from("devices")
      .update({ last_seen: new Date().toISOString() })
      .eq("id", existing.id);
    return { ok: true, userId: user.id };
  }

  // Новое устройство — проверяем лимит.
  const { count } = await admin
    .from("devices")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  if ((count ?? 0) >= MAX_DEVICES) {
    return { ok: false, reason: "device_limit" };
  }

  // Есть свободный слот — регистрируем устройство.
  // unique(user_id, fingerprint) + проверка count защищают от гонок.
  const { error } = await admin.from("devices").insert({
    user_id: user.id,
    fingerprint,
  });

  // Если параллельный запрос успел занять слот — считаем лимитом.
  if (error) return { ok: false, reason: "device_limit" };

  return { ok: true, userId: user.id };
}
