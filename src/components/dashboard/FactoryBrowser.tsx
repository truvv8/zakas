"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Bell, SlidersHorizontal } from "lucide-react";
import { FACTORIES, CATEGORIES, type Factory } from "@/lib/factories";
import { Sidebar } from "./Sidebar";
import { FactoryCard } from "./FactoryCard";
import { FactoryModal } from "./FactoryModal";

export function FactoryBrowser() {
  const [tab, setTab] = React.useState("catalog");
  const [selected, setSelected] = React.useState<Factory | null>(null);
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("Все");
  const [maxMoq, setMaxMoq] = React.useState(500);
  const [minRating, setMinRating] = React.useState(0);
  const [onlyVerified, setOnlyVerified] = React.useState(false);

  const list = React.useMemo(() => {
    return FACTORIES.filter((f) => {
      if (search && !`${f.name} ${f.description}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "Все" && f.category !== category) return false;
      if (f.moq > maxMoq) return false;
      if (f.rating < minRating) return false;
      if (onlyVerified && !f.verified) return false;
      return true;
    });
  }, [search, category, maxMoq, minRating, onlyVerified]);

  return (
    <div className="min-h-screen text-bone">
      <div className="grid-bg pointer-events-none fixed inset-0 -z-10 bg-obsidian opacity-60" />
      <Sidebar active={tab} onChange={setTab} />

      <div className="lg:ml-64">
        {/* Топбар */}
        <header className="sticky top-0 z-20 flex h-[68px] items-center gap-4 border-b border-line bg-obsidian/60 px-5 backdrop-blur-xl sm:px-8">
          <Link href="/" className="text-lg font-semibold tracking-tight lg:hidden">Chevailer</Link>
          <div className="relative hidden flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dim" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию или специализации…"
              className="field max-w-md !pl-10"
            />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <button className="relative text-muted transition-colors hover:text-bone" aria-label="Уведомления">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-bronze" />
            </button>
            <div className="flex items-center gap-3 border-l border-line pl-4">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-bronze text-sm font-semibold text-[#15120c]">Ч</span>
              <div className="hidden leading-tight sm:block">
                <div className="text-sm font-medium">Участник</div>
                <div className="text-[11px] text-dim">Доступ активен</div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-5 py-8 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">База фабрик</h1>
              <p className="mt-1 text-muted">Проверенные производители Китая для вашего бренда</p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.12em]">
              <span className="glass inline-flex items-center gap-1.5 px-3 py-1.5 text-bronze">
                <span className="h-1.5 w-1.5 rounded-full bg-bronze animate-glow" /> +5 новых в этом месяце
              </span>
              <span className="border border-line px-3 py-1.5 text-muted">Обновлено сегодня</span>
            </div>
          </div>

          {/* Фильтры */}
          <div className="glass mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 p-4">
            <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-dim">
              <SlidersHorizontal className="h-4 w-4" /> Фильтры
            </span>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted">Категория</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="border border-line bg-obsidian px-2.5 py-1.5 text-sm text-bone outline-none focus:border-bronze/40">
                {["Все", ...CATEGORIES].map((c) => <option key={c} className="bg-obsidian">{c}</option>)}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted">Макс. MOQ</span>
              <input type="range" min={50} max={500} step={50} value={maxMoq}
                onChange={(e) => setMaxMoq(Number(e.target.value))} className="w-28 accent-[var(--color-bronze)]" />
              <span className="w-14 font-semibold tabular-nums">{maxMoq} шт</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted">Рейтинг</span>
              <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}
                className="border border-line bg-obsidian px-2.5 py-1.5 text-sm text-bone outline-none focus:border-bronze/40">
                <option value={0} className="bg-obsidian">Любой</option>
                <option value={4} className="bg-obsidian">4.0+</option>
                <option value={4.5} className="bg-obsidian">4.5+</option>
              </select>
            </label>
            <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={onlyVerified} onChange={(e) => setOnlyVerified(e.target.checked)}
                className="h-4 w-4 accent-[var(--color-bronze)]" />
              <span className="text-bone/90">Только проверенные</span>
            </label>
          </div>

          {list.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {list.map((f) => <FactoryCard key={f.id} factory={f} onView={setSelected} />)}
            </div>
          ) : (
            <div className="glass mt-6 py-20 text-center">
              <p className="text-xl font-semibold">Ничего не найдено</p>
              <p className="mt-1 text-sm text-muted">Измените параметры фильтров.</p>
            </div>
          )}
        </main>
      </div>

      <FactoryModal factory={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
