import { PonyMark } from "@/components/PonyMark";
import { cn } from "@/lib/utils";

// Фирменная тканевая лента Chevailer — свой вордмарк + оригинальный конь,
// строчка-пунктир по краям, медленно «бежит». Декоративный акцент.
const UNITS = 12;

export function Ribbon({
  className,
  label = "Almaty",
}: {
  className?: string;
  label?: string;
}) {
  const row = (
    <div className="flex items-center">
      {Array.from({ length: UNITS }).map((_, i) => (
        <span key={i} className="flex items-center gap-5 px-5">
          <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-white/90">Chevailer</span>
          <span className="text-[10px] uppercase tracking-[0.34em] text-white/45">{label}</span>
          <PonyMark className="h-3.5 w-3.5 text-white/80" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("ribbon relative overflow-hidden", className)} aria-hidden>
      <div className="flex w-max animate-marquee whitespace-nowrap py-4">
        {row}
        {row}
      </div>
    </div>
  );
}
