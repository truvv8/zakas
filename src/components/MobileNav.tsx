"use client";

import * as React from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";

const LINKS = [
  ["#index", "Что входит"],
  ["#pricing", "Тариф"],
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Меню"
        className="text-ink md:hidden"
      >
        <Menu className="h-6 w-6" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[70] flex w-[82%] max-w-sm flex-col bg-ivory p-6 shadow-2xl data-[state=open]:animate-slide-in-right">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl tracking-tight">
              Chevailer
            </span>
            <Dialog.Close aria-label="Закрыть" className="text-ink-soft hover:text-ink">
              <X className="h-6 w-6" />
            </Dialog.Close>
          </div>

          <nav className="mt-12 flex flex-col">
            {LINKS.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-5 font-display text-2xl text-ink"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <Link
              href="/login"
              className="border border-line-strong px-6 py-4 text-center text-[13px] uppercase tracking-[0.14em]"
            >
              Войти
            </Link>
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="bg-accent px-6 py-4 text-center text-[13px] uppercase tracking-[0.14em] text-ivory"
            >
              Получить доступ
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
