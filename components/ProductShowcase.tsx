"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/data";

export function ProductShowcase({
  id,
  eyebrow,
  title,
  lead,
  products,
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  products: Product[];
  dark?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);

  useEffect(() => {
    const compute = () => {
      if (trackRef.current) {
        setMaxX(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
    };
    compute();
    const t = setTimeout(compute, 300);
    window.addEventListener("resize", compute);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", compute);
    };
  }, [products.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id={id}
      style={{ height: `calc(100vh + ${maxX}px)` }}
      className={dark ? "relative bg-ink" : "relative bg-sand"}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="flex items-end justify-between px-5 pt-24 pb-6 sm:px-10 sm:pt-28">
          <div>
            <p
              className={`mb-3 text-xs font-semibold uppercase tracking-[0.28em] ${
                dark ? "text-cheese" : "text-terracotta"
              }`}
            >
              {eyebrow}
            </p>
            <h2
              className={`display text-4xl sm:text-6xl lg:text-7xl ${
                dark ? "text-paper" : "text-ink"
              }`}
            >
              {title}
            </h2>
          </div>
          <p
            className={`hidden max-w-xs text-right text-sm leading-relaxed md:block ${
              dark ? "text-paper/60" : "text-ink-soft"
            }`}
          >
            {lead}
          </p>
        </div>

        <div className="flex flex-1 items-center">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-5 px-5 will-change-transform sm:gap-6 sm:px-10"
          >
            {products.map((p, i) => (
              <Card key={p.name} product={p} index={i} />
            ))}
          </motion.div>
        </div>

        <div className="px-5 pb-7 sm:px-10">
          <div className="flex items-center gap-4">
            <span
              className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                dark ? "text-paper/50" : "text-ink-soft"
              }`}
            >
              Scroll
            </span>
            <div className={`h-px flex-1 ${dark ? "bg-paper/15" : "bg-ink/15"}`}>
              <motion.div
                style={{ width: progress }}
                className={`h-px ${dark ? "bg-cheese" : "bg-terracotta"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ product, index }: { product: Product; index: number }) {
  return (
    <article className="group relative h-[64vh] w-[80vw] shrink-0 overflow-hidden rounded-[1.75rem] bg-ink shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] sm:w-[36vw]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.img}
        alt={product.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-between p-7 sm:p-8">
        <div className="flex items-center justify-between">
          <span
            className="rounded-full bg-black/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm"
            style={{ color: product.tint }}
          >
            No. {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: product.tint }}
          />
        </div>

        <div>
          <h3 className="display text-4xl leading-none text-paper sm:text-5xl">
            {product.name}
          </h3>
          <p
            className="mt-3 text-base font-semibold"
            style={{ color: product.tint }}
          >
            {product.tagline}
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/75">
            {product.desc}
          </p>
        </div>
      </div>
    </article>
  );
}
