"use client";

const items = [
  "Dairy-Free Cheese",
  "Plant-Based Meats",
  "Foodservice Ready",
  "Made for Australia",
  "No Compromise",
  "Delicious First",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-olive py-5 text-paper">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap will-change-transform">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="display text-2xl sm:text-3xl">{item}</span>
            <span className="text-cheese">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
