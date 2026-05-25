import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { UniversityGrid } from "@/components/sections/UniversityGrid";
import { UniversityMarquee } from "@/components/sections/UniversityMarquee";
import { WhyRpaSection } from "@/components/sections/WhyRpaSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Rise Preparatory Academy — College-Prep School in Cutler Bay, FL",
  description:
    "Rise Preparatory Academy is an accredited college-preparatory private school in Cutler Bay, FL serving grades 5–12. Accelerated academics, 30+ college acceptances.",
  openGraph: {
    title: "Rise Preparatory Academy — College-Prep School in Cutler Bay, FL",
    description:
      "Rise Preparatory Academy is an accredited college-preparatory private school in Cutler Bay, FL serving grades 5–12. Accelerated academics, 30+ college acceptances.",
    url: "https://riseprep.vercel.app",
  },
};

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riseprep.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: "Rise Preparatory Academy",
  alternateName: "Rise Prep",
  url: SITE,
  logo: `${SITE}/slazzer-preview-u8tbq.png`,
  image: `${SITE}/og-image.jpg`,
  description:
    "An accredited, college-preparatory private school in Cutler Bay, FL offering accelerated academics for grades 5–12.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "18900 SW 106 Ave, Suite 205",
    addressLocality: "Cutler Bay",
    addressRegion: "FL",
    postalCode: "33157",
    addressCountry: "US",
  },
  telephone: "+13057609494",
  email: "Sperry@risepreparatory.org",
  foundingDate: "2010",
  areaServed: "Cutler Bay, FL",
  knowsAbout: ["College Preparation", "Accelerated Academics", "Grades 5-12"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ScrollReveal><TrustBar /></ScrollReveal>
      <ScrollReveal delay="delay-100"><WhyRpaSection /></ScrollReveal>
      <ScrollReveal delay="delay-200"><UniversityGrid /></ScrollReveal>
      <ScrollReveal delay="delay-100"><UniversityMarquee /></ScrollReveal>
      <ScrollReveal delay="delay-100"><TestimonialsSection /></ScrollReveal>
      <ScrollReveal delay="delay-100"><CtaBand ctaLabel="Apply Now" ctaHref="/admissions/apply" /></ScrollReveal>
    </>
  );
}
