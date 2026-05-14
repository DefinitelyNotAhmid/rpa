import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Curriculum & Fees",
  description:
    "View Rise Preparatory Academy's graduation credit requirements, course offerings, and fee schedule for the academic year.",
  openGraph: {
    title: "Curriculum & Fees | Rise Preparatory Academy",
    description:
      "View Rise Preparatory Academy's graduation credit requirements, course offerings, and fee schedule for the academic year.",
    url: "https://riseprep.vercel.app/academics/curriculum",
  },
};

const creditRequirements = [
  { subject: "English",                         note: "",                                                                                                                          credits: 4 },
  { subject: "Mathematics",                     note: "Algebra I and Geometry are required",                                                                                       credits: 4 },
  { subject: "Science",                         note: "Biology is required",                                                                                                       credits: 3 },
  { subject: "Social Studies",                  note: "1 cr. World History, 1 cr. U.S. History, 0.5 cr. Economics, 0.5 cr. American Government",                                  credits: 3 },
  { subject: "HOPE",                            note: "Physical Education Requirement",                                                                                            credits: 1 },
  { subject: "Fine and Performing Arts",        note: "",                                                                                                                          credits: 1 },
  { subject: "Online Course",                   note: "1 Online Course Completed",                                                                                                credits: 1 },
  { subject: "World Languages",                 note: "2 consecutive years of the same language",                                                                                  credits: 2 },
  { subject: "Electives",                       note: "Including Online",                                                                                                          credits: 8 },
];

const fees = [
  { label: "Tuition",             amount: "$10,000" },
  { label: "Books",               amount: "$500" },
  { label: "Registration",        amount: "$200" },
  { label: "Testing",             amount: "$45" },
  { label: "Lab Fee",             amount: "$200" },
  { label: "One-on-One Tutoring", amount: "$150" },
  { label: "College Prep Testing",amount: "$150" },
];

export default function CurriculumPage() {
  return (
    <>
      <PageHero
        title="Curriculum"
        breadcrumb="Home / Academics / Curriculum"
      />

      <section className="px-8 py-12 max-w-3xl space-y-12 text-gray-600 text-sm leading-relaxed">

        {/* Course Credits */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7a6020]">
            Graduation Requirements
          </p>
          <h2 className="text-navy text-2xl md:text-3xl">Course Credits Required</h2>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-navy text-cream">
                  <th className="px-5 py-3 font-semibold">Subject</th>
                  <th className="px-5 py-3 font-semibold text-right">Credits</th>
                </tr>
              </thead>
              <tbody>
                {creditRequirements.map((row, i) => (
                  <tr key={row.subject} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-cream/40"}`}>
                    <td className="px-5 py-3">
                      <span className="font-medium text-navy">{row.subject}</span>
                      {row.note && (
                        <span className="block text-xs text-gray-600 mt-0.5">{row.note}</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-navy">{credits(row.credits)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Graduation totals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-cream border border-gray-200 rounded-xl px-6 py-5 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-600">State of Florida Total</span>
              <span className="text-2xl font-bold text-navy">24 <span className="text-sm font-normal text-gray-600">credits</span></span>
            </div>
            <div className="bg-navy rounded-xl px-6 py-5 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">RPA Total Required</span>
              <span className="text-2xl font-bold text-white">28 <span className="text-sm font-normal text-cream">credits</span></span>
            </div>
          </div>
        </div>

        {/* Fee Schedule */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7a6020]">
            School Fees
          </p>
          <h2 className="text-navy text-2xl md:text-3xl">Fee Schedule</h2>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-navy text-cream">
                  <th className="px-5 py-3 font-semibold">Fee</th>
                  <th className="px-5 py-3 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee, i) => (
                  <tr key={fee.label} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-cream/40"}`}>
                    <td className="px-5 py-3 text-gray-600">{fee.label}</td>
                    <td className="px-5 py-3 text-right font-medium text-navy">{fee.amount}</td>
                  </tr>
                ))}
                <tr className="bg-gold/10 border-t-2 border-gold">
                  <td className="px-5 py-3 font-bold text-navy">Total</td>
                  <td className="px-5 py-3 text-right font-bold text-navy">$11,245</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </section>
    </>
  );
}

function credits(n: number) {
  return n === 1 ? "1 credit" : `${n} credits`;
}
