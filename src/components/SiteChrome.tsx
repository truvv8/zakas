import Link from "next/link";
import { Magnetic } from "@/components/motion";
import { MobileNav } from "@/components/MobileNav";
import { PonyMark } from "@/components/PonyMark";

// Общая шапка для всех страниц.
export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-line bg-obsidian/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <PonyMark className="h-6 w-6 text-bone" title="Chevailer" />
          <span className="tk-sm text-[15px] font-medium uppercase">Chevailer</span>
        </Link>
        <nav className="hidden items-center gap-10 text-[11px] uppercase tracking-[0.18em] text-muted md:flex">
          <Link href="/#features" className="u hover:text-bone">Возможности</Link>
          <Link href="/#editorial" className="u hover:text-bone">О реестре</Link>
          <Link href="/pricing" className="u hover:text-bone">Тариф</Link>
          <Link href="/login" className="u hover:text-bone">Войти</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Magnetic className="hidden md:block">
            <Link href="/pricing" className="btn-bronze !px-6 !py-2.5 !text-[10px]">Доступ</Link>
          </Magnetic>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

// Общий подвал.
export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-12 text-[11px] uppercase tracking-[0.16em] text-dim sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <PonyMark className="h-5 w-5 text-bone" />
          <span className="font-medium text-bone">Chevailer</span>
        </div>
        <span>© 2026 Chevailer · Алматы</span>
      </div>
    </footer>
  );
}
