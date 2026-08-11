"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

import heroImage from "@/public/hero/hero.svg";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const content = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]");
      const image = gsap.utils.toArray<HTMLElement>("[data-hero-image]");
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set([...content, ...image], { autoAlpha: 1, x: 0, y: 0 });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .from(content, {
          autoAlpha: 0,
          y: 12,
          duration: 0.34,
          stagger: 0.04,
        })
        .from(image, { autoAlpha: 0, x: 14, y: 8, duration: 0.4 }, 0.06);
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#d9a58e] md:h-[clamp(430px,57.714vw,620px)] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="isolate relative flex flex-col md:items-start gap-3 md:grid min-[1101px]:grid-cols-[minmax(360px,42%)_1fr] md:grid-cols-[minmax(0,47%)_minmax(0,53%)] h-full">
        <div className="z-20 relative min-[1101px]:self-start px-[clamp(22px,7vw,40px)] min-[1101px]:py-[clamp(34px,3vw,42px)] md:py-10 pt-9 max-[390px]:max-h-[700px]:pt-8 min-[1101px]:pr-5 md:pr-5 pb-8 max-[390px]:max-h-[700px]:pb-7 min-[1101px]:pl-12 md:pl-8 w-full min-[1101px]:max-w-[680px] md:max-w-[500px] min-[1101px]:h-full">
          <p
            data-hero-reveal
            className="m-0 mb-[17px] min-[1101px]:mb-6 md:mb-[19px] font-sans font-semibold text-[#806044] text-[0.66rem] min-[1101px]:text-[0.78rem] md:text-[0.69rem] uppercase leading-none tracking-[0.16em]"
          >
            Crafted to inspire
          </p>
          <div
            data-hero-reveal
            className="origin-left min-[1024px]:scale-[1.16] min-[1024px]:pb-6 min-[1101px]:scale-[1.2] min-[1101px]:pb-8 max-[767px]:origin-top-left"
          >
            <h1
              id="hero-heading"
              className="m-0 w-full max-w-[520px] min-[1024px]:max-w-[620px] min-[1101px]:max-w-[680px] md:max-w-[560px] font-serif font-semibold text-[#3a211a] text-[clamp(2.8rem,13vw,4rem)] max-[390px]:text-[2.8rem] min-[1024px]:text-[clamp(3.8rem,5.35vw,5.25rem)] min-[1101px]:text-[clamp(4rem,5.2vw,5.4rem)] md:text-[clamp(3.2rem,6vw,4.2rem)] leading-none min-[1024px]:leading-[0.94] min-[1101px]:leading-[0.96] md:leading-[0.96] tracking-normal"
            >
              Scents That
              <br />
              Leave a Lasting
              <br />
              Impression
            </h1>
          </div>
          <p
            data-hero-reveal
            className="mt-7 mb-0 max-w-[400px] font-sans text-base leading-[1.65] text-[#593c31] md:mt-8 md:max-w-[440px] md:text-[1.05rem] min-[1101px]:mt-9 min-[1101px]:max-w-[480px] min-[1101px]:text-[clamp(1.1rem,1.25vw,1.28rem)] min-[1101px]:leading-[1.7] max-[390px]:mt-6 max-[390px]:text-[0.95rem]"
          >
            Luxury fragrances made with the finest ingredients to evoke
            elegance, confidence and unforgettable memories.
          </p>
          <a
            data-hero-reveal
            className="mt-6 inline-flex min-h-11 items-center gap-[18px] rounded-[3px] border border-[#3a211a] bg-[#3a211a] px-[21px] font-sans text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#fff8ef] no-underline transition-colors duration-200 hover:bg-transparent hover:text-[#3a211a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fff8ef] md:mt-7 min-[1101px]:mt-8 min-[1101px]:min-h-[52px] min-[1101px]:gap-5 min-[1101px]:px-7 min-[1101px]:text-[0.76rem] max-[390px]:mt-5"
            href="#collection"
          >
            <span>Discover collection</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="before:top-0 md:right-0 md:before:left-0 z-10 before:z-10 md:absolute before:absolute relative md:before:inset-y-0 md:inset-y-0 before:inset-x-0 md:before:bg-linear-to-r before:bg-linear-to-b before:from-[#d9a58e] before:to-transparent mx-auto md:mx-0 w-full min-[1101px]:before:w-[18%] md:before:w-[20%] md:w-auto max-w-[640px] md:max-w-none md:before:h-auto md:h-full before:h-[14%] md:aspect-[1024/591] before:pointer-events-none">
          <div data-hero-image className="w-full">
            <Image
              className="block w-full h-auto md:h-full object-contain object-right-top"
              src={heroImage}
              alt="Luxury perfume bottle arranged with flowers and soft fabric"
              priority
              sizes="(max-width: 767px) 100vw, 1080px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
