import React from "react";
import FadeUpInView from "./animations/FadeUpInView";
import AnimatedSentence from "./animations/AnimatedSentence";

const SECTION_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Objectives", href: "#objectives" },
  { label: "Our Impact", href: "#impact" },
  { label: "Our Partners", href: "#partners" },
  { label: "Programme Themes", href: "#themes" },
];

const Footer = () => {
  return (
    <footer id="footer" className="w-full bg-white px-6 py-14 text-primary_color md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <FadeUpInView>
              <h3 className="text-3xl md:text-5xl">Explore Sections</h3>
            </FadeUpInView>
            <AnimatedSentence
              as="p"
              className="mt-3 max-w-[560px] text-sm leading-relaxed md:text-base"
              text="Navigate through all sections of the COES-WIO landing page."
            />
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SECTION_LINKS.map((link, index) => (
              <FadeUpInView as="li" key={link.href} delay={index * 0.05}>
                <a
                  href={link.href}
                  className="block border-b border-primary_color/35 pb-2 text-lg transition-opacity hover:opacity-70 md:text-xl"
                >
                  {link.label}
                </a>
              </FadeUpInView>
            ))}
          </ul>
        </div>

        <FadeUpInView className="mt-10 border-t border-primary_color/20 pt-5 text-sm">
          <p>© 2026 COES-WIO. All rights reserved.</p>
        </FadeUpInView>
      </div>
    </footer>
  );
};

export default Footer;