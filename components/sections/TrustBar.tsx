import Image from "next/image";

export function TrustBar() {
  return (
    <div className="bg-cream border-b border-gray-200 py-5">
      <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-10">
        <Image
          src="/slazzer-preview-1wvhk.png"
          alt="Cognia Accredited"
          width={72}
          height={72}
          className="object-contain"
          style={{ height: "auto" }}
        />
        <div className="h-8 w-px bg-gray-300" aria-hidden="true" />
        <span className="text-sm text-gray-600 uppercase tracking-widest">
          Est. 2018
        </span>
      </div>
    </div>
  );
}
