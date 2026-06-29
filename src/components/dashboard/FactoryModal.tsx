"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X, MapPin, ShieldCheck, MessageSquare } from "lucide-react";
import type { Factory } from "@/lib/factories";
import { Button } from "@/components/ui/button";
import { Stars } from "./FactoryCard";

export function FactoryModal({ factory, onClose }: { factory: Factory | null; onClose: () => void }) {
  return (
    <Dialog.Root open={!!factory} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-obsidian/70 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content className="glass-strong fixed left-1/2 top-1/2 z-[70] max-h-[90vh] w-[94vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto p-6 focus:outline-none data-[state=open]:animate-fade-in sm:p-8">
          {factory && (
            <>
              <div className="flex items-start justify-between">
                <Dialog.Title className="text-2xl font-semibold">{factory.name}</Dialog.Title>
                <Dialog.Close className="text-muted transition-colors hover:text-bone" aria-label="Закрыть">
                  <X className="h-5 w-5" />
                </Dialog.Close>
              </div>
              <p className="mt-1 flex items-center gap-3 text-sm text-muted">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {factory.location}</span>
                {factory.verified && <span className="inline-flex items-center gap-1 text-bronze"><ShieldCheck className="h-4 w-4" /> Проверено</span>}
                <Stars rating={factory.rating} />
              </p>

              <div className="mt-6 grid grid-cols-3 border border-line">
                {[["Мин. заказ", `${factory.moq} шт`], ["Срок", factory.leadTime], ["Категория", factory.category]].map(([k, v], i) => (
                  <div key={k} className={i > 0 ? "border-l border-line p-4" : "p-4"}>
                    <div className="text-[11px] uppercase tracking-[0.1em] text-dim">{k}</div>
                    <div className="mt-1 text-lg font-semibold">{v}</div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[14px] leading-relaxed text-muted">{factory.description}</p>

              <div className="mt-6">
                <h4 className="text-[11px] uppercase tracking-[0.16em] text-dim">Сертификаты</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {factory.certifications.map((c) => (
                    <span key={c} className="border border-line-strong px-3 py-1 text-xs text-bone/80">{c}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-[11px] uppercase tracking-[0.16em] text-dim">Отзывы участников</h4>
                <div className="mt-3 space-y-3">
                  {factory.reviews.map((r, i) => (
                    <div key={i} className="glass p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{r.author}</span>
                        <Stars rating={r.rating} />
                      </div>
                      <p className="mt-1 text-sm text-muted">«{r.comment}»</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Контакт с водяным знаком */}
              <div className="glass relative mt-6 overflow-hidden p-5">
                <div className="text-[11px] uppercase tracking-[0.16em] text-dim">Прямой контакт</div>
                <div className="mt-2 select-none blur-[6px]">
                  <p className="text-lg font-semibold">WeChat: chv_{factory.id} · +86 1•• •••• ••••</p>
                  <p className="text-sm text-muted">factory@{factory.id}.example</p>
                </div>
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="-rotate-12 text-2xl font-semibold text-bone/10">you@email.com</span>
                </span>
              </div>

              <div className="mt-6 flex gap-3">
                <Button className="flex-1">Запросить интро / открыть контакт</Button>
                <Button variant="ghost" aria-label="Написать"><MessageSquare className="h-4 w-4" /></Button>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
