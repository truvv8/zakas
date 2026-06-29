"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { InteractiveBg } from "@/components/InteractiveBg";
import { PonyMark } from "@/components/PonyMark";

type Mode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setNotice(null);
    setPassword("");
    setConfirm("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (password.length < 8) {
      setError("Пароль должен быть не короче 8 символов.");
      return;
    }
    if (mode === "register") {
      if (!name.trim()) {
        setError("Укажите имя.");
        return;
      }
      if (password !== confirm) {
        setError("Пароли не совпадают.");
        return;
      }
    }

    setLoading(true);
    const supabase = createClient();

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name.trim() },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      if (data.session) {
        // Подтверждение почты отключено — сразу в кабинет.
        router.push("/dashboard");
        router.refresh();
      } else {
        setNotice(`Мы отправили письмо на ${email}. Подтвердите адрес, чтобы войти.`);
      }
    }
  }

  async function handleGoogle() {
    setError(null);
    setOauthLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setOauthLoading(false);
      setError(error.message);
    }
  }

  async function handleReset() {
    setError(null);
    setNotice(null);
    if (!email) {
      setError("Введите почту, чтобы восстановить пароль.");
      return;
    }
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
    });
    if (error) setError(error.message);
    else setNotice(`Ссылка для восстановления отправлена на ${email}.`);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-16 text-bone">
      <InteractiveBg />
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-bone">
          <ArrowLeft className="h-3.5 w-3.5" /> На главную
        </Link>

        <div className="glass-strong p-8 sm:p-10">
          <div className="flex items-center gap-2.5">
            <PonyMark className="h-6 w-6 text-bone" title="Chevailer" />
            <span className="tk-sm text-[15px] font-medium uppercase">Chevailer</span>
          </div>

          {/* Вкладки */}
          <div className="mt-8 flex border-b border-line">
            {(["login", "register"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`relative -mb-px flex-1 pb-3 text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  mode === m ? "text-bone" : "text-dim hover:text-muted"
                }`}
              >
                {m === "login" ? "Войти" : "Регистрация"}
                {mode === m && <span className="absolute inset-x-0 bottom-0 h-px bg-bone" />}
              </button>
            ))}
          </div>

          {notice ? (
            <div className="mt-8 border border-line bg-panel/60 p-5">
              <p className="serif text-lg font-medium">Проверьте почту</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{notice}</p>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleGoogle}
                disabled={oauthLoading}
                className="btn-ghost mt-8 w-full !justify-center"
              >
                {oauthLoading ? "Открываем…" : "Продолжить с Google"}
              </button>

              <div className="my-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.18em] text-dim">
                <span className="h-px flex-1 bg-line" /> или почтой <span className="h-px flex-1 bg-line" />
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {mode === "register" && (
                  <div>
                    <label htmlFor="name" className="mb-1 block text-[10px] uppercase tracking-[0.16em] text-dim">Имя</label>
                    <input id="name" type="text" autoComplete="name" required placeholder="Как к вам обращаться"
                      value={name} onChange={(e) => setName(e.target.value)} className="field" />
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="mb-1 block text-[10px] uppercase tracking-[0.16em] text-dim">Электронная почта</label>
                  <input id="email" type="email" autoComplete="email" required placeholder="your@email.com"
                    value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <label htmlFor="password" className="block text-[10px] uppercase tracking-[0.16em] text-dim">Пароль</label>
                    {mode === "login" && (
                      <button type="button" onClick={handleReset} className="text-[10px] uppercase tracking-[0.14em] text-dim hover:text-bone">
                        Забыли?
                      </button>
                    )}
                  </div>
                  <input id="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"}
                    required placeholder="Минимум 8 символов"
                    value={password} onChange={(e) => setPassword(e.target.value)} className="field" />
                </div>
                {mode === "register" && (
                  <div>
                    <label htmlFor="confirm" className="mb-1 block text-[10px] uppercase tracking-[0.16em] text-dim">Повторите пароль</label>
                    <input id="confirm" type="password" autoComplete="new-password" required placeholder="Ещё раз"
                      value={confirm} onChange={(e) => setConfirm(e.target.value)} className="field" />
                  </div>
                )}

                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-dim">
                  <Lock className="h-3 w-3" /> Защищённая сессия · до двух устройств
                </div>

                {error && (
                  <div className="border border-red-500/30 bg-red-500/5 p-3 text-[12px] text-red-500">{error}</div>
                )}

                <button type="submit" disabled={loading} className="btn-bronze w-full">
                  {loading ? "Минуту…" : mode === "login" ? "Войти" : "Создать аккаунт"}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 px-1 text-[11px] leading-relaxed tracking-wide text-dim">
          {mode === "register"
            ? "Создавая аккаунт, вы соглашаетесь с условиями: доступ персональный, передача третьим лицам ведёт к блокировке без возврата средств."
            : "Доступ персональный. Один аккаунт — до двух устройств."}
        </p>
      </div>
    </main>
  );
}
