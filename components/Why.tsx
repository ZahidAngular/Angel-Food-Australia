"use client";
import { pillars } from "@/lib/data";
import { Reveal, RevealWords } from "./Reveal";

export function Why() {
  return (
    <section id="why" className="themed-surface relative bg-bg px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-terracotta">
              Why Angel Food?
            </p>
          </Reveal>
          <h2 className="display text-4xl leading-[1.05] text-fg sm:text-6xl">
            <RevealWords text="Premium plant-based food, built for the way Australia eats." />
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.no} delay={i * 0.08}>
              <div className="group h-full bg-surface p-8 transition-colors hover:bg-olive sm:p-10">
                <div className="mb-8 flex items-center justify-between">
                  <span className="display text-2xl text-olive-light transition-colors group-hover:text-cheese">
                    {p.no}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-terracotta transition-colors group-hover:bg-cheese" />
                </div>
                <h3 className="display text-2xl text-fg transition-colors group-hover:text-paper sm:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted transition-colors group-hover:text-paper/80">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
