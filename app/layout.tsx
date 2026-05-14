import type { Metadata } from "next";
import { Roboto_Slab, Figtree } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cardo",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://riseprep.vercel.app"),
  title: {
    default: "Rise Preparatory Academy — Cutler Bay, FL",
    template: "%s | Rise Preparatory Academy",
  },
  description:
    "Rise Preparatory Academy is an accredited, college-preparatory private school in Cutler Bay, FL, offering accelerated academics for grades 5–12.",
  keywords: [
    "Rise Preparatory Academy",
    "Rise Prep",
    "RPA school Florida",
    "college prep school Florida",
    "private school Cutler Bay",
    "accelerated high school Miami",
    "private middle school Miami",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://riseprep.vercel.app",
    siteName: "Rise Preparatory Academy",
    title: "Rise Preparatory Academy — Cutler Bay, FL",
    description:
      "An accredited, college-preparatory private school in Cutler Bay, FL offering accelerated academics for grades 5–12.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rise Preparatory Academy campus — Cutler Bay, FL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rise Preparatory Academy — Cutler Bay, FL",
    description:
      "An accredited, college-preparatory private school in Cutler Bay, FL offering accelerated academics for grades 5–12.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "F6gSPlfLoWtvdvNy3Ke4iQ4Uq1DlyTUuZH15vWGSg8I",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${robotoSlab.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-deep-navy">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
