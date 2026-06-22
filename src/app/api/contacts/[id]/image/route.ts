import { NextResponse } from "next/server";
import { checkAccess } from "@/lib/access";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { renderContactImage } from "@/lib/contact-image";

// Отдаёт контакт картинкой с водяным знаком — только при активном доступе.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const fingerprint = new URL(request.url).searchParams.get("fp") ?? "";

  // Полная проверка: авторизация + оплата + лимит устройств.
  const access = await checkAccess(fingerprint);
  if (!access.ok) {
    return NextResponse.json({ ok: false, reason: access.reason }, { status: 403 });
  }

  // Email покупателя — для водяного знака.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const watermark = user?.email ?? access.userId;

  // Контент читаем admin-клиентом (у contacts нет публичных RLS-политик).
  const admin = createAdminClient();
  const { data: contact } = await admin
    .from("contacts")
    .select("title, body")
    .eq("id", id)
    .single();

  if (!contact) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const png = await renderContactImage({
    title: contact.title,
    body: contact.body,
    watermark,
  });

  return new NextResponse(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      // Не кэшировать: водяной знак персональный.
      "Cache-Control": "private, no-store",
    },
  });
}
