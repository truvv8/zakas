"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// Вход/регистрация по «магической ссылке» (OTP на email).
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <main className="font-sans text-ink">
      <header className="border-b border-line">
        <div className="mx-auto flex h-[68px] max-w-6xl items-center px-6">
          <Link href="/" className="font-display text-2xl tracking-tight">Chevailer</Link>
        </div>
      </header>

      <div className="mx-auto flex min-h-[calc(100dvh-68px)] max-w-md flex-col justify-center px-6 py-16">
        <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-accent">
          <span className="h-px w-6 bg-accent" />
          Частный доступ
        </p>
        <h1 className="mt-6 font-display text-5xl tracking-tight">Вход</h1>
        <p className="mt-4 text-muted">
          Введите почту — пришлём ссылку для входа. На один аккаунт — до двух
          устройств.
        </p>

        {sent ? (
          <div className="mt-9 border border-line bg-paper p-7">
            <p className="font-display text-2xl">Проверьте почту</p>
            <p className="mt-2 text-muted">
              Ссылка для входа отправлена на <span className="text-ink">{email}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-muted">
                Электронная почта
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-line-strong bg-paper px-4 py-3.5 outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-accent px-7 py-4 text-[13px] uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-accent-deep disabled:opacity-50"
            >
              {loading ? "Отправляем…" : "Получить ссылку для входа"}
            </button>
            {error && <p className="text-sm text-accent-deep">{error}</p>}
          </form>
        )}

        <p className="mt-9 text-sm leading-relaxed text-muted">
          Оформляя доступ, вы соглашаетесь с условиями: доступ персональный,
          передача третьим лицам ведёт к блокировке без возврата средств.
        </p>
      </div>
    </main>
  );
}
