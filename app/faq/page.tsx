import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Rise Preparatory Academy — graduation, athletics, tuition, enrollment, and more.",
  openGraph: {
    title: "FAQ | Rise Preparatory Academy",
    description:
      "Answers to common questions about Rise Preparatory Academy — graduation, athletics, tuition, enrollment, and more.",
    url: "https://riseprep.vercel.app/faq",
  },
};

const faqs = [
  {
    q: "Can RPA students attend charter or public schools prom?",
    a: "Yes, for their school they participate as a student-athlete, or students can purchase tickets.",
  },
  {
    q: "Do students graduate from Rise Prep Academy or the school he/she participates in for athletics?",
    a: "The student's diploma will come from RPA. But, students can still walk at their athletic school graduation if approved by the principal.",
  },
  {
    q: "Do I have to withdraw from my school to attend RPA?",
    a: "Yes. RPA is a fully accredited and non-traditional private school registered with the Department of Education (school code 9374).",
  },
  {
    q: "Is RPA accredited?",
    a: "Yes, accredited by the National Association of Private Schools and Cognia. Seniors have been accepted in 15 states and over 30 colleges/universities.",
  },
  {
    q: "Does RPA have certified teachers?",
    a: "Yes, RPA has three certified teachers and two facilitators with three or more years of classroom experience.",
  },
  {
    q: "Can students play football during the fall at one school and play basketball or track at another school?",
    a: "Yes, because RPA doesn't offer athletics.",
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        breadcrumb="Home / FAQ"
      />

      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-navy text-2xl md:text-3xl mb-8">Common Questions</h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <details key={q} className="border border-gray-200 rounded-lg group">
              <summary className="px-5 py-4 cursor-pointer hover:bg-cream/60 rounded-lg list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy flex items-center justify-between gap-4">
                <h3 className="text-navy font-medium text-sm leading-snug">{q}</h3>
                <span className="flex-shrink-0 text-gold text-lg leading-none group-open:rotate-45 transition-transform duration-200">+</span>
              </summary>
              <p className="px-5 pb-5 pt-2 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
