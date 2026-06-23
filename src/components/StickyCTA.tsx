"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";

// Липкая нижняя панель покупки — появляется после прокрутки hero (мобильные).
export function StickyCTA() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 680);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 backdrop-blur-md md:hidden"
        >
          <div className="flex items-center justify-between gap-3 px-5 py-3">
            <div className="leading-tight">
              <div className="font-display text-lg">55 000 ₸</div>
              <div className="text-[11px] text-muted">за 30 дней доступа</div>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-[12px] uppercase tracking-[0.12em] text-ivory"
            >
              Получить доступ
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
