"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";

/* Image + text feature with parallax image */
export function ImageFeature({
  eyebrow,
  title,
  body,
  img,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  img: string;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="themed-surface bg-bg px-5 py-16 sm:px-8 sm:py-24">
      <div
        className={`mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16 ${
          reverse ? "md:[direction:rtl]" : ""
        }`}
      >
        <div ref={ref} className="[direction:ltr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_40px_100px_-50px_rgba(27,30,21,0.6)]">
            <motion.img
              style={{ y }}
              src={img}
              alt={title}
              loading="lazy"
              className="absolute inset-0 h-[116%] w-full object-cover"
            />
          </div>
        </div>
        <div className="[direction:ltr]">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-terracotta">
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-3xl leading-[1.05] text-fg sm:text-5xl">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Full-bleed parallax statement over image */
export function FullBleedQuote({
  img,
  kicker,
  quote,
}: {
  img: string;
  kicker: string;
  quote: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section
      ref={ref}
      className="relative flex h-[80vh] min-h-[520px] items-center justify-center overflow-hidden bg-ink"
    >
      <motion.img
        style={{ scale }}
        src={img}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/55" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-cheese">
            {kicker}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="display text-3xl leading-[1.1] text-paper sm:text-5xl lg:text-6xl">
            {quote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
