"use client";

import * as React from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { PonyMark } from "@/components/PonyMark";

const LINKS = [
  ["/#features", "Возможности"],
  ["/#editorial", "О реестре"],
  ["/pricing", "Тариф"],
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger aria-label="Меню" className="text-bone md:hidden">
        <Menu className="h-6 w-6" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-[rgba(58,42,28,0.42)] backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[70] flex w-[82%] max-w-sm flex-col border-l border-line bg-obsidian/95 p-6 backdrop-blur-xl data-[state=open]:animate-slide-in-right">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-bone">
              <PonyMark className="h-5 w-5 text-bronze" /> Chevailer
            </span>
            <Dialog.Close aria-label="Закрыть" className="text-muted hover:text-bone">
              <X className="h-6 w-6" />
            </Dialog.Close>
          </div>
          <nav className="mt-12 flex flex-col">
            {LINKS.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}
                className="border-b border-line py-5 text-xl text-bone">
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <Link href="/login" onClick={() => setOpen(false)} className="btn-ghost">Войти</Link>
            <Link href="/pricing" onClick={() => setOpen(false)} className="btn-bronze">Получить доступ</Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
