"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiCheckCircle,
  FiTool,
  FiUsers,
} from "react-icons/fi";
import FadeUpInView from "./animations/FadeUpInView";

const OBJECTIVES_MAIN = [
  { Icon: FiTool, text: "Strengthening Capacity." },
  { Icon: FiUsers, text: "Building Networks." },
  { Icon: FiBookOpen, text: "Advancing Knowledge." },
];

const OBJECTIVES_DETAIL = [
  "Enhance regional capacity in ocean science, especially among early-career professionals",
  "Provide hands-on, practical training in key thematic areas of coastal and marine environmental research",
  "Foster interdisciplinary collaboration and networking among ocean scientists, researchers, and policymakers across Africa",
  "Promote the exchange of knowledge and best practices in sustainable marine resource management",
  "Attract professionals from across the globe to work in partnership with the rich network in the WIO region",
  "Strengthen partnerships among academic institutions and research organizations within the WIO region",
];

const OurObjectives = () => {
  const topObjectives = OBJECTIVES_DETAIL.slice(0, 2);
  const bottomObjectives = OBJECTIVES_DETAIL.slice(2);

  return (
    <section className="w-full  text-primary_color">
      <div className="mx-auto w-full  px-4 py-10 md:px-8 md:py-14">
        <FadeUpInView>
          <h2 className="mb-5 heading_text font-light lowercase leading-none md:mb-7 md:text-[4.75rem]">
            our objectives
          </h2>
        </FadeUpInView>
        <br/>

        <div className="mb-8 flex flex-wrap gap-2 md:mb-10 md:gap-3">
          {OBJECTIVES_MAIN.map((item, index) => (
            <FadeUpInView
              key={item.text}
              delay={index * 0.08}
              className="inline-flex items-center gap-2 rounded-full border border-primary_color px-3 py-1 text-[1rem] leading-none md:px-5 md:py-2 md:text-[2rem]"
            >
              <item.Icon className="h-4 w-4 md:h-6 md:w-6" aria-hidden />
              <span className="text-lg md:text-5xl">{item.text}</span>
            </FadeUpInView>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-10">
          <div className="space-y-5 md:space-y-6">
            {topObjectives.map((text, index) => (
              <FadeUpInView key={text} className="flex items-start gap-3" delay={index * 0.08}>
                <span className="w-5 shrink-0 text-3xl leading-[1] md:w-7 md:text-4xl">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1 border-b-2 border-primary_color pb-2 text-sm leading-relaxed md:text-lg">
                  {text}
                </div>
              </FadeUpInView>
            ))}
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-[430px] md:max-w-[480px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src="/Cylinder.png"
              alt="WIO objectives symbol"
              width={960}
              height={960}
              className="h-auto w-full object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>

      <div className="bg-primary_color py-10">
        <div className="mx-auto grid w-full  grid-cols-1 gap-x-10 gap-y-4 px-4 py-6 text-white md:grid-cols-2 md:px-8 md:py-8">
          {bottomObjectives.map((text, index) => (
            <FadeUpInView
              key={text}
              className="flex items-start gap-3"
              delay={index * 0.08}
              amount={0.15}
            >
              <span className="w-5 shrink-0 text-3xl leading-[1] md:w-7 md:text-4xl">
                {index + 3}
              </span>
              <div className="min-w-0 flex-1 border-b-2 border-white/90 pb-2 text-sm leading-relaxed md:text-lg">
                <FiCheckCircle className="mr-2 inline h-3.5 w-3.5 translate-y-[-1px]" aria-hidden />
                {text}
              </div>
            </FadeUpInView>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurObjectives;
