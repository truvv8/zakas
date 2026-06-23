import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Counter } from "@/components/motion";
import { MobileNav } from "@/components/MobileNav";
import { StickyCTA } from "@/components/StickyCTA";
import { InteractiveBg } from "@/components/InteractiveBg";

const STATS = [
  { num: 120, suffix: "+", k: "поставщиков" },
  { num: 7, suffix: "", k: "категорий" },
  { num: 2, suffix: "", k: "устройства" },
];

const INDEX = [
  ["Прямые контакты", "Без посредников и наценок."],
  ["Еженедельные обновления", "База перепроверяется."],
  ["Персональная защита", "Водяной знак на контактах."],
  ["Два устройства", "Телефон и компьютер."],
];

const FEATURES = [
  "Все поставщики Chevailer",
  "7 категорий: кожа, фурнитура, текстиль…",
  "Еженедельные обновления",
  "Персональный водяной знак",
  "Доступ с двух устройств",
];

export default function Home() {
  return (
    <main className="relative font-sans text-ink">
      <InteractiveBg />
      <StickyCTA />

      {/* ——— Шапка ——— */}
      <header className="sticky top-0 z-50 border-b border-line/60 bg-ivory/70 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
          <Link href="/" className="font-display text-2xl tracking-tight">Chevailer</Link>
          <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
            <a href="#index" className="u hover:text-ink">Что входит</a>
            <a href="#pricing" className="u hover:text-ink">Тариф</a>
            <Link href="/login" className="u hover:text-ink">Войти</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild size="sm" variant="ink" className="hidden md:inline-flex">
              <Link href="#pricing">Получить доступ</Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </header>

      {/* ——— Hero ——— */}
      <section className="relative mx-auto max-w-3xl px-6 pt-28 pb-28 text-center sm:pt-40 sm:pb-36">
        <Reveal>
          <h1 className="font-display text-[3.2rem] leading-[1.03] tracking-[-0.015em] text-balance sm:text-[5rem]">
            Поставщики вне <span className="italic text-accent">открытого доступа</span>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-md text-lg text-muted">
            Chevailer — закрытый доступ к проверенным фабрикам. Без посредников.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-11 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#pricing">
                Получить доступ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <div className="text-sm text-muted">
              <span className="font-display text-xl text-ink">55 000 ₸</span> / 30 дней
            </div>
          </div>
        </Reveal>
      </section>

      {/* ——— Цифры ——— */}
      <section className="border-y border-line bg-paper">
        <div className="mx-auto grid max-w-3xl grid-cols-3 px-6">
          {STATS.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.08} className={i > 0 ? "border-l border-line" : ""}>
              <div className="py-10 text-center">
                <div className="font-display text-4xl"><Counter value={s.num} suffix={s.suffix} /></div>
                <div className="mt-1 text-sm text-muted">{s.k}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— Что входит ——— */}
      <section id="index" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <Reveal>
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">Что входит</h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {INDEX.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 2) * 0.08}>
              <div className="h-full bg-ivory p-8 sm:p-10">
                <h3 className="font-display text-2xl">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— Тариф ——— */}
      <section id="pricing" className="border-t border-line bg-paper">
        <div className="mx-auto max-w-xl px-6 py-24 sm:py-28">
          <Reveal className="mx-auto mb-10 max-w-md text-center">
            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">Один доступ. Вся база.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border border-line-strong bg-ivory p-2">
              <div className="relative border border-line p-8 sm:p-12">
                <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-brass" />
                <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-brass" />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted">Полный доступ</span>
                  <span className="bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
                    Набор ограничен
                  </span>
                </div>
                <div className="mt-6 font-display text-7xl leading-none tracking-tight">55 000 ₸</div>
                <p className="mt-3 text-muted">за 30 дней · продлевается</p>
                <div className="my-8 hairline-brass" />
                <ul className="space-y-3">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-ink-soft">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="mt-9 w-full">
                  <Link href="/login">
                    Оформить доступ
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <p className="mt-4 text-center text-[13px] text-muted">Оплата картой · Доступ сразу</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— Финальный CTA ——— */}
      <section className="relative px-6 py-28 text-center sm:py-36">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="font-display text-5xl leading-tight tracking-tight text-balance sm:text-6xl">
            Откройте Chevailer сегодня
          </h2>
          <Button asChild size="lg" className="mt-9">
            <Link href="/login">
              Получить доступ — 55 000 ₸
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </section>

      {/* ——— Подвал ——— */}
      <footer className="border-t border-line bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-display text-xl tracking-tight text-ink">Chevailer</Link>
          <span>© 2026 Chevailer · Алматы</span>
        </div>
      </footer>
    </main>
  );
}
