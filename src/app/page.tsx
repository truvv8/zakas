import Link from "next/link";
import { Reveal, Stagger, StaggerItem, Magnetic, Words } from "@/components/motion";
import { NetworkCanvas } from "@/components/NetworkCanvas";
import { CustomCursor } from "@/components/CustomCursor";
import { StickyCTA } from "@/components/StickyCTA";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { Ribbon } from "@/components/Ribbon";

const CATEGORIES = ["Кожа", "Фурнитура", "Текстиль", "Упаковка", "Обувь", "Аксессуары", "Логистика"];

const FEATURES = [
  { n: "01", t: "Проверено", d: "Образцы, MOQ, сроки, реальность завода. Отчёты и фото с производств." },
  { n: "02", t: "Прямые контакты", d: "Имя, мессенджер и профиль каждой фабрики. Без посредников и наценок." },
  { n: "03", t: "Обновления", d: "База пополняется и перепроверяется еженедельно. Неактуальное убираем сами." },
  { n: "04", t: "Защита", d: "Каждый контакт помечен вашим персональным водяным знаком." },
];

// Заглавный «глаз» — тонкая линия, разрядка, заглавные.
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px w-10 bg-bone/30" />
      <span className="tk-sm text-[10px] uppercase text-bone/70">{children}</span>
      <span className="h-px w-10 bg-bone/30" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="text-bone">
      <NetworkCanvas />
      <CustomCursor />
      <StickyCTA />
      <SiteHeader />

      {/* ——— Hero ——— */}
      <section className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <Reveal><Eyebrow>Закрытый реестр · Алматы · 2026</Eyebrow></Reveal>

        <h1 className="serif mt-10 text-[2.6rem] font-medium uppercase leading-[1.05] tracking-[0.04em] sm:text-[5.2rem]">
          <Words text="Прямой доступ" />
          <br />
          <span className="molten text-[0.96em] normal-case tracking-normal">
            <Words text="к фабрикам Китая" delay={0.28} />
          </span>
        </h1>

        <Reveal delay={0.6}>
          <p className="mx-auto mt-9 max-w-md text-[14px] leading-relaxed tracking-wide text-muted">
            Приватная сеть проверенных производителей. Прямые контакты без
            посредников и наценок — стройте бренд напрямую с заводом.
          </p>
        </Reveal>

        <Reveal delay={0.72}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Magnetic strength={0.3}>
              <Link href="/pricing" className="btn-bronze">Получить доступ</Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link href="#features" className="btn-ghost">Как это работает</Link>
            </Magnetic>
          </div>
        </Reveal>

        <div className="absolute bottom-8 flex flex-col items-center gap-2 text-dim">
          <span className="tk-sm text-[9px] uppercase">Листайте</span>
          <span className="h-8 w-px animate-bob bg-bone/30" />
        </div>
      </section>

      {/* ——— Категории (статично) ——— */}
      <div className="border-y border-line bg-obsidian/40 py-5 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-7 gap-y-3 px-6">
          {CATEGORIES.map((c, i) => (
            <span key={c} className="flex items-center gap-7 text-[11px] uppercase tracking-[0.28em] text-muted">
              {c}
              {i < CATEGORIES.length - 1 && <span className="h-1 w-1 rounded-full bg-bone/40" />}
            </span>
          ))}
        </div>
      </div>

      {/* ——— Возможности (нумерованный editorial) ——— */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Почему Chevailer</Eyebrow>
          <h2 className="serif mt-7 text-3xl font-medium uppercase leading-tight tracking-[0.03em] sm:text-5xl">
            Доверие — ваш <span className="molten normal-case tracking-normal">единственный ров</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[14px] leading-relaxed tracking-wide text-muted">
            Список соберёт любой. Репутацию верификатора — нет. Вы платите за
            свежесть и надёжность, а не за данные.
          </p>
        </Reveal>

        <Stagger className="mt-20 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <StaggerItem key={f.t}>
              <div className="group flex h-full flex-col bg-obsidian/70 p-8 backdrop-blur-sm transition-colors hover:bg-panel/80">
                <span className="serif text-3xl font-normal text-bone/25 transition-colors group-hover:text-bone">{f.n}</span>
                <h3 className="mt-10 text-[13px] font-medium uppercase tracking-[0.16em]">{f.t}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{f.d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ——— Editorial-полоса с текстурой ——— */}
      <section id="editorial" className="relative border-y border-line">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Плейсхолдер-текстура (ч/б, абстрактная). Замените на свои кадры цехов/образцов. */}
          <div className="relative min-h-[58vw] overflow-hidden lg:min-h-[40rem]" aria-hidden>
            <div className="absolute inset-0" style={{ background: "linear-gradient(155deg, #f0f0f0 0%, #cfcfcf 46%, #8c8c8c 100%)" }} />
            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(0,0,0,0.05) 0 1px, transparent 1px 11px)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(120% 100% at 28% 18%, rgba(255,255,255,0.55), transparent 56%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(90% 80% at 90% 100%, rgba(0,0,0,0.18), transparent 60%)" }} />
            <span className="absolute bottom-6 left-6 tk-sm text-[10px] uppercase text-bone/35">Образец · ваше фото</span>
          </div>
          <div className="flex items-center bg-obsidian/80 px-6 py-20 backdrop-blur-sm sm:px-16">
            <Reveal className="max-w-md">
              <Eyebrow>Материя</Eyebrow>
              <h2 className="serif mt-7 text-3xl font-medium leading-[1.15] tracking-[0.02em] sm:text-[2.8rem]">
                За каждым контактом — <span className="molten">живое производство</span>
              </h2>
              <p className="mt-6 text-[14px] leading-relaxed tracking-wide text-muted">
                Мы не торгуем строчками таблицы. Каждый завод проходит проверку
                образцом и фотоотчётом: кожа, фурнитура, строчка, металл.
                Вы видите фабрику до первого сообщения.
              </p>
              <div className="mt-10 flex items-center gap-10">
                <div>
                  <div className="serif text-4xl font-medium">200+</div>
                  <div className="mt-1 tk-sm text-[10px] uppercase text-dim">фабрик в базе</div>
                </div>
                <div className="h-12 w-px bg-line" />
                <div>
                  <div className="serif text-4xl font-medium">7</div>
                  <div className="mt-1 tk-sm text-[10px] uppercase text-dim">категорий</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Фирменная лента ——— */}
      <Ribbon />

      {/* ——— Финальный CTA ——— */}
      <section className="mx-auto max-w-3xl px-6 py-32 text-center sm:py-40">
        <Reveal>
          <h2 className="serif text-4xl font-medium uppercase leading-[1.08] tracking-[0.03em] sm:text-[4.2rem]">
            Работайте с фабриками <span className="molten normal-case tracking-normal">напрямую</span>
          </h2>
          <Magnetic strength={0.25} className="mt-12 inline-block">
            <Link href="/pricing" className="btn-bronze !px-12 !py-5">Смотреть тариф — 55 000 ₸</Link>
          </Magnetic>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
