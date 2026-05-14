import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Rise Preparatory Academy. Call (305) 760-9494, email us, or visit our campus at 18900 SW 106 Ave, Cutler Bay, FL 33157.",
  openGraph: {
    title: "Contact Us | Rise Preparatory Academy",
    description:
      "Get in touch with Rise Preparatory Academy. Call (305) 760-9494, email us, or visit our campus at 18900 SW 106 Ave, Cutler Bay, FL 33157.",
    url: "https://riseprep.vercel.app/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        breadcrumb="Home / Contact"
      />

      <ScrollReveal>
      <section className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact info */}
        <div className="space-y-6">
          <h2 className="text-navy text-2xl md:text-3xl">Get in Touch</h2>
          <address className="not-italic text-gray-600 text-sm space-y-4 leading-relaxed">
            <p>
              <span className="block font-semibold text-navy">School Address</span>
              18900 SW 106 Ave, Suite 205
              <br />
              Cutler Bay, FL 33157
            </p>
            <p>
              <span className="block font-semibold text-navy">Admissions Office</span>
              <a
                href="tel:+13057609494"
                className="hover:text-navy transition-colors"
              >
                (305) 760-9494
              </a>
            </p>
            <p>
              <span className="block font-semibold text-navy">Fax</span>
              (305) 760-9494
            </p>
            <p>
              <span className="block font-semibold text-navy">Email</span>
              <a
                href="mailto:Sperry@risepreparatory.org"
                className="hover:text-navy transition-colors"
              >
                Sperry@risepreparatory.org
              </a>
            </p>
            <p>
              <span className="block font-semibold text-navy">Office Hours</span>
              Monday – Friday: 8:00 AM – 4:00 PM
            </p>
          </address>
        </div>

        {/* Contact form */}
        <form className="space-y-5" aria-label="Contact form">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy mb-1">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-navy mb-1">
              Email Address
            </label>
            <input
              id="contactEmail"
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-navy mb-1">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>
          <div>
            <label htmlFor="contactMessage" className="block text-sm font-medium text-navy mb-1">
              Message
            </label>
            <textarea
              id="contactMessage"
              name="message"
              rows={5}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy resize-none"
            />
          </div>
          <button type="submit" className="btn-primary w-full md:w-auto">
            Send Message
          </button>
        </form>
      </section>
      </ScrollReveal>

      <ScrollReveal delay="delay-100">
        <CtaBand ctaLabel="Apply Now" ctaHref="/admissions/apply" />
      </ScrollReveal>
    </>
  );
}
