import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { CtaBand } from "@/components/ui/CtaBand";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Apply to Rise Preparatory Academy in Cutler Bay, FL. Learn about our admissions procedures, requirements, and how to schedule a visit.",
  openGraph: {
    title: "Admissions | Rise Preparatory Academy",
    description:
      "Apply to Rise Preparatory Academy in Cutler Bay, FL. Learn about our admissions procedures, requirements, and how to schedule a visit.",
    url: "https://riseprep.vercel.app/admissions",
  },
};

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        title="Admissions"
        breadcrumb="Home / Admissions"
      />

      <ScrollReveal>
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">

        {/* Admission Procedures */}
        <div className="space-y-5">
          <h2 className="text-navy text-2xl md:text-3xl">Admission Procedures</h2>
          <p className="text-gray-600 leading-relaxed">
            Prospective students who wish to apply to Rise Preparatory Academy are
            invited to visit our open bay campus (approximately 1,200 square feet),
            by calling the office and scheduling an appointment. Applicants are expected:
          </p>
          <ul className="space-y-2 text-gray-600 text-sm leading-relaxed list-disc list-inside">
            <li>To bring in the last report card from their prior school;</li>
            <li>To have an official copy of their transcript;</li>
            <li>To have an attendance report, credits earned;</li>
            <li>To have updated vaccinations;</li>
            <li>To take an entrance exam;</li>
            <li>To have a copy of Birth Certificate/Baptismal Certificate;</li>
            <li>To have a copy of the student&apos;s &amp; parent&apos;s Social Security card.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            Upon receipt and evaluation of these documents, a school official will schedule
            an interview with the applicant to determine his/her status. Acceptance of a
            student is always subject to the satisfactory completion of all coursework the
            student may be presently taking. After acceptance into Rise Preparatory Academy,
            you will need to fill out the application and registration form.
          </p>
          <ButtonPrimary href="/admissions/apply">
            Start Your Application
          </ButtonPrimary>
        </div>

        {/* Non-Discrimination Policy */}
        <div className="bg-navy/5 border border-navy/15 rounded-2xl p-8 space-y-3">
          <h2 className="text-navy text-xl font-semibold">Non-Discrimination Policy</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Rise Preparatory Academy does not discriminate on the basis of race, color,
            or national/ethnic origin in the administration of its educational policies,
            admissions policies, scholarships, athletic or other school-administered programs.
          </p>
        </div>

      </section>
      </ScrollReveal>

      <ScrollReveal delay="delay-100">
        <CtaBand ctaLabel="Apply Now" ctaHref="/admissions/apply" />
      </ScrollReveal>
    </>
  );
}
