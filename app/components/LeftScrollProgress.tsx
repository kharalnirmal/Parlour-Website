"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LeftScrollProgress() {
  const thumbRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.set(thumb, { scaleY: 0, transformOrigin: "top center" });

    const tween = gsap.to(thumb, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: reducedMotion ? true : 0.2,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      className="hidden sm:block left-0 z-50 fixed inset-y-0 bg-[#3a211a]/10 w-[2px] pointer-events-none"
      aria-hidden="true"
    >
      <div ref={thumbRef} className="bg-[#9a6656]/70 w-full h-full" />
    </div>
  );
}
