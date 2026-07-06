"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

/**
 * Wraps a normal section with a scroll reveal.
 * - variant="wheel": the section spins in like a water-wheel (in-plane rotateZ),
 *   sits flat/normal while centered, then spins out as it leaves. A slight
 *   overscan-scale keeps the rotation from opening big gaps at the edges.
 * - variant="soft": a restrained fade + rise (no rotation).
 */
export function WheelSection({
  children,
  className = "",
  variant = "wheel",
  angle = 19,
}: {
  children: ReactNode;
  className?: string;
  variant?: "wheel" | "soft";
  angle?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const wheel = variant === "wheel";

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.34, 0.66, 1],
    wheel ? [angle, 0, 0, -angle] : [0, 0, 0, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    wheel ? [80, 0, 0, -80] : [56, 0, 0, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.34, 0.66, 1],
    wheel ? [1.08, 1, 1, 1.08] : [1, 1, 1, 1]
  );
  const opacity = useTransform(
    scrollYProgress,
    wheel ? [0, 0.18, 0.82, 1] : [0, 0.22, 1, 1],
    wheel ? [0, 1, 1, 0] : [0, 1, 1, 1]
  );

  return (
    <div ref={ref}>
      <motion.div
        style={{ rotate, y, scale, opacity, transformOrigin: "center center" }}
        className={`will-change-transform ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
