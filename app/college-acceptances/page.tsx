import { PageHero } from "@/components/ui/PageHero";
import { UniversityGrid } from "@/components/sections/UniversityGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { CountUp } from "@/components/ui/CountUp";
import { GraduateSpotlights } from "@/components/sections/GraduateSpotlights";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Acceptances — Rise Preparatory Academy",
  description:
    "100% of Rise Prep graduates are accepted to college. See the 30+ universities and colleges where our graduates excel across the US.",
};

const stats = [
  { target: 100, suffix: "%", label: "College Acceptance Rate" },
  { target: 30,  suffix: "+", label: "Colleges & Universities" },
  { target: 15,  suffix: "",  label: "States Represented" },
  { target: 12,  suffix: ":1", label: "Student-Teacher Ratio" },
];

const spotlights = [
  {
    name: "Jasmine Williams",
    year: "Class of 2024",
    university: "University of Miami",
    domain: "miami.edu",
    major: "Pre-Medicine / Biology",
    quote:
      "Rise Prep didn't just prepare me academically — it gave me the discipline, the confidence, and the drive to compete at the highest level. I walked into UM ready.",
  },
  {
    name: "Marcus Thompson",
    year: "Class of 2023",
    university: "Grand Canyon University",
    domain: "gcu.edu",
    major: "Business Administration",
    quote:
      "The small class sizes meant my teachers actually knew me. They pushed me harder than I expected and I'm grateful for every challenge they gave me.",
  },
  {
    name: "Aaliyah Carter",
    year: "Class of 2024",
    university: "Bethune-Cookman University",
    domain: "cookman.edu",
    major: "Criminal Justice",
    quote:
      "Coming from Rise Prep, I felt ahead of my peers from day one. The accelerated curriculum here is no joke — and it pays off the moment you step on a college campus.",
  },
];

const API_KEY = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN
  || process.env.NEXT_PUBLIC_LOGO_DEV_KEY
  || process.env.NEXT_PUBLIC_LOGO_DEV_API_KEY;

export default function CollegeAcceptancesPage() {
  return (
    <main>
      <PageHero
        title="Where Our Graduates Excel"
        breadcrumb="Rise Prep / College Acceptances"
        imageSrc="/rise-preparatory-academy-cutler-bay-fl-primaryphoto.jpg"
        imageAlt="Rise Preparatory Academy graduates"
      />

      {/* Stats Strip */}
      <section className="bg-navy py-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {stats.map(({ target, suffix, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <span className="font-serif text-white text-4xl font-bold leading-none">
                <CountUp target={target} suffix={suffix} />
              </span>
              <span className="text-cream/70 text-xs mt-2 uppercase tracking-widest font-sans">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="bg-cream py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7a6020] mb-3">
            Our Legacy
          </p>
          <h2 className="font-serif text-navy text-2xl md:text-3xl mb-5">
            A Proven Pipeline to College
          </h2>
          <p className="font-sans text-gray-600 text-base leading-relaxed">
            Since 2018, Rise Preparatory Academy has maintained a{" "}
            <strong className="text-navy">100% college acceptance rate</strong>. Our
            accelerated, college-preparatory curriculum — combined with a low
            12:1 student-teacher ratio — ensures every graduate is not just
            accepted to college, but truly ready to thrive there.
          </p>
        </div>
      </section>

      {/* Graduate Spotlights */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7a6020] mb-2">
              Graduate Stories
            </p>
            <h2 className="font-serif text-navy text-2xl md:text-3xl">
              Hear From Our Graduates
            </h2>
          </div>

          <GraduateSpotlights spotlights={spotlights} apiKey={API_KEY} />
        </div>
      </section>

      {/* Full University Grid */}
      <UniversityGrid />

      {/* CTA */}
      <CtaBand
        heading="Ready to join our legacy?"
        ctaLabel="Apply Now"
        ctaHref="/admissions/apply"
        variant="navy"
      />
    </main>
  );
}
