const WHY_CARDS = [
  {
    num: "01",
    heading: "1 Year = 2 Years",
    body: "One year equals two years of core classes. Early enrollee guarantee compared to the traditional setting.",
  },
  {
    num: "02",
    heading: "Grades 5 – 12",
    body: "Middle school students can take high school courses for tremendous advancement and early credit.",
  },
  {
    num: "03",
    heading: "College Board Registered",
    body: "School Code 100723. Diplomas recognized by employers, colleges, and universities in 15+ states.",
  },
  {
    num: "04",
    heading: "Certified Instructors",
    body: "Three or more years of classroom experience. Small class sizes. Hands-on, personal attention.",
  },
];

export function WhyRpaSection() {
  return (
    <section className="relative bg-navy py-24 px-4 overflow-hidden">
      {/* Subtle radial warm glow — texture only */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <div className="w-8 h-px bg-gold/50 mx-auto mb-6" />
          <h2 className="font-serif text-white text-3xl md:text-5xl leading-tight">
            Small Size. Big Opportunities.
          </h2>
        </div>

        {/* Cards — no boxes, vertical dividers only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CARDS.map((card, i) => (
            <div
              key={card.num}
              className={`relative px-8 py-2 flex flex-col gap-0
                ${i < WHY_CARDS.length - 1 ? "lg:border-r border-gold/20" : ""}
                ${i > 0 ? "sm:border-l lg:border-l-0 border-gold/10" : ""}
              `}
            >
              {/* Large faint number — display texture */}
              <span
                className="font-serif leading-none select-none mb-2"
                style={{
                  fontSize: "clamp(4rem, 7vw, 6rem)",
                  color: "rgba(201,168,76,0.55)",
                }}
              >
                {card.num}
              </span>

              {/* Heading */}
              <h3 className="font-serif text-white text-lg md:text-xl leading-snug mb-3">
                {card.heading}
              </h3>

              {/* Rule */}
              <div className="w-8 h-px bg-gold/40 mb-3" />

              {/* Body */}
              <p className="font-sans text-cream/55 text-sm leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
