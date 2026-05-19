import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Advanced Placement",
  description:
    "Learn about Rise Preparatory Academy's Advanced Placement (AP) courses offering college-level classes and opportunities to earn college credit.",
  openGraph: {
    title: "Advanced Placement | Rise Preparatory Academy",
    description:
      "Learn about Rise Preparatory Academy's Advanced Placement (AP) courses offering college-level classes and opportunities to earn college credit.",
    url: "https://riseprep.vercel.app/academics/advanced-placement",
  },
};

const apCourses = {
  English: [
    "AP Language and Composition",
    "AP Literature and Composition",
  ],
  Mathematics: [
    "AP Calculus AB",
    "AP Calculus BC",
    "AP Statistics",
  ],
  Science: [
    "AP Biology",
    "AP Chemistry",
    "AP Environmental Science",
    "AP Physics 1",
  ],
  "Social Studies": [
    "AP US History",
    "AP European History",
    "AP World History: Modern",
    "AP Psychology",
    "AP United States Government and Politics",
  ],
  Electives: [
    "AP Computer Science Principles",
    "AP Computer Science A",
    "AP Music Theory",
  ],
};

export default function AdvancedPlacementPage() {
  return (
    <>
      <PageHero
        title="Advanced Placement"
        breadcrumb="Academics / Advanced Placement"
      />

      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">
          {/* What is AP */}
          <div className="space-y-6">
            <h2 className="text-navy text-2xl md:text-3xl">What is Advanced Placement?</h2>
            <p className="text-gray-600 leading-relaxed">
              Advanced Placement (AP) courses are rigorous, college-level classes in a variety of subjects that give students an opportunity to gain the skills and experience colleges recognize.
            </p>
            <p className="text-gray-600 leading-relaxed">
              AP (Advanced Placement) courses on campus are provided for students who are academically advanced and dedicated to their studies. Students in AP classes will take a final AP test with the possibility of earning college credit, depending on their final score. Requirements are based on PSAT, UGPA, and teacher recommendation.
            </p>
          </div>

          {/* AP Courses by Subject */}
          <div className="space-y-8">
            <h2 className="text-navy text-2xl md:text-3xl">AP Courses Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(apCourses).map(([subject, courses]) => (
                <div key={subject} className="bg-cream rounded-xl p-6">
                  <h3 className="font-serif text-navy text-lg mb-4">{subject}</h3>
                  <ul className="space-y-2">
                    {courses.map((course) => (
                      <li key={course} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-navy/5 border border-navy/15 rounded-2xl p-8 space-y-4">
            <h2 className="text-navy text-xl font-semibold">Benefits of AP Courses</h2>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                <span>Earn college credit while in high school</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                <span>Demonstrate academic excellence to colleges</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                <span>Develop college-level academic skills</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                <span>Stand out in college applications</span>
              </li>
            </ul>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay="delay-100">
        <CtaBand ctaLabel="Apply Now" ctaHref="/admissions/apply" />
      </ScrollReveal>
    </>
  );
}
