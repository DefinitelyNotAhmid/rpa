"use client";

import { Fragment, useEffect, useRef, useState, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/lib/data/nav";

interface NavDropdownProps {
  label: string;
  items: NavItem[];
}

function ColumnItems({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href.includes("#")) {
      return pathname === href.split("#")[0];
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

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
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`block px-4 py-2 text-sm rounded transition-all duration-200 hover-lift-sm focus-ring-gold ${
                isActive(item.href)
                  ? "bg-gold/15 text-deep-navy font-semibold"
                  : ""
              } ${
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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const lastInteractionRef = useRef<"pointer" | "keyboard" | null>(null);
  const footerItems = items.filter((i) => i.isFooterCta);
  const mainItems  = items.filter((i) => !i.isFooterCta);

  const hasTwoColumns = mainItems.some((i) => i.column === 2);
  const col1 = hasTwoColumns ? mainItems.filter((i) => !i.column || i.column === 1) : mainItems;
  const col2 = hasTwoColumns ? mainItems.filter((i) => i.column === 2) : [];
  const isSectionActive = mainItems.some((item) => {
    const href = item.href.split("#")[0];
    return pathname === href || pathname.startsWith(href + "/");
  });

  useEffect(() => {
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative group"
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget as Node | null;
        if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onPointerDown={() => {
          lastInteractionRef.current = "pointer";
        }}
        onFocus={() => {
          if (lastInteractionRef.current !== "pointer") {
            setIsOpen(true);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsOpen(false);
            return;
          }

          if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
            event.preventDefault();
            lastInteractionRef.current = "keyboard";
            setIsOpen((current) => !current);
          }
        }}
        onClick={() => {
          if (lastInteractionRef.current === "keyboard") {
            lastInteractionRef.current = null;
            return;
          }

          setIsOpen((current) => !current);
          lastInteractionRef.current = null;
        }}
        className={`flex items-center gap-1 py-1 rounded transition-colors focus-ring-gold ${
          isSectionActive || isOpen ? "text-gold" : "text-cream hover:text-gold"
        }`}
      >
        {label}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`opacity-60 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "group-hover:rotate-180 group-focus-within:rotate-180"
          }`}
        />
      </button>

      {/* mt-0 prevents hover gap tunneling */}
      <div
        id={menuId}
        className={`
          absolute top-full left-0 mt-0 bg-white shadow-xl rounded-b-lg z-50
          ${isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto"}
          transition-[opacity,visibility] duration-150
          [transition-delay:200ms] group-hover:[transition-delay:0ms] group-focus-within:[transition-delay:0ms]
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
                className={`text-xs font-semibold px-4 py-2 rounded transition-all duration-200 hover-lift-sm focus-ring-gold ${
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
