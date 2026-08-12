import Link from "next/link";
import {
  Camera,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  Pin,
  type LucideIcon,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Collection", href: "#collection" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Contact", href: "#contact" },
] as const;

const socialLinks: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Instagram", href: "https://www.instagram.com", icon: Camera },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: MessageCircle,
  },
  { label: "TikTok", href: "https://www.tiktok.com", icon: Music2 },
  { label: "Pinterest", href: "https://www.pinterest.com", icon: Pin },
];

const footerLinkClasses =
  "inline-flex min-h-10 items-center text-sm text-[#f4eadf]/70 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="w-full bg-footer-bg text-[#f4eadf]"
      aria-labelledby="footer-brand"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-6 pt-12 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-[1.35fr_0.7fr_1fr] lg:gap-16 lg:pb-14">
          <section className="sm:col-span-2 lg:col-span-1">
            <Link
              id="footer-brand"
              href="/"
              className="inline-block font-display text-2xl font-light leading-none tracking-[0.08em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              aria-label="Scent Parlour home"
            >
              SCENT <span className="text-primary">PARLOUR</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#f4eadf]/65">
              Luxury fragrances crafted to elevate your everyday and inspire
              unforgettable moments.
            </p>
            <ul className="mt-6 flex gap-3" aria-label="Social media">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-[#f4eadf]/20 text-[#f4eadf]/65 transition-colors duration-300 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none"
                  >
                    <Icon aria-hidden="true" className="size-4" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <nav aria-labelledby="quick-links-heading">
            <h2
              id="quick-links-heading"
              className="font-display text-xl font-normal"
            >
              Quick Links
            </h2>
            <ul className="mt-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={footerLinkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="font-display text-xl font-normal">
              Contact Us
            </h2>
            <address className="mt-4 space-y-4 not-italic text-sm text-[#f4eadf]/70">
              <a
                href="tel:+12345678900"
                className={`${footerLinkClasses} gap-3`}
              >
                <Phone aria-hidden="true" className="size-4 shrink-0 text-primary" strokeWidth={1.5} />
                +1 (234) 567-8900
              </a>
              <a
                href="mailto:hello@nexaweb.com"
                className={`${footerLinkClasses} gap-3`}
              >
                <Mail aria-hidden="true" className="size-4 shrink-0 text-primary" strokeWidth={1.5} />
                hello@nexaweb.com
              </a>
              <p className="flex max-w-xs items-start gap-3 leading-6">
                <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" strokeWidth={1.5} />
                <span>123 Fragrance Lane, New York, NY 10001</span>
              </p>
            </address>
          </section>
        </div>

        <div className="border-t border-[#f4eadf]/15 pt-5 text-center">
          <p className="text-xs text-[#f4eadf]/50">
            &copy; {new Date().getFullYear()} Scent Parlour. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
