import React from "react";
import Image from "next/image";
import { FiCircle } from "react-icons/fi";
import FadeUpInView from "./animations/FadeUpInView";
import AnimatedSentence from "./animations/AnimatedSentence";

const OurImpact = () => {
  const quickFacts = [
    { value: "75", label: "trained participants" },
    { value: "17", label: "countries represented" },
  ];

  const impactPoints = [
    "Participation from early-career professionals, postgraduate and undergraduate students",
    "Engagement of instructors and experts from across Africa and beyond",
  ];

  return (
    <section className="w-full text-primary_color">
      <div className="mx-auto w-full px-4 py-10 md:px-8 md:py-14">
        <FadeUpInView>
          <h2 className="heading_text font-light">our impact</h2>
        </FadeUpInView>

        <div className="mt-5 flex items-center gap-2 md:mt-6">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary_color" />
          <div className="h-[2px] flex-1 bg-primary_color" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary_color" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div>
            <AnimatedSentence
              as="p"
              className="max-w-[560px] text-xl leading-relaxed md:text-3xl"
              text="The inaugural COES-WIO 2025 programme achieved:"
            />

            <div className="mt-8 space-y-2">
              {quickFacts.map((fact, index) => (
                <FadeUpInView key={fact.value} delay={index * 0.08}>
                  <div className="border-b-2 border-primary_color pb-2">
                  <div className="flex items-end gap-3">
                    <span className="mb-4 h-2.5 w-2.5 shrink-0 rounded-full bg-primary_color" />
                    <span className="text-[4rem] leading-[0.8] md:text-[6rem]">
                      {fact.value}
                    </span>
                    <span className="pb-2 text-lg leading-none md:text-2xl">
                      {fact.label}
                    </span>
                  </div>
                  </div>
                </FadeUpInView>
              ))}
            </div>

            <ul className="mt-10 space-y-6">
              {impactPoints.map((text, index) => (
                <FadeUpInView as="li" key={text} className="flex items-start gap-3" delay={index * 0.08}>
                  <FiCircle
                    className="mt-2 h-3 w-3 shrink-0 fill-current"
                    aria-hidden
                  />
                  <p className="max-w-[640px] text-lg leading-snug md:text-3xl">
                    {text}
                  </p>
                </FadeUpInView>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            <AnimatedSentence
              as="h3"
              className="max-w-[560px] text-4xl leading-tight md:text-6xl"
              text="We are a multiregional network in action"
            />
            <FadeUpInView className="relative aspect-[16/7] w-full overflow-hidden" delay={0.08}>
              <Image
                src="/ocean1.jpg"
                alt="Ocean – COES-WIO network"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeUpInView>
            <FadeUpInView as="p" className="max-w-[680px] text-base leading-relaxed md:text-xl" delay={0.12}>
              Beyond training, COES-WIO fostered lasting professional networks
              that will contribute to future research collaboration, policy
              engagement, and sustainable marine management throughout the
              Western Indian Ocean region.
            </FadeUpInView>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurImpact;
