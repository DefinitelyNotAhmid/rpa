import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inquiry | Rise Preparatory Academy",
  description: "Chat with the Rise Preparatory Academy admissions team.",
  robots: { index: false, follow: false },
};

export default function InquiryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
