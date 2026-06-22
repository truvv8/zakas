import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { createAdminClient } from "@/lib/supabase/server";

const SUBSCRIPTION_DAYS = Number(process.env.SUBSCRIPTION_DAYS ?? 30);

// CloudPayments подписывает тело запроса HMAC-SHA256 (base64) с API-секретом,
// и кладёт подпись в заголовок Content-HMAC.
function verifySignature(rawBody: string, headerHmac: string | null): boolean {
  if (!headerHmac) return false;
  const secret = process.env.CLOUDPAYMENTS_API_SECRET!;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");
  // Сравнение в постоянное время.
  const a = Buffer.from(expected);
  const b = Buffer.from(headerHmac);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const hmac = request.headers.get("Content-HMAC") ?? request.headers.get("X-Content-HMAC");

  if (!verifySignature(rawBody, hmac)) {
    // Невалидная подпись — отклоняем, доступ не трогаем.
    return NextResponse.json({ code: 13 }); // 13 = платёж не принят
  }

  // Тело приходит как application/x-www-form-urlencoded.
  const params = new URLSearchParams(rawBody);
  const accountId = params.get("AccountId"); // сюда кладём user.id при оплате
  const transactionId = params.get("TransactionId");
  const amount = params.get("Amount");
  const status = params.get("Status"); // "Completed" для успешной оплаты

  if (!accountId || !transactionId) {
    return NextResponse.json({ code: 13 });
  }

  const admin = createAdminClient();

  // Идемпотентность: повторный webhook по тому же TransactionId не навредит.
  await admin.from("payments").upsert(
    {
      user_id: accountId,
      amount: Number(amount ?? 0),
      currency: params.get("Currency") ?? "KZT",
      provider: "cloudpayments",
      provider_payment_id: transactionId,
      status: status ?? "unknown",
      raw: Object.fromEntries(params.entries()),
    },
    { onConflict: "provider,provider_payment_id" }
  );

  // Доступ выдаём только при успешном платеже.
  if (status === "Completed") {
    // Продлеваем: если подписка ещё активна — от её конца, иначе от now.
    const { data: profile } = await admin
      .from("profiles")
      .select("access_until")
      .eq("id", accountId)
      .single();

    const now = Date.now();
    const base =
      profile?.access_until && new Date(profile.access_until).getTime() > now
        ? new Date(profile.access_until).getTime()
        : now;
    const accessUntil = new Date(base + SUBSCRIPTION_DAYS * 86400_000);

    await admin
      .from("profiles")
      .update({ status: "paid", access_until: accessUntil.toISOString() })
      .eq("id", accountId);
  }

  // CloudPayments ждёт { code: 0 } как подтверждение приёма.
  return NextResponse.json({ code: 0 });
}
