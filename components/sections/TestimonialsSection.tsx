"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  full: ReactNode;
}

const testimonials: Testimonial[] = [
  {
    quote: "He drastically changed my son\u2019s life within a few months of being a Rise Prep Academy student.",
    author: "Tiffany Winters",
    role: "Parent of a Rise Prep Graduate",
    full: (
      <>
        My son has been through both the worse &amp; tough times in his life when it comes to academics. He began struggling around 3rd grade. He quickly started falling behind. To the point he failed the 3rd grade. I felt like a bad parent &amp; felt like I had a non-teachable child. I took all the necessary steps from teacher conferences and also going the length to reach out to the School Board. Long story short we tried different schools, different teachers and even classes. Then 1 day Calvin came and had a talk with me. He ensured that he&apos;s ready to get in his right grade and ready for all the obstacles ahead. Fast forward ⏩ Got in contact with Jerry and he explained about his new school that he was starting. Very small but hands on, exactly what my son needed.{" "}
        <strong className="text-cream/90">Calvin started school and even started extra credit courses.</strong>{" "}
        I started to see all the potential the teachers never noticed before.{" "}
        <strong className="text-cream/90">The grades were always good from start to finish. I don&apos;t believe he received anything less than a B.</strong>{" "}
        Unfortunately with life circumstances we did have to part ways but I&apos;ve always recommended Jerry to anyone that has kids struggling in school.
      </>
    ),
  },
  {
    quote: "Jaleen not only committed \u2014 he graduated six months early and entered college as an early enrollee.",
    author: "Larry and Nicole Walker",
    role: "Parents of a Rise Prep Graduate",
    full: (
      <>
        Rise Preparatory Academy was instrumental in assisting my son with correcting the mistakes created by his public school registrar. My son&apos;s situation was not unique however he was an unintentional victim of what is wrong with how the school system changes can affect the very students its supposed to help&hellip; Jerry explained to my wife and I how his school worked and that Jaleen would be an ideal student and was exactly what motivated him to create Rise Academy&hellip;{" "}
        <strong className="text-cream/90">Jaleen not only committed he was able to accomplish all his requirements and graduated six months early.</strong>{" "}
        Jaleen was offered a scholarship to Quincy University in Quincy Illinois. While his friends were preparing for their Senior year and prom{" "}
        <strong className="text-cream/90">Jaleen was entering and beginning his College debut as an early enrollee at Quincy University.</strong>
      </>
    ),
  },
  {
    quote: "\u201CI can save your son and help him graduate\u201D \u2014 2 years later, my son has a job and is maintaining his grades.",
    author: "Grateful Mother",
    role: "Parent of a Rise Prep Student",
    full: (
      <>
        I am a single parent of 2 kids (girl &amp; boy). My son was having a really difficult time in High School that affected him in sports &amp; the classroom. His father died at a young age, so for him football was his outlet. I reached out to Jerry via Facebook because I noticed he was active with kids on and off the field. And to my surprise he had a program to help kids that are not doing well &mdash; potentially failing in High School.{" "}
        I started telling Jerry, who also followed my son during his Optimist years, my situation and that I needed help. Without hesitation{" "}
        <strong className="text-cream/90">Jerry requested his records and called me and said the magic words: &ldquo;I can save your son and help him graduate.&rdquo;</strong>{" "}
        2 years later my son had shown so much progress in his education.{" "}
        <strong className="text-cream/90">He now has a job and is maintaining his grades with Rise Preparatory</strong>{" "}
        and I owe it all to Jerry Williamson.
      </>
    ),
  },
  {
    quote: "He is one of the strongest young men I will ever know \u2014 Mr. Williamson, thank you for all you have done for him.",
    author: "Chanequa Dukes",
    role: "Mother of Christian Dukes Jr., Rise Prep Graduate",
    full: (
      <>
        August 2018 our lives changed forever. My son Christian Dukes Junior became the man of the house. He lost his father and a little over a month later he lost his baby brother, his only brother. With all the weight of the world now on his shoulders he still managed to push through.{" "}
        Being the man of the house meant that he had to make sure his three little sisters and mom were okay and complete school.{" "}
        <strong className="text-cream/90">He is one of the strongest young men I will ever know.</strong>{" "}
        He told me he had to keep going knowing that his father and brother were now watching over him from heaven.{" "}
        Christian became a senior that year and wanted to accomplish his goals. One goal was to make it to the Blue-Gray All Star game.{" "}
        <strong className="text-cream/90">He made it and was a big impact in the game and his team went on to win.</strong>{" "}
        With the help of Jerry Williamson in the Rise Preparatory Academy school he was able to finish high school with his high school diploma and{" "}
        <strong className="text-cream/90">he is now a freshman at Bethune Cookman College where he is doing very well.</strong>{" "}
        These past few years have not been easy for him but he never gave up. Mr. Williamson, I want to thank you for all you have done for him. With God&apos;s grace and mercy he will continue to achieve every goal he set in front of him &mdash; he&apos;s destined for greatness.
      </>
    ),
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <>
      <div className="relative flex flex-col h-full bg-white/5 border border-white/10 rounded-xl px-7 pt-10 pb-8 overflow-hidden">
        {/* Decorative large quote mark */}
        <span
          className="absolute top-3 right-5 font-serif text-gold/20 select-none pointer-events-none leading-none"
          aria-hidden="true"
          style={{ fontSize: "6rem" }}
        >
          &ldquo;
        </span>

        <blockquote className="border-l-4 border-gold pl-5 relative z-10 flex-1">
          <p className="font-serif italic text-cream text-lg md:text-xl leading-loose font-medium">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </blockquote>

        <div className="relative z-10 mt-5">
          <p className="text-sm font-semibold text-gold/90">— {testimonial.author}</p>
          <p className="text-xs text-cream/90 mt-0.5">{testimonial.role}</p>
        </div>

        <div className="relative z-10 mt-3">
          <button
            onClick={() => setIsOpen(true)}
            aria-haspopup="dialog"
            className="text-xs text-cream/75 hover:text-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            Read full story →
          </button>
        </div>
      </div>

      {/* Modal — portalled to body so it escapes the grid DOM */}
      {isOpen && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-deep-navy/80 backdrop-blur-sm animate-fade-in"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Full testimonial from ${testimonial.author}`}
        >
          <div
            className="relative bg-navy rounded-2xl max-w-lg w-full px-8 pt-10 pb-8 shadow-2xl overflow-y-auto animate-fade-up"
            style={{ maxHeight: "80vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-cream/60 hover:text-cream text-lg leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Pull quote */}
            <blockquote className="border-l-4 border-gold pl-5 mb-5">
              <p className="font-serif italic text-cream text-lg leading-relaxed font-medium">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </blockquote>

            <p className="text-sm font-semibold text-gold/90">— {testimonial.author}</p>
            <p className="text-xs text-cream/70 mt-0.5 mb-6">{testimonial.role}</p>

            <hr className="border-white/10 mb-6" />

            <p className="text-cream/85 text-sm leading-loose">
              {testimonial.full}
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export function TestimonialsSection() {
  const featured = testimonials[0];

  return (
    <section className="bg-navy py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* Section header */}
        <div className="text-center space-y-3">
          <p className="text-xs text-gold font-semibold uppercase tracking-widest">
            What Families Say
          </p>
          <h2 className="font-serif text-white text-2xl md:text-4xl">
            Trusted by Families Across South Florida
          </h2>
          <p className="text-cream/90 text-sm max-w-xl mx-auto">
            Real stories from students and parents whose lives were changed by Rise Preparatory Academy.
          </p>
        </div>

        {/* Featured pull-quote */}
        <div className="relative bg-white/5 border border-gold/30 rounded-2xl px-8 md:px-14 py-10 text-center overflow-hidden">
          <span
            className="absolute top-2 left-6 font-serif text-gold/10 select-none pointer-events-none leading-none"
            aria-hidden="true"
            style={{ fontSize: "10rem" }}
          >
            &ldquo;
          </span>
          <blockquote className="relative z-10 max-w-3xl mx-auto">
            <p className="font-serif italic text-white text-xl md:text-2xl leading-relaxed">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <footer className="mt-5">
              <p className="text-sm font-semibold text-gold">— {featured.author}</p>
              <p className="text-xs text-cream/90 mt-0.5">{featured.role}</p>
            </footer>
          </blockquote>
        </div>

        {/* All cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
