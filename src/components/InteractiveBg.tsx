"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

// Монохромный фон: mesh-grid + мягкие серые орбы, тянутся за курсором.
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
      if (layer.current) layer.current.style.transform = `translate3d(${cur.x * 44}px, ${cur.y * 44}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [reduce]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-obsidian">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div ref={layer} className="absolute inset-[-12%] will-change-transform">
        <div
          className="absolute left-[-6%] top-[-10%] h-[55vw] w-[55vw] rounded-full blur-[100px] animate-float-a"
          style={{ background: "radial-gradient(circle, rgba(0,0,0,0.05), transparent 62%)" }}
        />
        <div
          className="absolute right-[-8%] top-[6%] h-[48vw] w-[48vw] rounded-full blur-[110px] animate-float-b"
          style={{ background: "radial-gradient(circle, rgba(0,0,0,0.04), transparent 64%)" }}
        />
        <div
          className="absolute bottom-[-14%] left-[28%] h-[50vw] w-[50vw] rounded-full blur-[120px] animate-float-c"
          style={{ background: "radial-gradient(circle, rgba(0,0,0,0.05), transparent 66%)" }}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-obsidian to-transparent" />
    </div>
  );
}
