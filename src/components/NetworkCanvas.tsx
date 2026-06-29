"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { PONY_PATH, PONY_CENTER } from "./PonyMark";

// Живая сеть «фабрик»: кони дрейфуют, соединяются линиями, тянутся к курсору.
export function NetworkCanvas() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pony = new Path2D(PONY_PATH);

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    type N = { x: number; y: number; vx: number; vy: number; rot: number; flip: number };
    let nodes: N[] = [];

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(18, Math.min(48, Math.floor((w * h) / 34000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        rot: (Math.random() - 0.5) * 0.24,
        flip: Math.random() > 0.5 ? 1 : -1,
      }));
    }

    function drawPony(n: N, s: number, fill: string) {
      ctx!.save();
      ctx!.translate(n.x, n.y);
      ctx!.rotate(n.rot);
      ctx!.scale(n.flip * s, s);
      ctx!.translate(-PONY_CENTER.x, -PONY_CENTER.y);
      ctx!.fillStyle = fill;
      ctx!.fill(pony);
      ctx!.restore();
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const TH = 165;
      const MR = 200;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const md = Math.hypot(dx, dy);
        if (md < MR && md > 0.01) {
          n.x += (dx / md) * 0.45;
          n.y += (dy / md) * 0.45;
        }
      }

      // линии между конями
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < TH) {
            const o = (1 - d / TH) * 0.16;
            ctx!.strokeStyle = `rgba(0,0,0,${o})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < MR) {
          const o = (1 - dm / MR) * 0.3;
          ctx!.strokeStyle = `rgba(0,0,0,${o})`;
          ctx!.lineWidth = 0.7;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
      }

      // кони
      for (const n of nodes) {
        const dm = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const t = Math.max(0, 1 - dm / MR); // 0 далеко → 1 у курсора
        const s = 0.24 + t * 0.24; // +50% к размеру коней
        // у курсора — насыщенно чёрный, вдали — светло-серый
        const fill = `rgba(0,0,0,${0.12 + 0.72 * t})`;
        drawPony(n, s, fill);
      }
    }

    function loop() {
      draw();
      raf = requestAnimationFrame(loop);
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [reduce]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, #ffffff 0%, #fafafa 55%, #f3f3f3 100%)",
      }}
    />
  );
}
