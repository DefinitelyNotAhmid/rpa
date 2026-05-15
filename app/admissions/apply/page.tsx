import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Apply Now",
  description:
    "Start your application to Rise Preparatory Academy. Complete the form and our admissions team will follow up within 3–5 business days.",
  openGraph: {
    title: "Apply Now | Rise Preparatory Academy",
    description:
      "Start your application to Rise Preparatory Academy. Complete the form and our admissions team will follow up within 3–5 business days.",
    url: "https://riseprep.vercel.app/admissions/apply",
  },
};

export default function ApplyPage() {
  return (
    <>
      <PageHero
        title="Apply Now"
        breadcrumb="Home / Admissions / Apply"
      />

      <section className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-gray-700 leading-relaxed mb-8">
          Complete the form below to begin your application to Rise Preparatory
          Academy. A member of our admissions team will follow up within 3–5
          business days.
        </p>

        <form className="space-y-6" aria-label="Application form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-navy mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-navy mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">
              Parent / Guardian Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>

          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-navy mb-1">
              Grade Applying For
            </label>
            <select
              id="grade"
              name="grade"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy bg-white"
            >
              <option value="">Select a grade</option>
              {Array.from({ length: 8 }, (_, i) => (
                <option key={i} value={String(i + 5)}>
                  Grade {i + 5}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-navy mb-1">
              Additional Information
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy resize-none"
            />
          </div>

          <button type="submit" className="btn-primary w-full md:w-auto">
            Submit Application
          </button>
        </form>
      </section>
    </>
  );
}
