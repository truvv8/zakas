"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "motion/react";

// Тонкий 3D-наклон карточки вслед за курсором.
export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 150,
    damping: 16,
  });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
    stiffness: 150,
    damping: 16,
  });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Мягкое появление при попадании в зону видимости.
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </MotionTag>
  );
}

// Счётчик-«накрутка» для числовых показателей.
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
