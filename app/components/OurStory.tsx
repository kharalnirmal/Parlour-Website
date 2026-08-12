import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

export default function OurStory() {
  return (
    <section
      id="about"
      aria-labelledby="our-story-heading"
      className="bg-background w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 mx-auto w-full">
        <div className="relative min-h-0 md:min-h-[480px] aspect-[16/10] md:aspect-auto overflow-hidden">
          <Image
            src="/story/story.jpg"
            alt="Perfume bottles and fragrant botanicals arranged in the Scent Parlour"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex items-center bg-muted px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
          <div className="max-w-xl">
            <p className="font-medium text-secondary text-lg uppercase tracking-[0.24em]">
              Our Story
            </p>
            <h2
              id="our-story-heading"
              className="mt-4 font-display font-semibold text-foreground text-4xl md:text-5xl leading-tight"
            >
              The Art of Fine Fragrance
            </h2>
            <p className="mt-6 max-w-lg text-muted-foreground text-xl leading-7">
              {
                "At Scent Parlour, we believe fragrance is more than a scent it's an expression of who you are. Each bottle is thoughtfully crafted using rare ingredients and timeless techniques to bring you luxury in every spray."
              }
            </p>
            <Link
              href="#contact"
              className={buttonVariants({
                className:
                  "mt-8 min-h-11 rounded-sm bg-foreground px-6 text-xs tracking-[0.14em] text-background transition-colors duration-300 hover:bg-foreground/85",
              })}
            >
              LEARN MORE
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
