import React from "react";
import FadeUpInView from "./animations/FadeUpInView";

const RELATED_PROGRAMS = [
    {
      name: "COASTAL OCEAN ENVIRONMENT SUMMER SCHOOL IN NIGERIA AND GHANA  (COESSING)",
      description:
        "Sister school (since 2015) strengthening ocean and environmental sciences capacity across West Africa.",
      href: "https://coessing.org/",
    },
    {
      name: "GULF OF GUINEA OCEAN SCIENCES SUMMER SCHOOL (GGOSSS) ",
      description:
        "A summer school for Francophone ocean scientists in West Africa.",
      
        href: "https://www.ggosss.org/",
    },
  


];

const SummerSchools = () => {
  return (
    <section className="w-full px-4 py-12 md:px-8 lg:px-12 text-primary_color regular_div">
      <FadeUpInView>
        <h2 className="heading_text">affiliated summer schools</h2>
      </FadeUpInView>
      <p className="body_text mt-4 max-w-2xl">
        COES-WIO sits within a wider family of summer schools and
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
            <h4 className="font-bold mb-2">{program.name}</h4>
            <p className="body_text text-primary_color/80">
              {program.description}
            </p>
          </a>
        ))}
      </div>

<br/>
      <h1 className="heading_text font-semibold">umbrella organization</h1>

      <a
            key="umbrella organization"
            href="https://www.globaloceancorps.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary_color/30 p-6 hover:bg-primary_color/5 transition-colors max-w-[500px]"
          >
            <h3 className="subheading_text mb-2">Global Ocean Corps</h3>
            <p className="body_text text-primary_color/80">
              A UN Ocean Decade Program supporting exchange modalities such as COESSING, COES-WIO , GGOSSS and other affiliated actions.
            </p>
          </a>
    </section>
  );
};

export default SummerSchools;
