import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Rise Preparatory Academy — an accredited college-prep school in Cutler Bay, FL serving grades 5–12 with accelerated academics since 2010.",
  openGraph: {
    title: "About Us | Rise Preparatory Academy",
    description:
      "Learn about Rise Preparatory Academy — an accredited college-prep school in Cutler Bay, FL serving grades 5–12 with accelerated academics since 2010.",
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

    </>
  );
}
