import { NextResponse } from "next/server";
import { checkAccess } from "@/lib/access";

// Клиент шлёт fingerprint, получает статус доступа.
// Используется страницей кабинета перед показом контента.
export async function POST(request: Request) {
  const { fingerprint } = await request.json().catch(() => ({ fingerprint: "" }));

  const result = await checkAccess(String(fingerprint ?? ""));

  if (result.ok) {
    return NextResponse.json({ ok: true });
  }

  const status = result.reason === "unauthenticated" ? 401 : 403;
  return NextResponse.json({ ok: false, reason: result.reason }, { status });
}
