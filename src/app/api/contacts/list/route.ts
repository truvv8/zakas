import { NextResponse } from "next/server";
import { checkAccess } from "@/lib/access";
import { createAdminClient } from "@/lib/supabase/server";

// Список контактов (id + заголовок). Сам контакт отдаётся отдельно картинкой.
export async function POST(request: Request) {
  const { fingerprint } = await request
    .json()
    .catch(() => ({ fingerprint: "" }));

  const access = await checkAccess(String(fingerprint ?? ""));
  if (!access.ok) {
    return NextResponse.json({ ok: false, reason: access.reason }, { status: 403 });
  }

  const admin = createAdminClient();
  const { data } = await admin
    .from("contacts")
    .select("id, title")
    .order("sort_order", { ascending: true });

  return NextResponse.json({ ok: true, contacts: data ?? [] });
}
