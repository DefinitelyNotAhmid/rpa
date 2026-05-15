import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSR Dashboard | Rise Preparatory Academy",
  description: "Customer Service Representative dashboard for Rise Preparatory Academy.",
  robots: { index: false, follow: false },
};

export default function CsrLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
