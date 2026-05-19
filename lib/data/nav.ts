export interface NavItem {
  /** Max 25 characters. Title Case. No year prefixes. */
  label: string;
  href: string;
  external?: boolean;
  isPrimary?: boolean;
  groupLabel?: string;
  column?: 1 | 2;
  isFooterCta?: boolean;
}

export const aboutItems: NavItem[] = [
  { label: "About Us",               href: "/about",             groupLabel: "ABOUT US",  column: 1 },
  { label: "Our Mission & Vision",            href: "/about/mission-vision",                              column: 1 },
  { label: "Accreditation & Membership",          href: "/about/accreditation",                        column: 1 },
  { label: "Standard of Ethical Conduct",        href: "/policies/standards-of-ethical-conduct", groupLabel: "POLICIES",  column: 2 },
  { label: "Employee Ethical Standards", href: "/policies/employee-ethical-standards",                     column: 2 },
  { label: "Ethics in Education",    href: "/policies/ethics-in-education",               column: 2 },
  { label: "Non-Discrimination Policy", href: "/policies",                                column: 2 },
  { label: "Ready to Apply",            href: "/admissions/apply",                        isFooterCta: true },
  { label: "Contact Us",                href: "/contact",                                 isFooterCta: true },
];

export const academicsItems: NavItem[] = [
  { label: "Apply Now",              href: "/admissions/apply",    isPrimary: true, groupLabel: "ADMISSIONS", column: 1 },
  { label: "Tuition & Fees",         href: "/admissions/tuition",                                            column: 1 },
  { label: "Curriculum",             href: "/academics/curriculum",                 groupLabel: "ACADEMICS",  column: 1 },
  { label: "Advanced Placement",     href: "/academics/advanced-placement",                                  column: 1 },
  { label: "Community Service",      href: "/academics/community-service",                                  column: 1 },
  { label: "Grading Scale",          href: "/academics#grading",                                             column: 1 },
  { label: "FAQs",                   href: "/faq",                                  groupLabel: "RESOURCES",  column: 2 },
  { label: "Parent-Student Handbook",href: "/academics#handbook",                                            column: 2 },
];
