import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import CollectionProductGrid from "@/app/components/CollectionProductGrid";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    name: "Rose Noir",
    price: "$89.00",
    image: "/collection/perfume1.jpg",
    href: "/collection/rose-noir",
  },
  {
    name: "Oud Suprême",
    price: "$99.00",
    image: "/collection/perfume2.jpg",
    href: "/collection/oud-supreme",
  },
  {
    name: "Belle Éclat",
    price: "$89.00",
    image: "/collection/perfume3.jpg",
    href: "/collection/belle-eclat",
  },
  {
    name: "Lumière",
    price: "$84.00",
    image: "/collection/perfume4.jpg",
    href: "/collection/lumiere",
  },
  {
    name: "Eternal Blanc",
    price: "$79.00",
    image: "/collection/perfume-5.jpg",
    href: "/collection/eternal-blanc",
  },
  {
    name: "Rose Noir",
    price: "$89.00",
    image: "/collection/perfume1.jpg",
    href: "/collection/rose-noir",
  },
  {
    name: "Oud Suprême",
    price: "$99.00",
    image: "/collection/perfume2.jpg",
    href: "/collection/oud-supreme",
  },
  {
    name: "Belle Éclat",
    price: "$89.00",
    image: "/collection/perfume3.jpg",
    href: "/collection/belle-eclat",
  },
  {
    name: "Lumière",
    price: "$84.00",
    image: "/collection/perfume4.jpg",
    href: "/collection/lumiere",
  },
  {
    name: "Eternal Blanc",
    price: "$79.00",
    image: "/collection/perfume-5.jpg",
    href: "/collection/eternal-blanc",
  },
];

export default function PerfumeCollection() {
  return (
    <section id="collection" className="bg-background py-20 sm:py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1440px]">
        <div className="mx-auto mb-12 sm:mb-16 max-w-2xl text-center">
          <p className="mb-1 font-medium text-md text-secondary uppercase tracking-[0.24em]">
            OUR COLLECTION
          </p>
          <div
            className="flex justify-center items-center gap-2 mt-3"
            aria-hidden="true"
          >
            <div className="bg-gradient-to-r from-transparent to-primary rounded-full w-12 h-1" />
            <span className="text-primary text-xs">✦</span>
            <div className="bg-gradient-to-l from-transparent to-primary rounded-full w-12 h-1" />
          </div>

          <h2 className="font-display font-semibold text-foreground text-4xl md:text-5xl leading-tight">
            Find Your Signature Scent
          </h2>
          <p className="mt-4 font-medium text-muted-foreground text-sm sm:text-base leading-6">
            Handcrafted fragrances for every mood and moment.
          </p>
        </div>

        <CollectionProductGrid>
          {products.map((product, index) => (
            <Card
              key={`${product.name}-${index}`}
              data-collection-card
              className="w-full max-w-[21rem] md:max-w-none min-w-0 justify-self-center gap-0 rounded-md border border-border bg-card py-0 shadow-none ring-0 hover:border-primary/25 hover:bg-card/95 motion-safe:transition-[transform,box-shadow,border-color,background-color] motion-safe:duration-500 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-sm motion-reduce:transform-none"
            >
              <CardContent className="flex flex-col px-5 sm:px-6 pt-6 pb-5 h-full">
                <div className="mb-7 w-full aspect-[4/5] overflow-hidden rounded-md bg-muted/50 p-3 ring-1 ring-foreground/5 sm:p-4">
                  <div className="relative h-full w-full">
                    <Image
                      src={product.image}
                      alt={`${product.name} perfume bottle`}
                      fill
                      sizes="(min-width: 1280px) 18vw, (min-width: 768px) 30vw, 45vw"
                      className="object-contain motion-reduce:transform-none group-hover/card:scale-[1.025] motion-safe:transition-transform motion-safe:duration-500"
                    />
                  </div>
                </div>

                <div className="mt-auto text-center">
                  <h3 className="font-display font-light text-card-foreground text-xl leading-snug">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 text-muted-foreground text-sm">
                    {product.price}
                  </p>
                  <Link
                    href={product.href}
                    className={buttonVariants({
                      variant: "link",
                      className:
                        "mt-3 h-auto px-1 py-1 text-xs tracking-[0.16em] text-primary uppercase no-underline hover:text-primary/75 hover:no-underline",
                    })}
                  >
                    Shop Now
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </CollectionProductGrid>
      </div>
    </section>
  );
}
