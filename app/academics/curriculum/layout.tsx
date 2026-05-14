"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { label: "Curriculum",              href: "/academics/curriculum" },
  { label: "Courses – High School",   href: "/academics/curriculum/courses-high-school" },
  { label: "Courses – Middle School", href: "/academics/curriculum/courses-middle-school" },
];

export default function CurriculumLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile: pill tab strip */}
      <nav className="md:hidden bg-navy px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
        {sidebarLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-150 ${
                active
                  ? "bg-gold text-deep-navy"
                  : "bg-white/10 text-cream hover:bg-white/20"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col w-56 flex-shrink-0 bg-navy sticky top-[5.75rem] self-start h-[calc(100vh-5.75rem)]">
          <p className="text-[0.6rem] font-bold uppercase tracking-widest text-gold px-5 pt-6 pb-3">
            Academics
          </p>
          <nav className="flex flex-col">
            {sidebarLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-5 py-3.5 text-sm font-medium transition-colors duration-150 border-l-4 ${
                    active
                      ? "border-gold text-gold bg-white/5"
                      : "border-transparent text-cream/90 hover:text-cream hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content area */}
        <main className="flex-1 bg-cream min-w-0">
          {children}
        </main>
      </div>
    </>
  );
}
