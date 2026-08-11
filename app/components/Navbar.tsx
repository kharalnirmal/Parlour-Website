"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "#about" },
  { label: "COLLECTION", href: "#collection" },
  { label: "CONTACT", href: "#contact" },
] as const;

const linkClasses =
  "relative py-2 font-sans text-[0.72rem] font-medium tracking-[0.16em] text-neutral-600 transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[#a97968] after:transition-transform after:duration-300 hover:text-neutral-950 hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a97968] motion-reduce:transition-none motion-reduce:after:transition-none md:text-[0.78rem]";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-50 bg-neutral-100"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex min-h-16 items-center justify-between lg:grid lg:min-h-20 lg:grid-cols-[auto_1fr] lg:gap-8">
          <Link
            href="/"
            className="justify-self-start whitespace-nowrap font-serif text-[clamp(1.15rem,1.7vw,1.35rem)] font-semibold tracking-[0.12em] text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a97968]"
          >
            SCENT PARLOUR
          </Link>

          <div className="hidden items-center lg:flex lg:justify-self-end lg:gap-8 xl:gap-10">
            {navigation.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={index === 0 ? "page" : undefined}
                className={`${linkClasses} ${
                  index === 0
                    ? "font-semibold text-neutral-950 after:scale-x-100"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex size-11 items-center justify-center text-neutral-900 transition-colors duration-300 hover:text-[#966958] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a97968] motion-reduce:transition-none lg:hidden"
          >
            {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>

        <div
          id="mobile-navigation"
          aria-hidden={!isOpen}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "pointer-events-none grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col items-start gap-2 border-t border-neutral-300 py-5">
              {navigation.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={index === 0 ? "page" : undefined}
                  tabIndex={isOpen ? undefined : -1}
                  onClick={() => setIsOpen(false)}
                  className={`${linkClasses} ${
                    index === 0
                      ? "font-semibold text-neutral-950 after:scale-x-100"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
