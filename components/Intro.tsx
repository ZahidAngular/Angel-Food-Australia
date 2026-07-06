"use client";
import { Reveal, RevealWords } from "./Reveal";

export function Intro() {
  return (
    <section className="relative themed bg-bg px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-10 text-sm font-semibold uppercase tracking-[0.25em] text-terracotta">
            The Angel Food Difference
          </p>
        </Reveal>

        <h2 className="display max-w-5xl text-4xl leading-[1.05] text-fg sm:text-6xl lg:text-7xl">
          <RevealWords text="We create delicious plant-based cheeses and meat alternatives that deliver on" />{" "}
          <span className="serif-italic text-olive-mid">
            <RevealWords text="taste, texture and performance." delay={0.1} />
          </span>
        </h2>

        <div className="mt-16 grid gap-10 border-t border-ink/10 pt-12 md:grid-cols-3">
          {[
            {
              k: "20+ years",
              v: "Of innovation and product development behind every recipe.",
            },
            {
              k: "Home to foodservice",
              v: "Enjoyed by families, food lovers, chefs and retailers alike.",
            },
            {
              k: "One simple goal",
              v: "Make plant-based eating easy, delicious and accessible.",
            },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 0.1}>
              <div className="display text-3xl text-olive">{c.k}</div>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {c.v}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
