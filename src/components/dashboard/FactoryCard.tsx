"use client";

import { MapPin, ShieldCheck, Star } from "lucide-react";
import type { Factory } from "@/lib/factories";
import { Button } from "@/components/ui/button";

export function Stars({ rating, className = "h-3.5 w-3.5" }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={className}
            fill={s <= Math.round(rating) ? "var(--color-bronze)" : "transparent"}
            stroke={s <= Math.round(rating) ? "var(--color-bronze)" : "var(--color-dim)"}
            strokeWidth={1.5}
          />
        ))}
      </span>
      <span className="text-xs font-medium text-muted tabular-nums">{rating.toFixed(1)}</span>
    </span>
  );
}

export function FactoryCard({ factory, onView }: { factory: Factory; onView: (f: Factory) => void }) {
  return (
    <div className="glass refract group overflow-hidden">
      <div className="relative h-44 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={factory.image}
          alt={factory.name}
          className="h-full w-full object-cover opacity-80 grayscale-[40%] transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="glass px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-bone">{factory.category}</span>
          {factory.verified && (
            <span className="inline-flex items-center gap-1 rounded bg-obsidian/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-bone backdrop-blur">
              <ShieldCheck className="h-3 w-3 text-bronze" /> Проверено
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-base font-semibold leading-tight">{factory.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
          <MapPin className="h-3.5 w-3.5" /> {factory.location}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] text-dim">MOQ</div>
            <div className="text-base font-semibold">{factory.moq} шт</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] text-dim">Срок</div>
            <div className="text-base font-semibold">{factory.leadTime}</div>
          </div>
          <Stars rating={factory.rating} />
        </div>

        <Button variant="ghost" size="sm" className="mt-5 w-full" onClick={() => onView(factory)}>
          Показать контакты
        </Button>
      </div>
    </div>
  );
}
