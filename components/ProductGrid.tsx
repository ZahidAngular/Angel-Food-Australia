"use client";
import type { Product } from "@/lib/data";
import { Reveal } from "./Reveal";

export function ProductGrid({
  id,
  eyebrow,
  title,
  lead,
  products,
  dark = false,
  featured = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  products: Product[];
  dark?: boolean;
  featured?: boolean;
}) {
  return (
    <section
      id={id}
      className={`px-5 py-24 sm:px-8 sm:py-32 ${dark ? "bg-ink" : "themed-surface bg-bg"}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p
              className={`mb-4 text-xs font-semibold uppercase tracking-[0.28em] ${
                dark ? "text-cheese" : "text-terracotta"
              }`}
            >
              {eyebrow}
            </p>
            <h2
              className={`display text-4xl leading-[1.02] sm:text-6xl ${
                dark ? "text-paper" : "text-fg"
              }`}
            >
              {title}
            </h2>
          </div>
          <p
            className={`max-w-sm text-sm leading-relaxed md:text-right ${
              dark ? "text-paper/60" : "text-muted"
            }`}
          >
            {lead}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.08}>
              <article className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-ink shadow-[0_24px_60px_-40px_rgba(0,0,0,0.7)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <span
                      className="rounded-full bg-black/25 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm"
                      style={{ color: p.tint }}
                    >
                      No. {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: p.tint }}
                    />
                  </div>
                  <div>
                    <h3 className="display text-3xl leading-none text-paper">
                      {p.name}
                    </h3>
                    <p
                      className="mt-2 text-sm font-semibold"
                      style={{ color: p.tint }}
                    >
                      {p.tagline}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-paper/75">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
