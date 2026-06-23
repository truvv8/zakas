"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

// Живой фон: тёплые мягкие пятна света, дрейфуют сами и тянутся за курсором.
export function InteractiveBg() {
  const reduce = useReducedMotion();
  const layer = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
    };
    const loop = () => {
      cur.x += (target.x - cur.x) * 0.05;
      cur.y += (target.y - cur.y) * 0.05;
      if (layer.current) {
        layer.current.style.transform = `translate3d(${cur.x * 50}px, ${cur.y * 50}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div ref={layer} className="absolute inset-[-12%] will-change-transform">
        {/* Тёплое пятно под заголовком */}
        <div
          className="absolute left-1/2 top-[0%] h-[46vw] w-[46vw] -translate-x-1/2 rounded-full blur-[90px] animate-float-c"
          style={{ background: "radial-gradient(circle, rgba(192,86,31,0.30), transparent 66%)" }}
        />
        <div
          className="absolute left-[-6%] top-[-8%] h-[58vw] w-[58vw] rounded-full blur-[85px] animate-float-a"
          style={{ background: "radial-gradient(circle, rgba(192,86,31,0.50), transparent 60%)" }}
        />
        <div
          className="absolute right-[-8%] top-[2%] h-[54vw] w-[54vw] rounded-full blur-[90px] animate-float-b"
          style={{ background: "radial-gradient(circle, rgba(176,138,79,0.46), transparent 62%)" }}
        />
        <div
          className="absolute bottom-[-14%] left-[24%] h-[52vw] w-[52vw] rounded-full blur-[100px] animate-float-c"
          style={{ background: "radial-gradient(circle, rgba(159,68,23,0.26), transparent 66%)" }}
        />
      </div>
    </div>
  );
}
