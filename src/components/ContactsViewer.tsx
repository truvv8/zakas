"use client";

import { useEffect, useState } from "react";
import { getFingerprint } from "@/lib/fingerprint";

type Contact = { id: string; title: string };

export default function ContactsViewer() {
  const [state, setState] = useState<
    | { kind: "loading" }
    | { kind: "error"; reason: string }
    | { kind: "ready"; contacts: Contact[]; fp: string }
  >({ kind: "loading" });

  useEffect(() => {
    (async () => {
      const fp = await getFingerprint();
      const res = await fetch("/api/contacts/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint: fp }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setState({ kind: "error", reason: body.reason ?? "forbidden" });
        return;
      }
      const body = await res.json();
      setState({ kind: "ready", contacts: body.contacts, fp });
    })();
  }, []);

  if (state.kind === "loading")
    return <p className="text-gray-500">Загрузка…</p>;

  if (state.kind === "error") {
    const msg =
      state.reason === "device_limit"
        ? "Достигнут лимит устройств (2). Зайдите с уже использованного устройства или отвяжите одно в списке выше."
        : state.reason === "expired"
        ? "Срок подписки истёк. Продлите оплату."
        : "Доступ закрыт.";
    return <p className="text-red-600">{msg}</p>;
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 font-semibold">Контакты поставщиков</h2>
      <p className="mb-4 text-sm text-gray-500">
        Контакты персонализированы водяным знаком. Передача доступа третьим лицам
        ведёт к блокировке без возврата средств.
      </p>
      <div className="flex flex-col gap-6">
        {state.contacts.map((c) => (
          <div key={c.id}>
            {/* Картинка с водяным знаком; fp нужен для проверки доступа */}
            <img
              src={`/api/contacts/${c.id}/image?fp=${encodeURIComponent(state.fp)}`}
              alt={c.title}
              className="max-w-full rounded border"
              draggable={false}
            />
          </div>
        ))}
        {state.contacts.length === 0 && (
          <p className="text-gray-500">Контакты пока не добавлены.</p>
        )}
      </div>
    </section>
  );
}
