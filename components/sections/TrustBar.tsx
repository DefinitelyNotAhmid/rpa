import Image from "next/image";

const items = [
  { text: "Cognia Accredited", sub: "Since 2018" },
  { text: "College Board Registered", sub: "School Code 100723" },
  { text: "97% College Acceptance", sub: "Class of 2026" },
  { text: "Grades 5 – 12", sub: "Cutler Bay, Florida" },
];

export function TrustBar() {
  return (
    <div className="bg-cream border-y border-gray-200 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-0 divide-x divide-gray-300">
        {/* Seal */}
        <div className="flex items-center gap-3 px-8 py-1">
          <Image
            src="/slazzer-preview-1wvhk.png"
            alt="Cognia Accredited"
            width={44}
            height={44}
            className="object-contain flex-shrink-0"
            style={{ height: "auto" }}
          />
          <div>
            <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.18em] text-navy">Cognia Accredited</p>
            <p className="font-sans text-[0.55rem] uppercase tracking-widest text-navy/60 mt-0.5">Since 2018</p>
          </div>
        </div>
        {/* Stat items */}
        {items.slice(1).map((item) => (
          <div key={item.text} className="px-8 py-1 text-center">
            <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.18em] text-navy">{item.text}</p>
            <p className="font-sans text-[0.55rem] uppercase tracking-widest text-navy/60 mt-0.5">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
