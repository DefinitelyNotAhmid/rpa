import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Rise Preparatory Academy — an accredited college-prep school in Cutler Bay, FL serving grades 5–12 with accelerated academics since 2018.",
  openGraph: {
    title: "About Us | Rise Preparatory Academy",
    description:
      "Learn about Rise Preparatory Academy — an accredited college-prep school in Cutler Bay, FL serving grades 5–12 with accelerated academics since 2018.",
    url: "https://riseprep.vercel.app/about",
  },
};

const fastFacts = [
  {
    label: "School Motto",
    value: "Empowering students to become scholars",
  },
  {
    label: "School Colors",
    value: "Royal Blue, Grey & White",
  },
  {
    label: "School Mascot",
    value: "Honey Badger",
  },
  {
    label: "Grades Served",
    value: "5 – 12",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        breadcrumb="Home / About"
      />

      {/* Section 1 — Split: Campus photo + Intro */}
      <ScrollReveal>
        <section className="bg-cream py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Campus photo */}
            <div className="relative h-80 md:h-[480px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/18900-SW-106th-Ave-Miami-FL-Building-Photo-2-LargeHighDefinition.webp"
                alt="Rise Preparatory Academy campus, Cutler Bay FL"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Intro text */}
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7a6020]">
                Located in the heart of Cutler Bay!
              </p>
              <h2 className="text-navy text-2xl md:text-3xl leading-snug">
                Why Rise Preparatory Academy?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                What are the benefits of attending Rise Preparatory Academy?
                We offer an accelerated, college-preparatory environment built
                for driven students who are ready to excel.
              </p>
              <ul className="space-y-3">
                {[
                  "One year equals two years of core classes — early enrollee guarantee compared to the traditional setting.",
                  "RPA's middle school program allows tremendous advancement with high school courses.",
                  "RPA is registered with the College Board.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                    <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 2 — Fast Facts strip */}
      <ScrollReveal delay="delay-100">
        <section className="bg-navy py-14 px-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold text-center mb-10">
              Fast Facts
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {fastFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-7 flex flex-col gap-2"
                >
                  <p className="text-[0.65rem] uppercase tracking-widest font-semibold text-gold">
                    {fact.label}
                  </p>
                  <p className="text-cream font-semibold text-sm leading-snug">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3 — Founder */}
      <ScrollReveal delay="delay-100">
        <section className="bg-cream py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Monogram card */}
            <div className="bg-navy rounded-xl flex flex-col items-center justify-center py-16 px-8 gap-4">
              <span className="font-serif text-gold text-7xl leading-none select-none">JW</span>
              <div className="w-12 h-px bg-gold/40" />
              <p className="text-cream/70 text-xs uppercase tracking-widest text-center">
                Founder &amp; Principal
              </p>
            </div>

            {/* Text */}
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7a6020]">
                Our Founder
              </p>
              <h2 className="font-serif text-navy text-2xl md:text-3xl leading-snug">
                Jerry Williamson
              </h2>
              <div className="border-l-4 border-gold pl-5">
                <p className="font-serif italic text-navy text-lg leading-relaxed">
                  &ldquo;Jerry Williamson continues his mission to pour into his community through educational, athletic, journalistic, and philanthropic efforts.&rdquo;
                </p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                A native of West Perrine, Florida, Williamson has more than a decade of experience working with youth. Walking in the footsteps of his grandmother Emma Moultrie-Little, a former head-start preschool educator, he founded Rise Preparatory Academy in 2018 to fill a void for students who needed an alternative to the cookie-cutter educational path — providing an innovative and unique learning experience.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                &ldquo;I noticed students and student-athletes falling by the wayside in the conventional system&hellip; I decided to gather all the negatives and create a small academy, to make a difference for students looking for a nontraditional route of learning.&rdquo;
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                In a two-year span, Williamson placed over 20 seniors in colleges and universities across nine states. A graduate of Miami Palmetto High School, he holds a Bachelor of Arts in Education from Florida International University and is currently pursuing his Master&rsquo;s degree. He has taught in public and charter schools across the general populous, special needs, and honors tracks — and has spent a decade as a sports writer and youth football coach in South Florida.
              </p>
            </div>

          </div>
        </section>
      </ScrollReveal>

      {/* Section 4 — Mission & Vision teaser */}
      <ScrollReveal delay="delay-100">
        <section className="bg-navy py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-3 mb-12">
              <p className="text-xs text-gold font-semibold uppercase tracking-widest">
                Our Purpose
              </p>
              <h2 className="font-serif text-white text-2xl md:text-3xl">
                Mission &amp; Vision
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl px-8 py-10 flex flex-col gap-4">
                <p className="text-[0.65rem] uppercase tracking-widest font-semibold text-gold">Vision</p>
                <p className="font-serif italic text-white text-lg leading-relaxed">
                  &ldquo;Our vision is to prepare students to be successful in college, careers, and life.&rdquo;
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-8 py-10 flex flex-col gap-4">
                <p className="text-[0.65rem] uppercase tracking-widest font-semibold text-gold">Mission</p>
                <p className="font-serif italic text-white text-lg leading-relaxed">
                  &ldquo;Our mission is to provide students of diverse backgrounds a well-rounded college preparatory and career technical education that enables our students to lead and influence the next generation.&rdquo;
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/about/mission-vision" className="text-xs text-cream/60 hover:text-gold transition-colors">
                Read our full Mission &amp; Vision &rarr;
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <CtaBand
        heading="Ready to join the RPA family?"
        ctaLabel="Apply Now"
        ctaHref="/admissions/apply"
      />

    </>
  );
}
