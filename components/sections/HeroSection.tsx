import Image from "next/image";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";

export function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[560px] flex items-center">
      <Image
        src="/rise-preparatory-academy-cutler-bay-fl-primaryphoto.jpg"
        alt="Rise Preparatory Academy building exterior, Cutler Bay FL"
        fill
        className="object-cover animate-soft-zoom"
        priority
      />
      <div className="absolute inset-0 bg-deep-navy/50" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h1
          className="font-normal text-white leading-tight mb-4 animate-fade-up delay-100"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          RISE PREPARATORY ACADEMY
        </h1>
        <p className="text-cream text-lg md:text-xl mb-8 max-w-xl mx-auto animate-fade-up delay-200">
          A college-preparatory academy built for driven students.
        </p>
        <div className="animate-fade-up delay-300 hover-lift-sm inline-block rounded-full">
          <ButtonPrimary href="/admissions/apply">Apply Now</ButtonPrimary>
        </div>
      </div>
    </section>
  );
}
