export function Logo({
  className = "h-10",
  tone = "auto",
}: {
  className?: string;
  tone?: "auto" | "light";
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/img/logo.png"
      alt="Angel Food Australia"
      className={`logo-${tone} w-auto select-none ${className}`}
    />
  );
}
