"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CollectionProductGrid({
  children,
}: {
  children: ReactNode;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        ":scope > [data-collection-card]",
      );
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.from(cards, {
        autoAlpha: 0,
        y: 16,
        duration: 0.45,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          once: true,
        },
      });
    }, grid);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid min-w-0 grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5"
    >
      {children}
    </div>
  );
}
