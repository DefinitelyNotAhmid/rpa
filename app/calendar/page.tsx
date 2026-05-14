import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "School Calendar",
  description:
    "View upcoming school events, academic dates, holidays, and activities at Rise Preparatory Academy in Cutler Bay, FL.",
  openGraph: {
    title: "School Calendar | Rise Preparatory Academy",
    description:
      "View upcoming school events, academic dates, holidays, and activities at Rise Preparatory Academy in Cutler Bay, FL.",
    url: "https://riseprep.vercel.app/calendar",
  },
};

const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/r?cid=YOUR_CALENDAR_ID%40group.calendar.google.com";

const categories = [
  { color: "bg-navy",        label: "Academic Dates" },
  { color: "bg-gold",        label: "School Events" },
  { color: "bg-red-500",     label: "Holidays / No School" },
  { color: "bg-emerald-500", label: "Sports & Activities" },
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function getMiniCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { year, month, today, firstDay, daysInMonth };
}

export default function CalendarPage() {
  const { year, month, today, firstDay, daysInMonth } = getMiniCalendar();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return (
    <>
      <PageHero
        title="School Calendar"
        breadcrumb="Home / Calendar"
        imageSrc="/18900-SW-106th-Ave-Miami-FL-Building-Photo-2-LargeHighDefinition.webp"
        imageAlt="Rise Preparatory Academy campus"
      />

      <section className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">

        {/* ── Left Panel ── */}
        <aside className="space-y-8">

          {/* Mini calendar */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Month header */}
            <div className="bg-navy text-cream px-5 py-4 flex items-center justify-between">
              <h2 className="font-serif text-base font-semibold">
                {MONTHS[month]} {year}
              </h2>
            </div>

            {/* Grid */}
            <div className="px-4 py-4">
              {/* Day labels */}
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map((d) => (
                  <span key={d} className="text-center text-[0.6rem] font-bold uppercase tracking-widest text-gray-600 py-1">
                    {d}
                  </span>
                ))}
              </div>
              {/* Weeks */}
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-xs font-medium transition-colors
                        ${day === null ? "" : "cursor-default"}
                        ${day === today
                          ? "bg-navy text-white font-bold"
                          : day !== null
                          ? "text-gray-700 hover:bg-cream"
                          : ""}
                      `}
                    >
                      {day ?? ""}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-5 py-5 space-y-3">
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-gray-600 mb-3">
              Event Categories
            </p>
            {categories.map(({ color, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full flex-shrink-0 ${color}`} />
                <span className="text-sm text-gray-700">{label}</span>
              </div>
            ))}
          </div>

          {/* External link */}
          <a
            href={`https://calendar.google.com/calendar/r`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full border border-navy/30 text-navy text-sm font-semibold rounded-xl py-3 hover:bg-navy hover:text-white transition-all duration-200"
          >
            View Full Calendar
            <svg width="13" height="13" viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3.5 3H2a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V8.5M7 1h4m0 0v4m0-4L5 7"/>
            </svg>
          </a>
        </aside>

        {/* ── Right Panel — Google Calendar link-out ── */}
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white flex flex-col">
          <div className="bg-navy px-6 py-4">
            <h2 className="font-serif text-cream text-lg">Rise Prep — {new Date().getFullYear()} Events</h2>
            <p className="text-cream/60 text-xs mt-0.5">School events, academic dates & activities</p>
          </div>

          {/* Link-out card */}
          <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-8 py-20">
            <div className="w-20 h-20 rounded-full bg-navy/8 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1C2956" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>

            <div className="space-y-2 max-w-sm">
              <p className="font-serif text-navy text-2xl">School Calendar</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                View all upcoming school events, academic dates, holidays, and activities on our Google Calendar.
              </p>
            </div>

            <a
              href={GOOGLE_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Open Google Calendar
              <svg width="13" height="13" viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3.5 3H2a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V8.5M7 1h4m0 0v4m0-4L5 7"/>
              </svg>
            </a>

            <p className="text-xs text-gray-600">
              Opens in Google Calendar &mdash; no account required to view
            </p>
          </div>
        </div>

      </section>
    </>
  );
}
