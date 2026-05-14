import Image from "next/image";

interface Props {
  title: string;
  breadcrumb?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function PageHero({
  title,
  breadcrumb,
  imageSrc = "/riseprepacademy.webp",
  imageAlt = "Rise Preparatory Academy",
}: Props) {
  return (
    <section className="relative h-[300px] md:h-[340px] flex items-center justify-center overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-deep-navy/80" />
      <div className="relative z-10 text-center px-4">
        {breadcrumb && (
          <p className="text-[0.85rem] text-cream/80 mb-2 tracking-wide">
            {breadcrumb}
          </p>
        )}
        <h1 className="font-bold text-white text-3xl md:text-5xl">{title}</h1>
      </div>
    </section>
  );
}
