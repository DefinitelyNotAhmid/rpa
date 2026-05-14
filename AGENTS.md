# Rise Preparatory Academy — Website Redesign Agent

## Mission
You are a Next.js + Tailwind CSS developer agent tasked with auditing and rebuilding the Rise Preparatory Academy website. Fix all 22 identified UX, design, and navigation issues while staying true to the school's brand. Work methodically, one fix per commit.

**Stack:** Next.js (App Router), Tailwind CSS v3, TypeScript

---

## Step 0 — Project Setup (Do This First)

### 0a. Tailwind Config — Extend with Brand Tokens

In `tailwind.config.ts`, add the following under `theme.extend`:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:        '#1C2956',
        'deep-navy': '#030349',
        cream:       '#f7f3f3',
        gold:        '#C9A84C',
        'gold-dark': '#b8912f',
        muted:       '#6b7280',
      },
      fontFamily: {
        serif: ['Cardo', 'Georgia', 'serif'],
        sans:  ['Figtree', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.12em',
      },
    },
  },
  plugins: [],
}

export default config
```

### 0b. Load Google Fonts in `app/layout.tsx`

```tsx
import { Cardo, Figtree } from 'next/font/google'

const cardo = Cardo({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cardo.variable} ${figtree.variable}`}>
      <body className="font-sans bg-cream text-deep-navy antialiased">
        {children}
      </body>
    </html>
  )
}
```

### 0c. Global Tailwind Typography Defaults (`app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1, h2, h3 { @apply font-serif; }
  h4, h5, h6, p, a, button, label, li { @apply font-sans; }
}

@layer components {
  .btn-primary {
    @apply bg-gold text-deep-navy font-sans font-semibold text-sm uppercase
           tracking-widest px-7 py-3 rounded transition-all duration-200
           hover:bg-gold-dark hover:-translate-y-px focus-visible:outline-none
           focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2;
  }
  .btn-ghost {
    @apply border border-cream text-cream font-sans text-sm px-4 py-2 rounded
           transition-colors duration-200 hover:bg-white/10
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream;
  }
  .dropdown-group-label {
    @apply font-sans text-[0.65rem] font-bold tracking-widest2 uppercase
           text-muted px-4 pt-3 pb-1 pointer-events-none select-none;
  }
}
```

---

## Reusable Components to Build First

Create these shared components before fixing individual pages. They are referenced across all 22 fixes.

### `components/ui/ButtonPrimary.tsx`
```tsx
import Link from 'next/link'

interface Props {
  href: string
  children: React.ReactNode
  external?: boolean
}

export function ButtonPrimary({ href, children, external }: Props) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer"
         className="btn-primary inline-flex items-center gap-1.5">
        {children}
        <ExternalIcon />
      </a>
    )
  }
  return <Link href={href} className="btn-primary inline-block">{children}</Link>
}

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true" className="opacity-70">
      <path d="M3.5 3H2a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V8.5M7 1h4m0 0v4m0-4L5 7"
            stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  )
}
```

### `components/ui/PageHero.tsx`
```tsx
import Image from 'next/image'

interface Props {
  title: string
  breadcrumb?: string
  imageSrc: string
  imageAlt: string
}

export function PageHero({ title, breadcrumb, imageSrc, imageAlt }: Props) {
  return (
    <section className="relative h-[300px] md:h-[340px] flex items-center justify-center overflow-hidden">
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-navy/60" />
      <div className="relative z-10 text-center px-4">
        {breadcrumb && (
          <p className="font-sans text-[0.85rem] text-cream/70 mb-2 tracking-wide">{breadcrumb}</p>
        )}
        <h1 className="font-serif font-bold text-white text-3xl md:text-5xl">{title}</h1>
      </div>
    </section>
  )
}
```

### `components/ui/CtaBand.tsx`
```tsx
import { ButtonPrimary } from './ButtonPrimary'

interface Props {
  heading?: string
  ctaLabel: string
  ctaHref: string
  variant?: 'navy' | 'gold'
}

export function CtaBand({
  heading = 'Ready to experience Rise Prep?',
  ctaLabel,
  ctaHref,
  variant = 'navy',
}: Props) {
  const bg   = variant === 'gold' ? 'bg-gold'       : 'bg-navy'
  const text = variant === 'gold' ? 'text-deep-navy' : 'text-cream'

  return (
    <section className={`${bg} ${text} w-full py-14 px-4 flex flex-col items-center gap-6 text-center`}>
      <h2 className="font-serif text-2xl md:text-3xl">{heading}</h2>
      <ButtonPrimary href={ctaHref}>{ctaLabel}</ButtonPrimary>
    </section>
  )
}
```

### `components/ui/ExternalLink.tsx`
```tsx
export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
       className="inline-flex items-center gap-1 text-navy underline underline-offset-2 hover:text-gold transition-colors">
      {children}
      <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true" className="opacity-50">
        <path d="M3.5 3H2a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V8.5M7 1h4m0 0v4m0-4L5 7"
              stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </svg>
    </a>
  )
}
```

---

## Fix Checklist

### 1. Hero Section Image
- [ ] Use `next/image` with `fill` prop — never a raw `<img>` tag
- [ ] Place the lifestyle photo at `/public/images/hero.jpg`
- [ ] Structure:
```tsx
<section className="relative h-[85vh] min-h-[560px] flex items-center">
  <Image src="/images/hero.jpg" alt="Students at Rise Preparatory Academy"
         fill className="object-cover" priority />
  <div className="absolute inset-0 bg-deep-navy/50" />
  <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
    <h1 className="font-serif font-bold text-white text-[clamp(2.5rem,5vw,4.5rem)] leading-tight mb-4">
      Accelerated Excellence Starts Here
    </h1>
    <p className="font-sans text-cream text-lg md:text-xl mb-8 max-w-xl mx-auto">
      A college-preparatory academy built for driven students.
    </p>
    <ButtonPrimary href="/admissions/apply">Apply Now</ButtonPrimary>
  </div>
</section>
```

### 2. Navigation Bar — Consolidate
- [ ] Create `components/layout/Navbar.tsx` with two tiers

**Utility bar** (slim strip above nav):
```tsx
<div className="bg-deep-navy text-cream/80 text-xs font-sans py-1.5">
  <div className="max-w-7xl mx-auto px-6 flex justify-end gap-6">
    <Link href="/student-login"       className="hover:text-white transition-colors">Student Login</Link>
    <span className="opacity-30">|</span>
    <Link href="/transcript-request"  className="hover:text-white transition-colors">Transcript Request</Link>
  </div>
</div>
```

**Main nav bar** (sticky):
```tsx
<nav className="sticky top-0 z-50 bg-navy shadow-md">
  <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
    <Link href="/">
      <Image src="/images/logo-white.png" alt="Rise Preparatory Academy" width={160} height={48} />
    </Link>
    <div className="hidden md:flex items-center gap-8 font-sans text-cream text-sm font-medium">
      <NavDropdown label="About"    items={aboutItems} />
      <NavDropdown label="Academics" items={academicsItems} />
      <Link href="/admissions" className="hover:text-gold transition-colors">Admissions</Link>
      <Link href="/contact"    className="hover:text-gold transition-colors">Contact</Link>
    </div>
    <ButtonPrimary href="/admissions/apply">Apply Now</ButtonPrimary>
  </div>
</nav>
```
- [ ] Remove duplicate "Contact" and "Enrollment" entries from all nav data arrays
- [ ] Remove "Testimonials" from nav — it becomes `<TestimonialsSection />` on the homepage

### 3. Accreditation / Trust Bar
- [ ] Create `components/sections/TrustBar.tsx`:
```tsx
export function TrustBar() {
  return (
    <div className="bg-cream border-b border-gray-200 py-5">
      <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-10">
        <Image src="/images/cognia-seal.png" alt="Cognia Accredited"
               height={56} width={100} className="object-contain" />
        <div className="h-8 w-px bg-gray-300" />
        <span className="font-sans text-sm text-muted uppercase tracking-widest">Est. 2010</span>
      </div>
    </div>
  )
}
```
- [ ] Insert `<TrustBar />` immediately after `<HeroSection />` on `app/page.tsx`

### 4. Testimonial — Typography Hierarchy
- [ ] Create `components/sections/TestimonialsSection.tsx`
- [ ] Pull quote:
```tsx
<blockquote className="max-w-2xl mx-auto text-center px-6">
  <p className="font-serif italic text-navy text-2xl md:text-3xl leading-relaxed
                before:content-['\u201C'] after:content-['\u201D']">
    He drastically changed my son's life.
  </p>
</blockquote>
```
- [ ] Body text: `className="font-sans text-muted text-base max-w-xl mx-auto leading-relaxed"`
- [ ] Use `<details>` / `<summary>` for the full story — no JS required:
```tsx
<details className="text-center mt-4">
  <summary className="font-sans text-sm text-navy cursor-pointer hover:underline list-none">
    Read full story ↓
  </summary>
  <p className="font-sans text-muted text-sm mt-3 max-w-xl mx-auto text-left leading-relaxed">
    {fullStory}
  </p>
</details>
```

### 5. Primary CTA Button
- [ ] `.btn-primary` is defined in `globals.css` (Step 0c) — do not redefine elsewhere
- [ ] Use `<ButtonPrimary>` everywhere a CTA appears — never a plain `<a>` or `<button>` with inline styles
- [ ] Confirm "Apply Now" is pinned inside the sticky `<Navbar />` at all scroll positions
- [ ] Confirm it also appears inside the hero (Fix #1)

### 6. College Acceptance — Logo Grid
- [ ] Remove the single university building `<Image>`
- [ ] Create `lib/data/universities.ts`:
```ts
export interface University { name: string; logo: string }
export const universities: University[] = [
  { name: 'Bethune-Cookman University', logo: '/images/universities/bcu.png' },
  // add more...
]
```
- [ ] Replace section with:
```tsx
<section className="bg-cream py-14 px-4">
  <h2 className="font-serif text-navy text-2xl md:text-3xl text-center mb-10">
    Where Our Graduates Excel
  </h2>
  <div className="max-w-4xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
    {universities.map((u) => (
      <Image key={u.name} src={u.logo} alt={u.name} width={100} height={50}
             className="object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100" />
    ))}
  </div>
</section>
```

### 7. Non-Discriminatory Policy
- [ ] Delete the full policy block from every page/component it appears in
- [ ] Create `app/policies/page.tsx` to host the full text with `<PageHero />`
- [ ] In the footer, add only:
```tsx
<Link href="/policies" className="text-cream/50 hover:text-cream/80 text-xs transition-colors">
  Non-Discriminatory Policy
</Link>
```

### 8. Fat Footer — Three Columns
- [ ] Create `components/layout/Footer.tsx`:
```tsx
<footer className="bg-deep-navy text-cream font-sans">
  <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

    {/* Brand column */}
    <div className="md:col-span-1">
      <Image src="/images/logo-white.png" alt="Rise Preparatory Academy" width={140} height={42} />
      <p className="mt-3 text-cream/60 text-sm font-light leading-relaxed max-w-[200px]">
        Empowering students through accelerated academic excellence.
      </p>
      {/* Social icons added in Fix #11 */}
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-gold text-xs font-semibold uppercase tracking-widest2 mb-4">Quick Links</h3>
      <ul className="space-y-2 text-sm text-cream/70">
        <li><Link href="/admissions"   className="hover:text-cream transition-colors">Admissions</Link></li>
        <li><Link href="/academics"    className="hover:text-cream transition-colors">Academics</Link></li>
        <li><Link href="/tuition"      className="hover:text-cream transition-colors">Tuition</Link></li>
      </ul>
    </div>

    {/* Community */}
    <div>
      <h3 className="text-gold text-xs font-semibold uppercase tracking-widest2 mb-4">Community</h3>
      <ul className="space-y-2 text-sm text-cream/70">
        <li><Link href="/student-login"       className="hover:text-cream transition-colors">Student Login</Link></li>
        <li><Link href="/transcript-request"  className="hover:text-cream transition-colors">Transcript Request</Link></li>
        <li><Link href="/calendar"            className="hover:text-cream transition-colors">Calendar</Link></li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="text-gold text-xs font-semibold uppercase tracking-widest2 mb-4">Contact</h3>
      <address className="not-italic text-sm text-cream/70 space-y-2">
        <p>123 Academy Drive<br />City, FL 00000</p>
        <p><a href="tel:+10000000000"                           className="hover:text-cream transition-colors">(000) 000-0000</a></p>
        <p><a href="mailto:info@risepreparatoryacademy.org"     className="hover:text-cream transition-colors">info@riseprep.org</a></p>
      </address>
    </div>

  </div>

  {/* Sub-footer — Fix #10 */}
  <div className="bg-[#020235] border-t border-white/5 py-3 px-6 text-center">
    <p className="font-sans text-[0.7rem] text-cream/40 tracking-wide">
      © {new Date().getFullYear()} Rise Preparatory Academy · Designed by BASIC Solutions Group
    </p>
  </div>
</footer>
```

### 9. Footer — Brand Reiteration
- [ ] Already built into Fix #8 (brand column: logo + micro-mission)
- [ ] Confirm `/public/images/logo-white.png` exists — white or monochrome version only
- [ ] If the asset is missing, request it from the client before deploying

### 10. Copyright / Sub-Footer
- [ ] Already built into Fix #8 — the `bg-[#020235]` sub-footer strip at the bottom of `Footer.tsx`
- [ ] Keep font ≤ 0.7rem, opacity ≤ 40% so it visually recedes

### 11. Social Media Icons
- [ ] Run: `npm install lucide-react` (if not already installed)
- [ ] Add to the brand column in `Footer.tsx`:
```tsx
import { Facebook, Instagram, Linkedin } from 'lucide-react'

const socials = [
  { icon: <Facebook size={18} />,  href: 'https://facebook.com/riseprep',  label: 'Facebook' },
  { icon: <Instagram size={18} />, href: 'https://instagram.com/riseprep', label: 'Instagram' },
  { icon: <Linkedin size={18} />,  href: 'https://linkedin.com/school/riseprep', label: 'LinkedIn' },
]

<div className="flex gap-4 mt-5">
  {socials.map(({ icon, href, label }) => (
    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
       aria-label={label}
       className="text-cream/50 hover:text-white hover:scale-110 transition-all duration-200">
      {icon}
    </a>
  ))}
</div>
```

### 12. PayPal Icon in Nav
- [ ] Search: `grep -r "paypal\|fa-paypal\|PayPal" components/`
- [ ] Remove any icon import or image reference found in nav components
- [ ] The enrollment link should be `<ButtonPrimary href="..." external>Apply Now</ButtonPrimary>`

### 13. Dropdown Height — Overflow Fix
- [ ] Audit all nav data arrays: flag any with >6 items
- [ ] Move all policy/compliance items to the footer (Fix #7, #8)
- [ ] For dropdowns needing >6 genuine items, use a two-column Mega Menu:
```tsx
<div className="absolute top-full left-0 bg-white shadow-xl rounded-b-lg
                grid grid-cols-2 gap-x-6 p-5 min-w-[440px]">
```
- [ ] QA test: open every dropdown at `1280×800` viewport in Chrome DevTools — nothing should clip

### 14. Dropdown Gap / Tunneling Fix
- [ ] In `NavDropdown.tsx`, use `group` hover with a visibility delay on hide:
```tsx
'use client'
import { useState } from 'react'

export function NavDropdown({ label, items }: NavDropdownProps) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-cream hover:text-gold transition-colors py-1">
        {label}
        <ChevronDown size={14} className="opacity-60 group-hover:rotate-180 transition-transform duration-200" />
      </button>
      {/* mt-0 ensures zero gap — prevents tunneling */}
      <div className={`
        absolute top-full left-0 mt-0 bg-white shadow-lg rounded-b-lg min-w-[200px]
        opacity-0 invisible pointer-events-none
        group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto
        transition-[opacity,visibility] duration-150
        [transition-delay:200ms] group-hover:[transition-delay:0ms]
      `}>
        <ul className="py-2">{/* items */}</ul>
      </div>
    </div>
  )
}
```

### 15. Dropdown — Consistent Labels
- [ ] Open `lib/data/nav.ts` and apply these renames:

  | Before | After |
  |---|---|
  | Employee Ethical Standards-Policy and Procedures | Employee Standards |
  | 2024-2025 Parent Student Handbook | School Handbook |
  | Frequently Asked Questions | FAQs |
  | 2024-2025 RPA Enrollment Application | Apply Now |

- [ ] Enforce: all labels Title Case, max 3 words, no year prefixes, no dashes
- [ ] TypeScript type for nav items:
```ts
// lib/data/nav.ts
export interface NavItem {
  /** Max 25 characters. Title Case. No year prefixes. */
  label: string
  href: string
  external?: boolean
  isPrimary?: boolean
  groupLabel?: string
}
```

### 16. Interior Page — Section Hero Banner
- [ ] Use `<PageHero />` at the top of every interior page route:
```tsx
// app/about/page.tsx
import { PageHero } from '@/components/ui/PageHero'
export default function AboutPage() {
  return (
    <main>
      <PageHero title="About Us" breadcrumb="Home / About"
                imageSrc="/images/about-hero.jpg" imageAlt="Rise Prep campus" />
      {/* page content */}
    </main>
  )
}
```
- [ ] Required pages: `/about`, `/academics`, `/admissions`, `/contact`, `/policies`
- [ ] Add hero images to `/public/images/` — one per page

### 17. End-of-Page CTA Hook
- [ ] Add `<CtaBand />` before `</main>` on every content page:
```tsx
// app/about/page.tsx
<CtaBand ctaLabel="Apply Now" ctaHref="/admissions/apply" />

// app/academics/page.tsx
<CtaBand heading="Have questions about our curriculum?"
         ctaLabel="Contact Admissions" ctaHref="/contact" variant="gold" />
```
- [ ] No page should end on content with no forward path

### 18. External Link Indicator
- [ ] All external links use `<ButtonPrimary external>` or `<ExternalLink>` (built above)
- [ ] Audit: `grep -r 'target="_blank"' app/ components/` — confirm every result uses one of these components
- [ ] Never use a raw `<a target="_blank">` without the external icon

### 19. Dropdown Label Length
- [ ] Covered by Fix #15
- [ ] Verify: `grep -r "label:" lib/data/nav.ts` — no label should exceed 25 characters

### 20. Primary Action Visual Distinction in Dropdowns
- [ ] In `NavDropdown.tsx`, render `isPrimary` items with gold background:
```tsx
<Link href={item.href}
  className={`block px-4 py-2 text-sm font-sans rounded transition-colors
    ${item.isPrimary
      ? 'bg-gold text-deep-navy font-semibold mb-2 hover:bg-gold-dark'
      : 'text-gray-700 hover:bg-cream hover:text-navy'
    }`}>
  {item.label}
</Link>
```

### 21. Remove Duplicate Application Link
- [ ] Search: `grep -r "apply\|enrollment\|application" lib/data/nav.ts`
- [ ] Remove every application entry from dropdown arrays
- [ ] The only "Apply Now" in the nav is `<ButtonPrimary>` in the main navbar (Fix #2)

### 22. Dropdown — Group by Function
- [ ] Use the `groupLabel` field from the `NavItem` type (Fix #15)
- [ ] In `NavDropdown.tsx`, render group headers above their first item:
```tsx
import { Fragment } from 'react'

{items.map((item) => (
  <Fragment key={item.href}>
    {item.groupLabel && (
      <li className="dropdown-group-label">{item.groupLabel}</li>
    )}
    <li>
      <Link href={item.href}
        className={`block px-4 py-2 text-sm font-sans rounded transition-colors
          ${item.isPrimary
            ? 'bg-gold text-deep-navy font-semibold mb-2 hover:bg-gold-dark'
            : 'text-gray-700 hover:bg-cream hover:text-navy'
          }`}>
        {item.label}
      </Link>
    </li>
  </Fragment>
))}
```
- [ ] Example nav data:
```ts
export const academicsItems: NavItem[] = [
  { label: 'Apply Now',     href: '/admissions/apply',   isPrimary: true, groupLabel: 'START HERE' },
  { label: 'Curriculum',    href: '/academics/curriculum',               groupLabel: 'RESOURCES' },
  { label: 'Grading Scale', href: '/academics/grading' },
  { label: 'School Handbook', href: '/academics/handbook' },
  { label: 'FAQs',          href: '/academics/faq' },
]
```

---

## Code Standards (Next.js + Tailwind)

- **Routing:** App Router (`app/` directory) only — no `pages/` directory
- **Images:** Always `next/image` — never raw `<img>`. Include `alt` + `width`/`height` or `fill`
- **Links:** Always `next/link` for internal routes — never `<a href>` internally
- **Fonts:** Load only via `next/font/google` in `app/layout.tsx` — no `<link>` tags in `<head>`
- **No inline styles** — every style via Tailwind class or `globals.css` component layer
- **Accessibility:** All interactive elements need `focus-visible` ring. Icons get `aria-hidden="true"`
- **TypeScript:** All components and data files fully typed. No `any`
- **Mobile-first:** Base classes are mobile; `md:` / `lg:` for wider viewports
- **`'use client'`:** Only on components that use hooks, browser APIs, or event handlers. Default to Server Components

---

## File Structure Reference

```
app/
  layout.tsx                ← font loading, global providers
  globals.css               ← Tailwind directives + .btn-primary, .btn-ghost, .dropdown-group-label
  page.tsx                  ← Homepage
  about/page.tsx
  academics/page.tsx
  admissions/
    page.tsx
    apply/page.tsx
  contact/page.tsx
  policies/page.tsx         ← Non-discriminatory policy (Fix #7)

components/
  layout/
    Navbar.tsx              ← Utility bar + sticky main nav (Fix #2)
    NavDropdown.tsx         ← Dropdown with group labels + tunneling fix (Fixes #13–15, #20–22)
    Footer.tsx              ← Fat footer + sub-footer (Fixes #8–11)
  sections/
    HeroSection.tsx         ← Homepage hero (Fix #1)
    TrustBar.tsx            ← Accreditation bar (Fix #3)
    TestimonialsSection.tsx ← Pull quote + read-more toggle (Fix #4)
    UniversityGrid.tsx      ← Logo grid (Fix #6)
  ui/
    ButtonPrimary.tsx       ← Reusable CTA button (Fix #5, #18)
    PageHero.tsx            ← Interior page banner (Fix #16)
    CtaBand.tsx             ← End-of-page CTA hook (Fix #17)
    ExternalLink.tsx        ← Inline external link (Fix #18)

lib/
  data/
    nav.ts                  ← NavItem type + all nav arrays (Fixes #15, #19–22)
    universities.ts         ← University logo data (Fix #6)

public/
  images/
    hero.jpg
    about-hero.jpg
    logo-white.png          ← White/monochrome logo for dark backgrounds
    cognia-seal.png
    universities/           ← Individual university logo files
```

---

## Commit Strategy

One commit per fix. Format:
```
fix(#0): extend tailwind config with brand tokens and load Cardo + Figtree
fix(#2): consolidate dual navbars into utility bar + sticky main nav
fix(#5): add Apply Now ButtonPrimary to navbar and hero
fix(#1): replace hero silhouette with next/image + deep-navy overlay
```

**Recommended start order:** `0 → 5 → 2 → 1 → 8 → 16` (highest visual impact first), then numerically.

---

## Done Condition

The site is complete when:
1. All 22 checkboxes are marked complete
2. `npm run build` completes with zero TypeScript errors
3. Lighthouse accessibility ≥ 85 on homepage and at least two interior pages
4. "Apply Now" `<ButtonPrimary>` is visible in the sticky nav at all scroll positions on desktop and mobile
5. All dropdowns are fully visible on a `1280×800` viewport with no clipping
6. `grep -r "apply\|enrollment" lib/data/nav.ts` returns zero dropdown entries
7. Footer renders: logo, micro-mission, three link columns, social icons, and sub-footer on all screen sizes
