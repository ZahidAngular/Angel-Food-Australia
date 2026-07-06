"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink"
    >
      {/* full-bleed photo with slow zoom */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 will-change-transform"
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease }}
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url(/img/hero-pizza.jpg)" }}
        />
      </motion.div>

      {/* cinematic gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/50" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_100%,rgba(191,90,43,0.35),transparent_55%)]" />

      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-16 sm:px-8 sm:pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-paper/25 bg-paper/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-paper backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cheese" />
          Premium Plant-Based · Made in Australia
        </motion.div>

        <h1 className="display max-w-4xl text-[13vw] leading-[0.88] text-paper sm:text-[9vw] lg:text-[7.5rem]">
          <Line delay={0.35}>Plant-Based Food.</Line>
          <Line delay={0.5}>
            Made <span className="serif-italic text-cheese">for Everyone.</span>
          </Line>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease }}
          className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md text-base leading-relaxed text-paper/80 sm:text-lg">
            Great food shouldn&apos;t ask you to compromise. Delicious dairy-free
            cheeses and plant-based meats built on taste, texture and
            performance.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#cheese"
              className="group inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Explore the Range
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-7 py-3.5 text-sm font-semibold text-paper backdrop-blur transition-colors hover:border-paper"
            >
              For Retailers & Cafés
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 right-6 z-10 hidden flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-paper/70 sm:flex"
      >
        Scroll
        <span className="h-10 w-px overflow-hidden bg-paper/25">
          <motion.span
            className="block h-4 w-full bg-cheese"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function Line({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
