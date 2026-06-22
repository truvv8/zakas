import Link from "next/link";

/* ——— Иконки ——— */
function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Plus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-accent">
      <span className="h-px w-6 bg-accent" />
      {children}
    </p>
  );
}

/* ——— Контент ——— */
const STATS = [
  ["120+", "проверенных поставщиков"],
  ["7", "товарных категорий"],
  ["еженедельно", "пополнение реестра"],
  ["2", "устройства на доступ"],
];

const PROBLEMS = [
  ["Посредники и наценки", "Между вами и фабрикой — цепочка перекупщиков. Цена растёт, прозрачности нет."],
  ["Фейки и предоплаты в никуда", "Случайные контакты из чатов оборачиваются потерянными деньгами и временем."],
  ["Месяцы на проверку", "Найти, написать, проверить, договориться — всё это вы делаете в одиночку и вслепую."],
];

const INDEX = [
  ["01", "Прямые контакты", "Имя, мессенджер и профиль каждого поставщика — без посредников и наценок."],
  ["02", "Еженедельные обновления", "Реестр пополняется и перепроверяется. Неактуальное мы убираем сами."],
  ["03", "Персональная защита", "Каждый контакт помечен вашим водяным знаком — передать базу незаметно нельзя."],
  ["04", "Доступ с двух устройств", "Телефон и компьютер. Спокойно работайте откуда удобно."],
];

const STEPS = [
  ["01", "Оформляете доступ", "Оплата картой. Доступ открывается в ту же минуту."],
  ["02", "Открываете реестр", "Вся база поставщиков по категориям — в личном кабинете."],
  ["03", "Пишете напрямую", "Связываетесь с фабриками сами, без посредников между вами."],
];

const REVIEWS = [
  ["Нашёл поставщика кожи за вечер. То, что я искал полгода по чатам.", "Дамир", "Алматы"],
  ["Прямые контакты — это другое качество работы. Цены сразу честнее.", "Аяна", "Астана"],
  ["Реестр реально обновляется. Видно, что за базой следят.", "Тимур", "Шымкент"],
];

const FEATURES = [
  "Доступ ко всему реестру поставщиков",
  "Контакты по 7 категориям: кожа, фурнитура, текстиль и др.",
  "Еженедельные обновления и перепроверка",
  "Персональный водяной знак на каждом контакте",
  "Вход с двух устройств",
  "Поддержка в мессенджере",
];

const FAQ = [
  ["Это легально?", "Да. Реестр — это контакты производителей и оптовых поставщиков. Мы не используем чужие торговые марки и не торгуем контрафактом."],
  ["Что если поставщик не ответит?", "В реестре только проверенные действующие контакты. База перепроверяется еженедельно, неактуальное удаляется."],
  ["Можно ли пользоваться с телефона и компьютера?", "Да, доступ работает с двух устройств на один аккаунт одновременно."],
  ["Как защищены контакты?", "Каждый контакт показывается с вашим персональным водяным знаком. Передать базу незаметно третьим лицам не получится."],
  ["Что с возвратом?", "Условия возврата описаны в оферте. Доступ персональный: после открытия базы и передачи доступа третьим лицам возврат не предусмотрен."],
];

export default function Home() {
  return (
    <main className="font-sans text-ink">
      {/* ——— Анонс ——— */}
      <div className="bg-ink text-center text-[12px] tracking-[0.04em] text-ivory/85">
        <p className="px-5 py-2.5">
          Закрытый набор открыт · Доступ открывается сразу после оплаты
        </p>
      </div>

      {/* ——— Шапка ——— */}
      <header className="sticky top-0 z-50 border-b border-line/70 bg-ivory/85 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-baseline gap-2.5">
            <span className="font-display text-2xl font-semibold tracking-tight">Реестр</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
            <a href="#problem" className="u hover:text-ink">Зачем</a>
            <a href="#index" className="u hover:text-ink">Что входит</a>
            <a href="#reviews" className="u hover:text-ink">Отзывы</a>
            <a href="#pricing" className="u hover:text-ink">Тариф</a>
          </nav>
          <div className="flex items-center gap-5">
            <Link href="/login" className="u hidden text-sm text-ink-soft hover:text-ink sm:inline">Войти</Link>
            <Link
              href="#pricing"
              className="bg-ink px-5 py-2.5 text-[12px] uppercase tracking-[0.12em] text-ivory transition-colors hover:bg-accent"
            >
              Получить доступ
            </Link>
          </div>
        </div>
      </header>

      {/* ——— Hero ——— */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-6 pt-24 pb-20 text-center sm:pt-32 sm:pb-28">
          <div className="fade flex justify-center" style={{ ["--d" as string]: "0ms" }}>
            <Eyebrow>Частный доступ · Алматы</Eyebrow>
          </div>

          <h1
            className="fade mt-7 font-display text-[2.9rem] leading-[1.05] tracking-[-0.01em] text-balance sm:text-[4.5rem]"
            style={{ ["--d" as string]: "80ms" }}
          >
            Поставщики, которых нет
            <br className="hidden sm:block" /> в <span className="italic text-accent">открытом доступе</span>
          </h1>

          <p
            className="fade mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted text-pretty"
            style={{ ["--d" as string]: "160ms" }}
          >
            Закрытый реестр проверенных производителей. Прямые контакты —
            без посредников, наценок и случайных людей. Только проверенные связи.
          </p>

          <div
            className="fade mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ ["--d" as string]: "240ms" }}
          >
            <Link
              href="#pricing"
              className="group inline-flex w-full items-center justify-center gap-2.5 bg-accent px-8 py-4 text-[13px] uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-accent-deep sm:w-auto"
            >
              Получить доступ — 55 000 ₸
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#index"
              className="inline-flex w-full items-center justify-center border border-line-strong px-8 py-4 text-[13px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-bone sm:w-auto"
            >
              Что входит
            </a>
          </div>

          <p className="fade mt-6 text-[13px] text-muted" style={{ ["--d" as string]: "300ms" }}>
            Оплата картой · Доступ сразу · Персональная защита контактов
          </p>
        </div>
      </section>

      {/* ——— Цифры ——— */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-6 lg:grid-cols-4">
          {STATS.map(([v, k], i) => (
            <div
              key={k}
              className={`px-2 py-10 text-center ${i > 0 ? "border-line lg:border-l" : ""} ${i % 2 === 1 ? "border-l border-line lg:border-l" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""}`}
            >
              <div className="font-display text-3xl sm:text-4xl">{v}</div>
              <div className="mx-auto mt-2 max-w-[12rem] text-sm text-muted">{k}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ——— Проблема ——— */}
      <section id="problem" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow>Почему это сложно</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
              Найти настоящего поставщика — почти невозможно
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Рынок закрыт, контакты передают из рук в руки. Самостоятельный поиск
              стоит месяцев и денег — и редко заканчивается фабрикой.
            </p>
          </div>
          <div className="divide-y divide-line border-t border-line">
            {PROBLEMS.map(([t, d]) => (
              <div key={t} className="py-7">
                <h3 className="font-display text-2xl">{t}</h3>
                <p className="mt-2 max-w-xl text-muted text-pretty">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Что входит ——— */}
      <section id="index" className="border-y border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center"><Eyebrow>Что входит</Eyebrow></div>
            <h2 className="mt-6 font-display text-4xl tracking-tight text-balance sm:text-5xl">
              Всё для прямых поставок
            </h2>
            <p className="mt-5 text-lg text-muted">
              Один доступ — и реестр поставщиков всегда под рукой: с защитой,
              категориями и обновлениями.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {INDEX.map(([n, t, d]) => (
              <div key={n} className="bg-paper p-8 sm:p-10">
                <span className="font-display text-2xl italic text-accent">{n}</span>
                <h3 className="mt-4 font-display text-2xl">{t}</h3>
                <p className="mt-3 leading-relaxed text-muted text-pretty">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Как работает + досье ——— */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Eyebrow>Как это работает</Eyebrow>
            <h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl">Три шага до фабрики</h2>
            <div className="mt-10 space-y-8">
              {STEPS.map(([n, t, d]) => (
                <div key={n} className="flex gap-6">
                  <span className="font-display text-2xl italic text-accent">{n}</span>
                  <div className="border-t border-line pt-1">
                    <h3 className="font-display text-xl">{t}</h3>
                    <p className="mt-1.5 max-w-sm text-muted">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Досье поставщика */}
          <div className="relative">
            <div className="border border-line bg-paper p-2 shadow-[0_30px_60px_-30px_rgba(60,45,30,0.28)]">
              <div className="border border-line-strong p-7 sm:p-9">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <span className="font-display text-xl">Реестр поставщиков</span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Закрыто
                  </span>
                </div>

                <div className="relative mt-5 divide-y divide-line">
                  {[
                    ["Кожевенная мануфактура", "Алматы"],
                    ["Фурнитура и литьё", "скрыто"],
                    ["Текстиль · подкладка", "скрыто"],
                    ["Упаковка под заказ", "скрыто"],
                  ].map(([name, loc], i) => (
                    <div key={name} className="flex items-center justify-between py-3.5">
                      <div className="flex items-center gap-3.5">
                        <span className="font-display text-lg italic text-muted">{String(i + 1).padStart(2, "0")}</span>
                        <span className={i > 0 ? "select-none blur-[5px]" : "font-medium"}>
                          {i > 0 ? "Контакт скрыт до оплаты" : name}
                        </span>
                      </div>
                      <span className="text-sm text-muted">{loc}</span>
                    </div>
                  ))}
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="-rotate-12 font-display text-3xl italic text-ink/5">you@email.com</span>
                  </span>
                </div>

                <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
                  После оплаты контакты открываются полностью — с вашим водяным знаком.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Отзывы ——— */}
      <section id="reviews" className="border-y border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center"><Eyebrow>Отзывы</Eyebrow></div>
            <h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl">Что говорят участники</h2>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {REVIEWS.map(([q, name, city]) => (
              <figure key={name} className="bg-paper p-8 sm:p-10">
                <blockquote className="font-display text-xl leading-relaxed text-ink-soft text-pretty">
                  «{q}»
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium">{name}</span>
                  <span className="text-muted"> · {city}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Тариф (конверсия) ——— */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center"><Eyebrow>Членство</Eyebrow></div>
          <h2 className="mt-6 font-display text-4xl tracking-tight text-balance sm:text-5xl">
            Один доступ. Вся база.
          </h2>
          <p className="mt-5 text-lg text-muted">
            Без скрытых платежей. Оплатили — получили реестр в ту же минуту.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-xl border border-line-strong bg-paper p-2">
          <div className="border border-line p-8 sm:p-12">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted">Полный доступ</span>
              <span className="inline-flex items-center gap-1.5 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-accent">
                Набор ограничен
              </span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="font-display text-7xl leading-none tracking-tight">55 000 ₸</span>
            </div>
            <p className="mt-3 text-muted">за 30 дней доступа · продлевается по желанию</p>

            <div className="my-8 h-px bg-line" />

            <ul className="space-y-3.5">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-1 text-accent"><Check className="h-4 w-4" /></span>
                  <span className="text-ink-soft">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/login"
              className="group mt-9 flex w-full items-center justify-center gap-2.5 bg-accent px-8 py-5 text-[13px] uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-accent-deep"
            >
              Оформить доступ
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-4 text-center text-[13px] text-muted">
              Оплата картой через CloudPayments · Доступ открывается сразу
            </p>
          </div>
        </div>
      </section>

      {/* ——— FAQ ——— */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-24 sm:py-28">
          <div className="text-center">
            <div className="flex justify-center"><Eyebrow>Вопросы</Eyebrow></div>
            <h2 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl">Коротко о главном</h2>
          </div>
          <div className="mt-12 border-t border-line">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group border-b border-line">
                <summary className="flex items-center justify-between gap-6 py-6">
                  <span className="font-display text-xl text-ink">{q}</span>
                  <Plus className="faq-plus h-5 w-5 shrink-0 text-accent" />
                </summary>
                <p className="pb-6 -mt-1 max-w-2xl leading-relaxed text-muted text-pretty">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Финальный CTA ——— */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
          <h2 className="font-display text-5xl leading-tight tracking-tight text-balance sm:text-6xl">
            Готовы работать с фабриками напрямую?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-muted">
            Откройте закрытый реестр сегодня. Доступ открывается сразу после оплаты.
          </p>
          <Link
            href="/login"
            className="group mt-10 inline-flex items-center justify-center gap-2.5 bg-ink px-9 py-4 text-[13px] uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-accent"
          >
            Получить доступ — 55 000 ₸
            <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ——— Подвал ——— */}
      <footer className="border-t border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <Link href="/" className="flex items-baseline gap-2.5">
              <span className="font-display text-2xl font-semibold tracking-tight">Реестр</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Доступ персональный. Оформляя подписку, вы соглашаетесь с условиями:
              передача доступа третьим лицам ведёт к блокировке без возврата средств.
              Реестр не использует чужие торговые марки.
            </p>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-line pt-6 text-[13px] text-muted">
            <span>© 2026 Реестр · Алматы</span>
            <Link href="/login" className="u hover:text-ink">Войти</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
