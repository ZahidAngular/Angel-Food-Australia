"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { n: "20+", l: "Years of innovation" },
  { n: "14", l: "Signature products" },
  { n: "100%", l: "Dairy free" },
  { n: "AU", l: "Made for Australia" },
];

export function StatBand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_120%_at_50%_0%,rgba(191,90,43,0.22),transparent_60%)]" />

      {/* oversized drifting word behind */}
      <motion.span
        style={{ x }}
        className="display pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[22vw] leading-none text-paper/[0.04]"
      >
        Angel Food
      </motion.span>

      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-5 sm:px-8 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="border-l border-paper/15 pl-5 sm:pl-7"
          >
            <div className="display text-5xl text-cheese sm:text-6xl lg:text-7xl">
              {s.n}
            </div>
            <div className="mt-3 text-sm uppercase tracking-[0.15em] text-paper/60">
              {s.l}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
