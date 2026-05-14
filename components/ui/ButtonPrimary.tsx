import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export function ButtonPrimary({ href, children, external }: Props) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary inline-flex items-center gap-1.5"
      >
        {children}
        <ExternalIcon />
      </a>
    );
  }
  return (
    <Link href={href} className="btn-primary inline-block">
      {children}
    </Link>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      aria-hidden="true"
      className="opacity-70"
    >
      <path
        d="M3.5 3H2a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V8.5M7 1h4m0 0v4m0-4L5 7"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
