"use client";
import { Reveal } from "./Reveal";

const cards = [
  {
    tag: "For Retailers",
    title: "A trusted range consumers come back for.",
    body: "Premium products that complement today's evolving grocery category — great taste and everyday convenience that encourages repeat purchase.",
    img: "/img/platter.jpg",
    accent: "text-cheese",
  },
  {
    tag: "For Foodservice",
    title: "Products chefs love working with.",
    body: "From independent cafés to national restaurant groups — designed for consistency, ease of preparation and exceptional performance.",
    img: "/img/cafe.jpg",
    accent: "text-cheese",
  },
];

export function Trade() {
  return (
    <section id="trade" className="themed-surface bg-bg px-5 pb-24 pt-4 sm:px-8 sm:pb-32">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        {cards.map((c, i) => (
          <Reveal key={c.tag} delay={i * 0.1}>
            <div className="group relative flex h-[30rem] flex-col justify-end overflow-hidden rounded-[1.75rem] p-9 text-paper sm:p-11">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.img}
                alt={c.tag}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
              <div className="relative">
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.28em] ${c.accent}`}
                >
                  {c.tag}
                </p>
                <h3 className="display mt-5 text-3xl leading-tight sm:text-4xl">
                  {c.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/80">
                  {c.body}
                </p>
                <a
                  href="#contact"
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-paper/40 px-6 py-3 text-sm font-semibold transition-colors hover:bg-paper hover:text-ink"
                >
                  Enquire now →
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
