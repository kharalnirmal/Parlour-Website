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
      className="top-0 z-50 sticky bg-neutral-100"
    >
      <div className="mx-auto px-5 sm:px-8 lg:px-6 max-w-[1440px]">
        <div className="flex justify-between items-center lg:gap-8 lg:grid lg:grid-cols-[auto_2fr] min-h-16 lg:min-h-20">
          <Link
            href="/"
            className="2xl:-ml-18 focus-visible:outline-[#a97968] focus-visible:outline-2 focus-visible:outline-offset-4 font-serif font-semibold text-[clamp(1.15rem,1.7vw,1.35rem)] text-neutral-950 tracking-[0.12em] whitespace-nowrap"
          >
            SCENT PARLOUR
          </Link>

          <div className="hidden lg:flex lg:justify-self-end items-center lg:gap-8 xl:gap-10">
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
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={() => setIsOpen((open) => !open)}
            className="lg:hidden inline-flex justify-center items-center focus-visible:outline-[#a97968] focus-visible:outline-2 focus-visible:outline-offset-2 size-11 text-neutral-900 hover:text-[#966958] transition-colors motion-reduce:transition-none duration-300"
          >
            {isOpen ? (
              <X aria-hidden="true" size={22} />
            ) : (
              <Menu aria-hidden="true" size={22} />
            )}
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
            <div className="flex flex-col items-start gap-2 py-5 border-neutral-300 border-t">
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
