"use client";

import { Fragment } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/lib/data/nav";

interface NavDropdownProps {
  label: string;
  items: NavItem[];
}

function ColumnItems({ items }: { items: NavItem[] }) {
  return (
    <ul className="py-2">
      {items.map((item) => (
        <Fragment key={item.href + item.label}>
          {item.groupLabel && (
            <li className="dropdown-group-label">{item.groupLabel}</li>
          )}
          <li>
            <Link
              href={item.href}
              className={`block px-4 py-2 text-sm rounded transition-colors ${
                item.isPrimary
                  ? "bg-gold text-deep-navy font-semibold mx-2 mb-1 hover:bg-gold-dark"
                  : "text-gray-700 hover:bg-cream hover:text-navy"
              }`}
            >
              {item.label}
            </Link>
          </li>
        </Fragment>
      ))}
    </ul>
  );
}

export function NavDropdown({ label, items }: NavDropdownProps) {
  const footerItems = items.filter((i) => i.isFooterCta);
  const mainItems  = items.filter((i) => !i.isFooterCta);

  const hasTwoColumns = mainItems.some((i) => i.column === 2);
  const col1 = hasTwoColumns ? mainItems.filter((i) => !i.column || i.column === 1) : mainItems;
  const col2 = hasTwoColumns ? mainItems.filter((i) => i.column === 2) : [];

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-cream hover:text-gold transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded">
        {label}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className="opacity-60 group-hover:rotate-180 transition-transform duration-200"
        />
      </button>

      {/* mt-0 prevents hover gap tunneling */}
      <div
        className={`
          absolute top-full left-0 mt-0 bg-white shadow-xl rounded-b-lg z-50
          opacity-0 invisible pointer-events-none
          group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto
          transition-[opacity,visibility] duration-150
          [transition-delay:200ms] group-hover:[transition-delay:0ms]
          ${hasTwoColumns ? "min-w-[480px]" : "min-w-[220px]"}
        `}
      >
        {/* Column items */}
        {hasTwoColumns ? (
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <ColumnItems items={col1} />
            <ColumnItems items={col2} />
          </div>
        ) : (
          <ColumnItems items={col1} />
        )}

        {/* Footer CTA strip */}
        {footerItems.length > 0 && (
          <div className="border-t border-gray-100 bg-navy/5 px-4 py-3 flex flex-wrap gap-2 rounded-b-lg">
            {footerItems.map((item, i) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`text-xs font-semibold px-4 py-2 rounded transition-colors ${
                  i === 0
                    ? "bg-gold text-deep-navy hover:bg-gold-dark"
                    : "bg-navy text-cream hover:bg-deep-navy"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
