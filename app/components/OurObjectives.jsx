"use client";

import React from "react";
import { FiBookOpen, FiTool, FiUsers } from "react-icons/fi";
import FadeUpInView from "./animations/FadeUpInView";

const OBJECTIVES_MAIN = [
  { Icon: FiTool, text: "Strengthen Capacity." },
  { Icon: FiUsers, text: "Build Networks." },
  { Icon: FiBookOpen, text: "Advance Knowledge." },
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
  return (
    <section className="w-full text-primary_color">
      <div className="mx-auto w-full px-4 py-10 md:px-8 md:py-14 regular_div">
        <FadeUpInView>
          <h2 className="heading_text">
            our objectives
          </h2>
        </FadeUpInView>

        <p className="body_text mt-6 mb-8 max-w-3xl">
          Strengthen capacity and build networks advancing knowledge.
        </p>

        <div className="mb-10 flex flex-wrap gap-2 md:gap-3">
          {OBJECTIVES_MAIN.map((item) => (
            <div
              key={item.text}
              className="inline-flex items-center gap-2 rounded-full border border-primary_color px-3 py-1 leading-none md:px-5 md:py-2"
            >
              <item.Icon className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
              <span className="body_text">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OBJECTIVES_DETAIL.map((text, index) => (
            <FadeUpInView key={text} className="flex items-start gap-3" delay={index * 0.04}>
              <span className="w-5 shrink-0 text-base leading-[1] md:w-7">
                {index + 1}
              </span>
              <div className="body_text min-w-0 flex-1 border-b-2 border-primary_color pb-2">
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
