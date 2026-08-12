import { FlaskConical, Gem, Heart, Leaf, type LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  dividerClassName: string;
};

const features: Feature[] = [
  {
    icon: Leaf,
    title: "Premium Ingredients",
    description:
      "We source the finest natural ingredients from around the world.",
    dividerClassName: "border-b md:border-r lg:border-b-0",
  },
  {
    icon: FlaskConical,
    title: "Long Lasting",
    description:
      "Our fragrances are crafted to last all day and leave a memorable trail.",
    dividerClassName: "border-b lg:border-r lg:border-b-0",
  },
  {
    icon: Gem,
    title: "Luxury Experience",
    description:
      "Elegant packaging and premium quality for a truly luxurious feel.",
    dividerClassName: "border-b md:border-r md:border-b-0",
  },
  {
    icon: Heart,
    title: "Cruelty Free",
    description:
      "We never test on animals. Beauty that's ethical and responsible.",
    dividerClassName: "",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="bg-background py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1440px]">
        <h2
          id="why-choose-us-heading"
          className="font-display font-semibold text-foreground text-4xl md:text-5xl text-center"
        >
          WHY CHOOSE SCENT PARLOUR
        </h2>
        <div
          aria-hidden="true"
          className="bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-3 w-64 h-0.5"
        />

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 lg:mt-12">
          {features.map(
            ({ icon: Icon, title, description, dividerClassName }) => (
              <li
                key={title}
                className={`flex flex-col items-center border-border px-5 py-9 text-center sm:px-8 lg:px-7 ${dividerClassName}`}
              >
                <Icon
                  aria-hidden="true"
                  className="size-9 lg:size-10 text-primary"
                  strokeWidth={1.5}
                />
                <h3 className="mt-5 font-display font-normal text-foreground text-2xl">
                  {title}
                </h3>
                <p className="mt-3 max-w-xs font-sans text-muted-foreground leading-7">
                  {description}
                </p>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
