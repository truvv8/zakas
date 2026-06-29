"use client";

import Link from "next/link";
import { Factory, Star, MessageSquare, FileText, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { id: "catalog", label: "База фабрик", icon: Factory },
  { id: "saved", label: "Избранное", icon: Star },
  { id: "requests", label: "Запросы", icon: MessageSquare },
  { id: "docs", label: "Шаблоны и чек-листы", icon: FileText },
  { id: "settings", label: "Настройки", icon: Settings },
];

export function Sidebar({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-obsidian/80 backdrop-blur-xl lg:flex">
      <div className="flex h-[68px] items-center gap-2 border-b border-line px-6">
        <span className="text-lg font-semibold tracking-tight text-bone">Chevailer</span>
        <span className="h-1.5 w-1.5 rounded-full bg-bronze" />
      </div>

      <div className="border-b border-line px-4 py-4">
        <div className="glass flex items-center justify-between px-3 py-2.5">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow" />
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-bone">Доступ активен</span>
          </span>
          <span className="text-[11px] text-dim">до 23.07</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {ITEMS.map((item) => {
          const Ico = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-sm transition-colors",
                isActive ? "glass text-bone" : "text-muted hover:bg-white/[0.04] hover:text-bone"
              )}
            >
              <Ico className={cn("h-[18px] w-[18px]", isActive ? "text-bronze" : "")} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-line p-4">
        <Link href="/" className="flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-bone">
          <LogOut className="h-[18px] w-[18px]" /> Выйти
        </Link>
      </div>
    </aside>
  );
}
