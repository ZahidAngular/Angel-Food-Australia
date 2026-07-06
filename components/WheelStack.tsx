"use client";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";

export type WheelPanel = {
  img: string;
  eyebrow: string;
  title: string;
  text?: string;
  tint?: string;
  cta?: { label: string; href: string; primary?: boolean }[];
};

export type WheelAnchor = { id: string; index: number };

const ANGLE = 30; // degrees rotated per panel step
const OVERSIZE = 24; // % each panel extends past the viewport to hide rotation gaps
const WINDOW = 2; // how many panels each side of active stay mounted

export function WheelStack({
  panels,
  anchors = [],
}: {
  panels: WheelPanel[];
  anchors?: WheelAnchor[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const count = panels.length;
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.round(v * (count - 1));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  return (
    <section
      ref={ref}
      style={{ height: `${count * 100}vh` }}
      className="relative bg-ink"
    >
      {/* scroll anchors for the navbar */}
      {anchors.map((a) => (
        <span
          key={a.id}
          id={a.id}
          className="pointer-events-none absolute left-0"
          style={{ top: `${(a.index / count) * 100}%` }}
        />
      ))}

      <div className="sticky top-0 h-screen w-full overflow-hidden [perspective:1600px]">
        {panels.map((p, i) =>
          Math.abs(i - active) <= WINDOW ? (
            <PanelView
              key={i}
              panel={p}
              index={i}
              count={count}
              progress={scrollYProgress}
            />
          ) : null
        )}
        <Indicator progress={scrollYProgress} count={count} active={active} />
        <ScrollHint progress={scrollYProgress} />
      </div>
    </section>
  );
}

function PanelView({
  panel,
  index,
  count,
  progress,
}: {
  panel: WheelPanel;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const d = useTransform(progress, (v) => index - v * (count - 1));

  const y = useTransform(d, (dd) => `${-dd * 100}%`);
  const rotate = useTransform(d, (dd) => `${dd * ANGLE}deg`);
  const scale = useTransform(d, (dd) => 1 - Math.min(Math.abs(dd), 1) * 0.1);
  const opacity = useTransform(d, (dd) => {
    const a = Math.abs(dd);
    if (a <= 0.55) return 1;
    if (a >= 1.12) return 0;
    return 1 - (a - 0.55) / 0.57;
  });
  const zIndex = useTransform(d, (dd) => Math.round(500 - Math.abs(dd) * 100));
  const contentOpacity = useTransform(d, (dd) => {
    const a = Math.abs(dd);
    return a < 0.22 ? 1 : a > 0.55 ? 0 : 1 - (a - 0.22) / 0.33;
  });
  const contentY = useTransform(d, (dd) => `${dd * 40}px`);

  return (
    <motion.article
      style={{ y, rotate, scale, opacity, zIndex }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden will-change-transform"
    >
      <div
        className="absolute"
        style={{
          top: `-${OVERSIZE}%`,
          left: `-${OVERSIZE}%`,
          right: `-${OVERSIZE}%`,
          bottom: `-${OVERSIZE}%`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={panel.img}
          alt={panel.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/55" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,rgba(191,90,43,0.28),transparent_55%)]" />
      </div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <p
          className="mb-5 text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ color: panel.tint ?? "#e7b64a" }}
        >
          {panel.eyebrow}
        </p>
        <h2 className="display text-4xl leading-[0.95] text-paper sm:text-6xl lg:text-[5rem]">
          {panel.title}
        </h2>
        {panel.text && (
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg">
            {panel.text}
          </p>
        )}
        {panel.cta && (
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {panel.cta.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className={
                  c.primary
                    ? "rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                    : "rounded-full border border-paper/35 px-7 py-3.5 text-sm font-semibold text-paper backdrop-blur transition-colors hover:border-paper"
                }
              >
                {c.label}
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </motion.article>
  );
}

function Indicator({
  progress,
  count,
  active,
}: {
  progress: MotionValue<number>;
  count: number;
  active: number;
}) {
  const fill = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="absolute right-6 top-1/2 z-[600] hidden -translate-y-1/2 items-center gap-4 sm:flex">
      <span className="display text-sm text-paper/80">
        {String(active + 1).padStart(2, "0")}
        <span className="text-paper/40"> / {String(count).padStart(2, "0")}</span>
      </span>
      <div className="h-40 w-px overflow-hidden bg-paper/20">
        <motion.div style={{ height: fill }} className="w-full bg-cheese" />
      </div>
    </div>
  );
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.04], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-7 left-1/2 z-[600] flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-paper/70"
    >
      Scroll
      <span className="h-9 w-px overflow-hidden bg-paper/25">
        <motion.span
          className="block h-3 w-full bg-cheese"
          animate={{ y: [-12, 36] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.div>
  );
}
