import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Magnetic } from "@/components/motion";
import { NetworkCanvas } from "@/components/NetworkCanvas";
import { CustomCursor } from "@/components/CustomCursor";
import { StickyCTA } from "@/components/StickyCTA";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { Ribbon } from "@/components/Ribbon";

export const metadata: Metadata = {
  title: "Тариф — Chevailer",
  description: "Членство Chevailer: один доступ ко всей базе проверенных фабрик. 55 000 ₸ / 30 дней.",
};

const INCLUDED = [
  "Доступ ко всей базе проверенных фабрик",
  "Семь категорий производства",
  "Еженедельные обновления и перепроверка",
  "Персональный водяной знак на контактах",
  "Вход с двух устройств",
  "Помощь в подборе завода под задачу",
];

const GUARANTEES = [
  { t: "Доступ сразу", d: "Активация автоматически после оплаты — без ожидания." },
  { t: "Два устройства", d: "Один аккаунт работает на двух ваших устройствах." },
  { t: "Без сюрпризов", d: "Членство на 30 дней, продление — только по желанию." },
];

const FAQ = [
  ["Как открывается доступ?", "Сразу после оплаты картой. Аккаунт активируется автоматически — заходите в кабинет и видите всю базу."],
  ["Что с устройствами?", "Один аккаунт — до двух устройств. Третий вход попросит выйти где-то ещё: так база защищена от перепродажи."],
  ["Можно не продлевать?", "Да. Членство на 30 дней. Не продлили — доступ просто закрывается, никаких автосписаний."],
  ["Зачем водяной знак?", "Каждый контакт помечен персонально под вас. Это удерживает ценность базы и пресекает перепродажу."],
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px w-10 bg-bone/30" />
      <span className="tk-sm text-[10px] uppercase text-bone/70">{children}</span>
      <span className="h-px w-10 bg-bone/30" />
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="text-bone">
      <NetworkCanvas />
      <CustomCursor />
      <StickyCTA />
      <SiteHeader />

      {/* ——— Заголовок тарифа ——— */}
      <section className="mx-auto max-w-3xl px-6 pt-40 pb-16 text-center sm:pt-48">
        <Reveal><Eyebrow>Членство · Тариф</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h1 className="serif mt-8 text-4xl font-medium uppercase leading-[1.06] tracking-[0.03em] sm:text-6xl">
            Одно членство. <span className="molten normal-case tracking-normal">Вся база.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-md text-[14px] leading-relaxed tracking-wide text-muted">
            Никаких уровней и доплат. Один доступ открывает весь реестр
            проверенных фабрик и все категории производства.
          </p>
        </Reveal>
      </section>

      {/* ——— Карточка тарифа ——— */}
      <section className="mx-auto max-w-md px-6 pb-24">
        <Reveal>
          <div className="glass-strong refract">
            <div className="border-b border-line p-10 text-center">
              <div className="tk-sm text-[10px] uppercase text-muted">Chevailer Access</div>
              <div className="serif mt-6 text-6xl font-medium italic tracking-tight">55 000 ₸</div>
              <p className="mt-4 tk-sm text-[10px] uppercase text-dim">30 дней · продлевается</p>
            </div>
            <div className="p-10">
              <ul className="space-y-4">
                {INCLUDED.map((f) => (
                  <li key={f} className="flex items-start gap-4 text-[13px] tracking-wide text-bone/90">
                    <span className="mt-2 h-px w-5 shrink-0 bg-bone/50" /> {f}
                  </li>
                ))}
              </ul>
              <Magnetic strength={0.2} className="mt-10">
                <Link href="/login" className="btn-bronze w-full">Оформить доступ</Link>
              </Magnetic>
              <p className="mt-4 text-center tk-sm text-[10px] uppercase text-dim">Оплата картой · Доступ сразу</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ——— Гарантии ——— */}
      <section className="border-y border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px bg-line sm:grid-cols-3">
          {GUARANTEES.map((g) => (
            <div key={g.t} className="bg-obsidian/70 px-8 py-12 text-center backdrop-blur-sm">
              <h3 className="text-[13px] font-medium uppercase tracking-[0.16em]">{g.t}</h3>
              <p className="mx-auto mt-3 max-w-xs text-[13px] leading-relaxed text-muted">{g.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ——— Фирменная лента ——— */}
      <Ribbon label="Реестр" />

      {/* ——— FAQ ——— */}
      <section className="mx-auto max-w-3xl px-6 py-28 sm:py-32">
        <Reveal className="text-center"><Eyebrow>Вопросы</Eyebrow></Reveal>
        <div className="mt-14 border-t border-line">
          {FAQ.map(([q, a]) => (
            <Reveal key={q} className="grid grid-cols-1 gap-3 border-b border-line py-8 sm:grid-cols-[0.9fr_1.1fr] sm:gap-10">
              <h3 className="serif text-xl font-medium tracking-[0.01em]">{q}</h3>
              <p className="text-[14px] leading-relaxed tracking-wide text-muted">{a}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— Финальный CTA ——— */}
      <section className="mx-auto max-w-3xl px-6 pb-32 text-center">
        <Reveal>
          <h2 className="serif text-3xl font-medium uppercase leading-[1.1] tracking-[0.03em] sm:text-5xl">
            Готовы <span className="molten normal-case tracking-normal">начать?</span>
          </h2>
          <Magnetic strength={0.25} className="mt-10 inline-block">
            <Link href="/login" className="btn-bronze !px-12 !py-5">Оформить доступ — 55 000 ₸</Link>
          </Magnetic>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
