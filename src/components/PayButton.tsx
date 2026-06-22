"use client";

import { useEffect, useState } from "react";

// Виджет CloudPayments. accountId = user.id — по нему webhook найдёт пользователя.
declare global {
  interface Window {
    cp?: { CloudPayments: new () => { pay: (t: string, o: object, c: object) => void } };
  }
}

export default function PayButton({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.cp) {
      setReady(true);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://widget.cloudpayments.ru/bundles/cloudpayments.js";
    s.onload = () => setReady(true);
    document.body.appendChild(s);
  }, []);

  function pay() {
    if (!window.cp) return;
    const price = Number(process.env.NEXT_PUBLIC_SUBSCRIPTION_PRICE_KZT ?? 55000);
    const widget = new window.cp.CloudPayments();
    widget.pay(
      "charge",
      {
        publicId: process.env.NEXT_PUBLIC_CLOUDPAYMENTS_PUBLIC_ID,
        description: "Подписка на доступ к базе поставщиков",
        amount: price,
        currency: "KZT",
        accountId: userId, // критично: webhook берёт отсюда AccountId
        email,
      },
      {
        onSuccess: () => window.location.reload(),
        onFail: (reason: string) => alert("Оплата не прошла: " + reason),
      }
    );
  }

  return (
    <button
      onClick={pay}
      disabled={!ready}
      className="rounded bg-black px-5 py-3 text-white disabled:opacity-50"
    >
      Оплатить подписку — 55 000 ₸
    </button>
  );
}
