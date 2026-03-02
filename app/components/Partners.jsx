import React from "react";
import Image from "next/image";
import FadeUpInView from "./animations/FadeUpInView";
import AnimatedSentence from "./animations/AnimatedSentence";

const PARTNER_ITEMS = [
  "Academic institutions",
  "Research organizations",
  "Development partners",
  "Policymakers",
  "Early-career professionals and emerging researchers",
];

const Partners = () => {
  return (
    <section className="w-full bg-primary_color text-white">
      <div className="mx-auto w-full px-4 py-10 md:px-8 md:py-14">
        <FadeUpInView>
          <h2 className="heading_text heading_text--light font-light">
            our <br/> partners
          </h2>
        </FadeUpInView>

        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] md:items-start md:gap-10">
          <AnimatedSentence
            as="h2"
            className="max-w-[620px] text-[2rem] leading-tight md:text-[3.2rem]"
            text="A Collective Effort Across Institutions and Borders"
          />
          <FadeUpInView
            as="p"
            className="max-w-[640px] !text-[0.8rem] leading-relaxed text-white/95 md:pt-8 md:text-lg"
            delay={0.12}
          >
            COES-WIO thrives through institutional collaboration and cross-border
            partnerships. Universities, marine research institutes, development
            agencies, and international organizations contribute expertise and
            support to ensure the programme&apos;s success.
          </FadeUpInView>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-2 md:items-start md:gap-10">
          <FadeUpInView className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-[320px] md:max-w-[360px]">
              <Image
                src="/partners.png"
                alt="Partners illustration"
                width={768}
                height={768}
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </FadeUpInView>

          <ul className="space-y-3 md:space-y-4">
            {PARTNER_ITEMS.map((item, index) => (
              <FadeUpInView
                as="li"
                key={item}
                className="border-b border-white/50 pb-2 md:pb-3"
                delay={index * 0.07}
              >
                <span className="block text-2xl leading-snug md:text-[2rem]">
                  {item}
                </span>
              </FadeUpInView>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Partners;
