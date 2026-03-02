import React from "react";
import FadeUpInView from "./animations/FadeUpInView";
import AnimatedSentence from "./animations/AnimatedSentence";

const PROGRAMME_THEMES = [
  {
    title: "Small-Scale Fisheries, Mariculture & Post-Harvest Management",
    description:
      "Strengthening sustainable fisheries systems and improving coastal livelihoods.",
    image:
      "https://images.unsplash.com/photo-1565012320259-461ecb4e4d59?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Chemical & Physical Oceanography",
    description:
      "Advancing understanding of ocean dynamics and coastal processes.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Climate Change & Physical Processes",
    description:
      "Exploring climate variability and its impact on marine and coastal systems.",
    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Marine Pollution & Plastics",
    description:
      "Addressing marine debris and pollution challenges affecting ecosystems and communities.",
    image:
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Ecological Survey Techniques & Data Management",
    description:
      "Equipping participants with field methodologies and analytical tools for marine ecosystem monitoring and research.",
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80",
  },
];

const Themes = () => {
  return (
    <section className="relative w-full overflow-clip bg-[#f2f2f2] text-primary_color">
      <div className="sticky top-0 z-0 flex h-screen max-h-[800px] items-center justify-center px-4 md:px-8">
        <div className="mx-auto flex w-full max-w-[800px] flex-col items-center text-center">
          <FadeUpInView>
            <h2 className="heading_text font-light">programme themes</h2>
          </FadeUpInView>
          <AnimatedSentence
            as="h3"
            className="mt-4 max-w-[560px] text-xl leading-tight md:text-3xl"
            text="Five Core Areas of Hands-On Training"
          />
        </div>
      </div>
      <div className="lg:absolute top-20 w-full px-10">
        <div className="flex gap-4 text-left justify-between md:gap-8">
          <FadeUpInView
            as="p"
            style={{ color: "var(--primary_color)" }}
            className="max-w-[400px]"
            delay={0.05}
          >
            Our programme themes deliver practical skills for ocean professionals.
          </FadeUpInView>
          {/* <p style={{ color: "var(--primary_color)" }}>
            Each theme links science, policy, and community impact.
          </p> */}
          <FadeUpInView
            as="p"
            style={{ color: "var(--primary_color)" }}
            className="max-w-[400px]"
            delay={0.12}
          >
            Training focuses on real-world challenges across the Western Indian Ocean.
          </FadeUpInView>
        </div>
      </div>
      <div className="relative  z-10 mx-auto mt-[70vh] w-full max-w-[1200px] px-4 pb-20 md:px-8">
        <div className="grid grid-cols-1 items-center justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PROGRAMME_THEMES.map((theme, index) => (
            <FadeUpInView
              key={theme.title}
              delay={index * 0.06}
              className={`mb-6 mx-auto break-inside-avoid overflow-hidden bg-[#1383c7] text-white lg:mb-8 ${
                index % 2 === 1 ? "lg:mt-[10em]" : ""
              }`}
            >
              <div
                className="h-[220px] w-full bg-cover bg-center md:h-[260px]"
                style={{ backgroundImage: `url("${theme.image}")` }}
                role="img"
                aria-label={theme.title}
              />
              <div className="space-y-2 p-4 md:p-5">
                <h6 className="font-bold">
                  {theme.title}
                </h6>
                <br/>
                <p className="!text-[0.8em] leading-relaxed text-white/90 md:text-sm">
                  {theme.description}
                </p>
              </div>
            </FadeUpInView>
          ))}
        </div>
        {/* <h1 className="mx-auto mt-4 max-w-[980px] text-center text-base leading-relaxed text-primary_color md:text-lg">
          Each track combined theoretical instruction with practical application,
          reinforcing real-world skills development.
        </h1> */}
      </div>
    </section>
  );
};

export default Themes;