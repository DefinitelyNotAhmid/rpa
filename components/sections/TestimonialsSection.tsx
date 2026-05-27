"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";

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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    window.requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusable || focusable.length === 0) {
      event.preventDefault();
      dialogRef.current?.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <div className="flex flex-col border-l-2 border-gold/50 pl-6 gap-4">
        <blockquote>
          <p className="font-serif italic text-navy text-base md:text-lg leading-relaxed">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </blockquote>

        <div>
          <p className="font-sans text-[0.7rem] font-bold uppercase tracking-widest text-gold">
            {testimonial.author}
          </p>
          <p className="font-sans text-[0.6rem] uppercase tracking-widest text-muted mt-0.5">
            {testimonial.role}
          </p>
        </div>

        <button
          ref={triggerRef}
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="font-sans text-xs text-navy/60 hover:text-navy transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded w-fit"
        >
          Read full story →
        </button>
      </div>

      {/* Modal — portalled to body so it escapes the grid DOM */}
      {isOpen && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-deep-navy/80 backdrop-blur-sm animate-fade-in"
          onClick={close}
        >
          <div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`Full testimonial from ${testimonial.author}`}
            className="relative bg-navy rounded-2xl max-w-lg w-full px-8 pt-10 pb-8 shadow-2xl overflow-y-auto animate-fade-up transition-transform duration-300"
            style={{ maxHeight: "80vh" }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={trapFocus}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-cream/60 hover:text-cream text-lg leading-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded hover:rotate-90"
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
  return (
    <section className="bg-cream py-20 px-4 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="w-8 h-px bg-gold/50 mx-auto mb-6" />
          <h2 className="font-serif text-navy text-3xl md:text-5xl leading-tight">
            Trusted by Families
          </h2>
          <p className="font-sans text-muted text-sm mt-3 max-w-md mx-auto">
            Real stories from students and parents across South Florida.
          </p>
        </div>

        {/* Open testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10 items-start">
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
