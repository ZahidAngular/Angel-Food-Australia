export function LogoMark({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* leaf / wing */}
      <path
        d="M20 4C11 9 6 15 6 23a14 14 0 0 0 28 0c0-8-5-14-14-19Z"
        fill={color}
        opacity="0.14"
      />
      <path
        d="M20 6.5c-6.2 4-10 8.8-10 14.9 0 3.1 1 5.8 2.7 7.9C15.4 22.7 18.8 17 24 13.2c-3.4 4.9-5.6 10.9-6.3 17.7 1.4.5 2.8.8 4.3.8a11 11 0 0 0 8.7-17.7c-2.6-3.1-6.1-5.4-10.7-7.5Z"
        fill={color}
      />
    </svg>
  );
}

export function Logo({
  className = "",
  color = "currentColor",
  markColor,
}: {
  className?: string;
  color?: string;
  markColor?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0" color={markColor ?? color} />
      <span className="flex flex-col leading-none">
        <span
          className="display text-[1.05rem] tracking-tight"
          style={{ color }}
        >
          Angel Food
        </span>
        <span
          className="text-[0.55rem] font-semibold uppercase tracking-[0.35em] opacity-60"
          style={{ color }}
        >
          Australia
        </span>
      </span>
    </span>
  );
}
