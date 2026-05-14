import { ButtonPrimary } from "./ButtonPrimary";

interface Props {
  heading?: string;
  ctaLabel: string;
  ctaHref: string;
  variant?: "navy" | "gold";
}

export function CtaBand({
  heading = "Ready to experience Rise Prep?",
  ctaLabel,
  ctaHref,
  variant = "navy",
}: Props) {
  const bg = variant === "gold" ? "bg-gold" : "bg-navy";
  const text = variant === "gold" ? "text-deep-navy" : "text-cream";

  return (
    <section
      className={`${bg} ${text} w-full py-14 px-4 flex flex-col items-center gap-6 text-center`}
    >
      <h2 className="text-2xl md:text-3xl">{heading}</h2>
      <ButtonPrimary href={ctaHref}>{ctaLabel}</ButtonPrimary>
    </section>
  );
}
