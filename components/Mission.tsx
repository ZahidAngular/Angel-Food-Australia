"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealWords } from "./Reveal";

export function Mission() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-olive px-5 py-32 text-paper sm:px-8 sm:py-44"
    >
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(231,182,74,0.18),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-5xl text-center">
        <p className="mb-8 text-sm font-semibold uppercase tracking-[0.25em] text-cheese">
          Our Mission
        </p>
        <h2 className="display text-3xl leading-[1.1] sm:text-5xl lg:text-6xl">
          <RevealWords text="We're not trying to replace tradition. We're creating another" />{" "}
          <span className="serif-italic text-cheese">
            <RevealWords text="delicious option." delay={0.15} />
          </span>
        </h2>
        <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-paper/70">
          Every meal that includes more plants is a positive step — for people,
          for the planet and for the future.
        </p>
        <p className="serif-italic mt-10 text-2xl text-cheese sm:text-3xl">
          Create the best plant-based foods Australians can buy.
        </p>
      </div>
    </section>
  );
}
