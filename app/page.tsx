import HeroSection from "@/app/components/HeroSection";
import LeftScrollProgress from "@/app/components/LeftScrollProgress";
import LogoLoop, { type LogoLoopItem } from "@/app/components/LogoLoop";
import Navbar from "@/app/components/Navbar";
import OurStory from "@/app/components/OurStory";
import PerfumeCollection from "@/app/components/PerfumeCollection";
import WhyChooseUs from "@/app/components/WhyChooseUs";

const perfumeBrands: LogoLoopItem[] = [
  {
    src: "/brand/chanel.svg",
    alt: "Chanel",
    href: "https://www.chanel.com/us/fragrance/",
  },
  {
    src: "/brand/dior.svg",
    alt: "Dior",
    href: "https://www.dior.com/en_us/beauty/fragrance",
  },
  {
    src: "/brand/guerlain.svg",
    alt: "Guerlain",
    href: "https://www.guerlain.com/",
  },
  {
    src: "/brand/burberry.svg",
    alt: "Burberry",
    href: "https://us.burberry.com/c/beauty/fragrances/",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-950">
      <Navbar />
      <HeroSection />

      <div
        className="h-2 bg-linear-to-b from-[#d9a58e] to-neutral-100 sm:h-3"
        aria-hidden="true"
      />

      <section
        className="bg-neutral-100 pt-0 pb-7 sm:pt-1 sm:pb-8"
        aria-label="Featured fragrance houses"
      >
        <LogoLoop
          logos={perfumeBrands}
          speed={42}
          logoHeight={34}
          gap={44}
          hoverSpeed={10}
          fadeOut
          fadeOutColor="#f5f5f5"
          ariaLabel="Featured perfume companies"
          className="text-[#3b302c]"
        />
      </section>
      <PerfumeCollection />
      <OurStory />
      <WhyChooseUs />
      <LeftScrollProgress />
    </main>
  );
}
