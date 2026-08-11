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
      className="pointer-events-none fixed inset-y-0 left-0 z-50 hidden w-[2px] bg-[#3a211a]/10 sm:block"
      aria-hidden="true"
    >
      <div ref={thumbRef} className="h-full w-full bg-[#9a6656]/70" />
    </div>
  );
}
