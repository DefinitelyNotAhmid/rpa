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
    <section className="bg-navy py-20 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="text-center space-y-3 mb-14">
          <p className="text-xs text-gold font-semibold uppercase tracking-widest">
            Why Rise Preparatory Academy
          </p>
          <h2 className="font-serif text-white text-2xl md:text-4xl">
            Small Size. Big Opportunities.
          </h2>
          <p className="text-cream/80 text-sm max-w-xl mx-auto">
            What are the benefits of attending Rise Preparatory Academy?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CARDS.map((card) => (
            <div
              key={card.num}
              className="bg-white/5 border border-white/10 rounded-xl px-6 py-8 flex flex-col gap-3 hover:bg-white/10 hover:border-gold/30 transition-all duration-200"
            >
              <span className="font-serif text-gold text-2xl leading-none">
                {card.num}
              </span>
              <h3 className="font-serif text-white text-lg leading-snug">
                {card.heading}
              </h3>
              <p className="text-cream/75 text-sm leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
