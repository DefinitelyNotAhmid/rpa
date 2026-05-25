import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Explore Rise Preparatory Academy's rigorous curriculum, grading scale, and academic programs — designed to prepare students for college success.",
  openGraph: {
    title: "Academics | Rise Preparatory Academy",
    description:
      "Explore Rise Preparatory Academy's rigorous curriculum, grading scale, and academic programs — designed to prepare students for college success.",
    url: "https://riseprep.vercel.app/academics",
  },
};

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        title="Academics"
        breadcrumb="Home / Academics"
      />

      {/* Programs Overview */}
      <ScrollReveal>
        <section className="bg-cream py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-3 mb-12">
              <p className="text-xs text-gold font-semibold uppercase tracking-widest">
                Our Programs
              </p>
              <h2 className="font-serif text-navy text-2xl md:text-4xl">
                A Rigorous Path to College
              </h2>
              <p className="text-gray-600 text-sm max-w-xl mx-auto">
                Rise Preparatory Academy requires 28 credits to graduate — four more than Florida&rsquo;s state minimum.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-8 flex flex-col gap-3">
                <p className="font-serif text-gold text-2xl leading-none">01</p>
                <h3 className="font-serif text-navy text-lg leading-snug">College Preparatory Track</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  28 credits required to graduate — four more than Florida&rsquo;s 24 minimum. Rigorous core curriculum across all subject areas.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-8 flex flex-col gap-3">
                <p className="font-serif text-gold text-2xl leading-none">02</p>
                <h3 className="font-serif text-navy text-lg leading-snug">Advanced Placement</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  Weighted GPA. College-level coursework available to qualifying students who are ready to accelerate beyond the standard track.
                </p>
                <Link href="/academics/advanced-placement" className="text-xs font-semibold text-navy hover:text-gold transition-colors mt-1">
                  Learn more →
                </Link>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-8 flex flex-col gap-3">
                <p className="font-serif text-gold text-2xl leading-none">03</p>
                <h3 className="font-serif text-navy text-lg leading-snug">Community Service</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  Character development and civic responsibility are built into graduation requirements. Students give back as they grow.
                </p>
                <Link href="/academics/community-service" className="text-xs font-semibold text-navy hover:text-gold transition-colors mt-1">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      
        <div id="grading">
          <h2 className="text-navy text-2xl md:text-3xl mb-2">Grading Scale</h2>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7a6020] mb-4">
            Rise Preparatory Academy Grade Report Key
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-navy text-cream">
                  <th className="px-4 py-3 font-semibold">Letter Grade</th>
                  <th className="px-4 py-3 font-semibold">Percentage</th>
                  <th className="px-4 py-3 font-semibold text-right">Regular</th>
                  <th className="px-4 py-3 font-semibold text-right">Honor</th>
                  <th className="px-4 py-3 font-semibold text-right">AP</th>
                  <th className="px-4 py-3 font-semibold text-right">Dual Enroll.</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["A+", "97–100", "4",    "5",    "5",    "5"],
                  ["A",  "92–96",  "3.7",  "4.7",  "4.7",  "4.7"],
                  ["A−", "87–91",  "3.67", "4.67", "4.67", "4.67"],
                  ["B+", "85–86",  "3.33", "4.33", "4.33", "4.33"],
                  ["B",  "80–84",  "3",    "4",    "4",    "4"],
                  ["B−", "75–79",  "2.67", "3.67", "3.67", "3.67"],
                  ["C+", "72–74",  "2.33", "3.33", "3.33", "3.33"],
                  ["C",  "70–71",  "2",    "3",    "3",    "3"],
                  ["C−", "69",     "1.67", "2.67", "2.67", "2.67"],
                  ["D+", "65–67",  "1.33", "2.33", "2.33", "2.33"],
                  ["D",  "63–64",  "1",    "2",    "2",    "2"],
                  ["D−", "60–62",  "0.67", "1.67", "1.67", "1.67"],
                  ["F",  "0–59",   "0",    "0",    "0",    "0"],
                ].map(([grade, pct, reg, hon, ap, de], i) => (
                  <tr key={grade} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-cream/40"} ${grade === "F" ? "text-red-700" : "text-gray-600"}`}>
                    <td className="px-4 py-2.5 font-bold text-navy">{grade}</td>
                    <td className="px-4 py-2.5">{pct}</td>
                    <td className="px-4 py-2.5 text-right">{reg}</td>
                    <td className="px-4 py-2.5 text-right">{hon}</td>
                    <td className="px-4 py-2.5 text-right">{ap}</td>
                    <td className="px-4 py-2.5 text-right">{de}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div id="handbook">
          <h2 className="text-navy text-2xl md:text-3xl mb-4">
            School Handbook
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The Rise Preparatory Academy School Handbook outlines expectations
            for student conduct, academic integrity, attendance policies, and
            school procedures. All students and families are expected to review
            and adhere to the guidelines within.
          </p>
        </div>

        <div id="faq">
          <h2 className="text-navy text-2xl md:text-3xl mb-4">FAQs</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Have questions about Rise Preparatory Academy? We&apos;ve compiled answers to the most common questions from prospective students and families.
          </p>
          <Link href="/faq" className="inline-flex items-center gap-2 btn-primary">
            View All FAQs
          </Link>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal delay="delay-100">
        <CtaBand
          heading="Have questions about our curriculum?"
          ctaLabel="Contact Admissions"
          ctaHref="/contact"
          variant="gold"
        />
      </ScrollReveal>
    </>
  );
}
