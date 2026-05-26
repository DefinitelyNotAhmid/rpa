import Image from "next/image";
import { useState } from "react";

const API_KEY =
  process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN ||
  process.env.NEXT_PUBLIC_LOGO_DEV_KEY ||
  process.env.NEXT_PUBLIC_LOGO_DEV_API_KEY;

interface UniversityLogoProps {
  name: string;
  domain: string;
  className?: string;
  width?: number;
  height?: number;
}

export function UniversityLogo({ 
  name, 
  domain,
  className = "",
  width = 120,
  height = 40,
}: UniversityLogoProps) {
  const [imgError, setImgError] = useState(false);

  const logoUrl = API_KEY
    ? `https://img.logo.dev/${domain}?token=${API_KEY}&size=200&retina=true&format=png&fallback=404&transparent=true`
    : null;

  if (!logoUrl || imgError) {
    return (
      <span className={`text-navy/60 font-semibold text-sm md:text-base transition-colors duration-200 hover:text-navy whitespace-nowrap ${className}`}>
        {name}
      </span>
    );
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      <Image
        src={logoUrl}
        alt={`${name} logo`}
        width={width}
        height={height}
        className="object-contain opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
        onError={() => setImgError(true)}
        sizes="(max-width: 768px) 80px, 120px"
      />
    </div>
  );
}
