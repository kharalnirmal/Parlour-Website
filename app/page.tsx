import Image from "next/image";

import heroImage from "@/public/hero/hero.svg";

export default function Home() {
  return (
    <main>
      <section className="perfume-hero" aria-labelledby="hero-heading">
        <div className="perfume-hero__inner">
          <div className="perfume-hero__copy">
            <p className="perfume-hero__eyebrow">Crafted to inspire</p>
            <h1 id="hero-heading" className="perfume-hero__heading">
              Scents That
              <br />
              Leave a Lasting
              <br />
              Impression
            </h1>
            <p className="perfume-hero__description">
              Luxury fragrances made with the finest ingredients to evoke
              elegance, confidence and unforgettable memories.
            </p>
            <a className="perfume-hero__cta" href="#collection">
              <span>Discover collection</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="perfume-hero__media">
            <Image
              className="perfume-hero__image"
              src={heroImage}
              alt="Luxury perfume bottle arranged with flowers and soft fabric"
              priority
              sizes="(max-width: 767px) 100vw, 65vw"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
