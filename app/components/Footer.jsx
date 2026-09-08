import React from "react";
import Image from "next/image";
import { HiMail, HiLocationMarker } from "react-icons/hi";
import FadeUpInView from "./animations/FadeUpInView";

const SECTION_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Objectives", href: "#objectives" },
  { label: "Our Impact", href: "#impact" },
  { label: "Our Partners", href: "#partners" },
  { label: "Programme Themes", href: "#themes" },
  { label: "Affiliated Actions", href: "#affiliated" },
  { label: "Contact Us", href: "#contact" },
  { label: "Schools", href: "/schools" },
  { label: "Gallery", href: "/gallery" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-white px-6 py-14 text-primary_color md:px-10 md:py-20">
      <div className="mx-auto w-full border-t-4 border-primary_color/20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <FadeUpInView>
              <a href="#home" className="mb-4 inline-block">
                <Image
                  src="/logo.png"
                  alt="COES-WIO"
                  width={360}
                  height={120}
                  className="h-24 w-auto object-contain md:h-28"
                />
              </a>
              <h3 className="subheading_text">Explore Sections</h3>
            </FadeUpInView>
            <p className="body_text mt-3 max-w-[560px]">
              Navigate through all sections of the COES-WIO landing page.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SECTION_LINKS.map((link, index) => (
              <FadeUpInView as="li" key={link.href} delay={index * 0.05}>
                <a
                  href={link.href}
                  className="body_text block border-b border-primary_color/35 pb-2 transition-opacity hover:opacity-70"
                >
                  {link.label}
                </a>
              </FadeUpInView>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-primary_color/20 pt-8">
          <div className="space-y-3">
            <p className="uppercase tracking-wide body_text">Say Hello</p>
            <div className="flex items-center gap-3">
              <HiMail className="w-5 h-5" />
              <a href="mailto:coessing@gmail.com">coessing@gmail.com</a>
            </div>
            <div className="flex items-start gap-3">
              <HiLocationMarker className="w-5 h-5 mt-1" />
              <div>
                <p>University of Michigan</p>
                <p>Ann Arbor, MI 48109</p>
                <p>Western Indian Ocean region</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="uppercase tracking-wide body_text">Sister school</p>
            <a
              href="https://coessing.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="body_text block hover:opacity-70"
            >
              COESSING (since 2015)
            </a>
            <a
              href="https://globaloceancorps.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-70"
            >
              Global Ocean Corps
            </a>
          </div>
        </div>

        <FadeUpInView className="mt-10 border-t border-primary_color/20 pt-5">
          <p className="body_text">© {new Date().getFullYear()} COES-WIO. All rights reserved.</p>
        </FadeUpInView>
      </div>
    </footer>
  );
};

export default Footer;
