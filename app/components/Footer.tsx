import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
} from "react-icons/fa6";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Collection", href: "#collection" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Contact", href: "#contact" },
] as const;

const socialLinks: { label: string; href: string; icon: IconType }[] = [
  { label: "Instagram", href: "https://www.instagram.com", icon: FaInstagram },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: FaFacebookF,
  },
  { label: "TikTok", href: "https://www.tiktok.com", icon: FaTiktok },
  { label: "Pinterest", href: "https://www.pinterest.com", icon: FaPinterestP },
];

const footerLinkClasses =
  "inline-flex min-h-10 items-center text-sm text-[#f4eadf]/70 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-footer-bg w-full text-[#f4eadf]"
      aria-labelledby="footer-brand"
    >
      <div className="mx-auto px-5 sm:px-8 lg:px-12 pt-12 sm:pt-14 lg:pt-16 pb-6 w-full max-w-[1440px]">
        <div className="gap-10 sm:gap-x-12 lg:gap-16 grid sm:grid-cols-2 lg:grid-cols-[1.35fr_0.7fr_1fr] pb-12 lg:pb-14">
          <section className="sm:col-span-2 lg:col-span-1">
            <Link
              id="footer-brand"
              href="/"
              className="inline-block focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 font-display font-semibold text-2xl leading-none tracking-[0.08em]"
              aria-label="Scent Parlour home"
            >
              SCENT <span className="font-semibold text-primary">PARLOUR</span>
            </Link>
            <p className="mt-5 max-w-md text-[#f4eadf]/65 text-sm leading-6">
              Luxury fragrances crafted to elevate your everyday and inspire
              unforgettable moments.
            </p>
            <ul className="flex gap-3 mt-6" aria-label="Social media">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex justify-center items-center border border-[#f4eadf]/20 hover:border-primary rounded-full focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 size-10 text-[#f4eadf]/65 hover:text-primary transition-colors motion-reduce:transition-none duration-300"
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <nav aria-labelledby="quick-links-heading">
            <h2
              id="quick-links-heading"
              className="font-display font-normal text-xl"
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
            <h2
              id="contact-heading"
              className="font-display font-normal text-xl"
            >
              Contact Us
            </h2>
            <address className="space-y-4 mt-4 text-[#f4eadf]/70 text-sm not-italic">
              <a
                href="tel:+977-986545678"
                className={`${footerLinkClasses} gap-1`}
              >
                <Phone
                  aria-hidden="true"
                  className="size-4 text-primary shrink-0"
                  strokeWidth={1.5}
                />
                +977-986545678
              </a>
              <a
                href="mailto:hello@scentParlour.com"
                className={`${footerLinkClasses} gap-1 ml-3`}
              >
                <Mail
                  aria-hidden="true"
                  className="size-4 text-primary shrink-0"
                  strokeWidth={1.5}
                />
                hello@nexaweb.com
              </a>
              <p className="flex items-start gap-1 max-w-xs leading-6">
                <MapPin
                  aria-hidden="true"
                  className="mt-1 size-4 text-primary shrink-0"
                  strokeWidth={1.5}
                />
                <span>Butwal-6 , Rupandehi</span>
              </p>
            </address>
          </section>
        </div>

        <div className="pt-5 border-[#f4eadf]/15 border-t text-center">
          <p className="text-[#f4eadf]/50 text-xs">
            &copy; {new Date().getFullYear()} Scent Parlour. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
