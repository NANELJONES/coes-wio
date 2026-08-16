import React from "react";
import FadeUpInView from "./animations/FadeUpInView";

const RELATED_PROGRAMS = [
  {
    name: "COESSING",
    description:
      "Sister school (since 2015) strengthening ocean science capacity across West Africa.",
    href: "https://coessing.org/",
  },
  {
    name: "Global Ocean Corps",
    description:
      "A UN Ocean Decade Program supporting exchange modalities such as COES-WIO and COESSING.",
    href: "https://globaloceancorps.vercel.app",
  },
];

const SummerSchools = () => {
  return (
    <section className="w-full px-4 py-12 md:px-8 lg:px-12 text-primary_color regular_div">
      <FadeUpInView>
        <h2 className="heading_text">summer schools and other</h2>
      </FadeUpInView>
      <p className="body_text mt-4 max-w-2xl">
        COES-WIO sits within a wider family of summer schools and affiliated
        programmes advancing ocean science capacity.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {RELATED_PROGRAMS.map((program) => (
          <a
            key={program.name}
            href={program.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary_color/30 p-6 hover:bg-primary_color/5 transition-colors"
          >
            <h3 className="subheading_text mb-2">{program.name}</h3>
            <p className="body_text text-primary_color/80">
              {program.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default SummerSchools;
