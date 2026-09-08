"use client";

import React from "react";
import DotListItem from "./DotListItem";
// import { motion } from "framer-motion";
import FadeUpInView from "./animations/FadeUpInView";
import AnimatedSentence from "./animations/AnimatedSentence";
import ImageSwiper from "./ImageSwiper";
import ImageSequence from "./ImageSequence";
import dayImages from "../data/data";

const ABOUT_SWIPER_IMAGES = [
  dayImages["day 0"][0],
  dayImages["day 1"][1],
  dayImages["day 2"][3],
  dayImages["day 3"][2],
  dayImages["day 2"][1],
];

const ABOUT_LEFT_IMAGES = [
  dayImages["day 0"][1],
  dayImages["day 1"][0],
  dayImages["day 1"][2],
  dayImages["day 2"][0],
  dayImages["day 2"][4],
  dayImages["day 3"][0],
  dayImages["day 3"][3],
];

const AboutUs = () => {
  return (
    <section className="w-full px-4 flex flex-col justify-center gap-[3em] justify-items-evenly py-12 md:px-8 lg:px-12 mx-auto regular_div">
      <FadeUpInView>
        <h2 className="heading_text">about us</h2>
      </FadeUpInView>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="sticky top-10 aspect-[4/5] max-w-[450px] mx-auto h-[500px] rounded-lg overflow-hidden flex items-center justify-center">
          {/*
          <motion.svg
            width="416"
            height="416"
            viewBox="0 0 416 416"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full max-w-full max-h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <motion.circle
              cx="208"
              cy="104"
              r="103.5"
              stroke="#0073BD"
              pathLength="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.circle
              cx="208"
              cy="312"
              r="103.5"
              stroke="#0073BD"
              pathLength="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.circle
              cx="208"
              cy="164"
              r="43.7885"
              stroke="#0073BD"
              strokeWidth="0.423077"
              pathLength="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.circle
              cx="208"
              cy="252"
              r="43.7885"
              stroke="#0073BD"
              strokeWidth="0.423077"
              pathLength="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.circle
              cx="104"
              cy="208"
              r="103.5"
              transform="rotate(-90 104 208)"
              stroke="#0073BD"
              pathLength="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.circle
              cx="312"
              cy="208"
              r="103.5"
              transform="rotate(-90 312 208)"
              stroke="#0073BD"
              pathLength="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.circle
              cx="164"
              cy="208"
              r="43.7884"
              transform="rotate(-90 164 208)"
              stroke="#0073BD"
              strokeWidth="0.423077"
              pathLength="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.circle
              cx="252"
              cy="208"
              r="43.7884"
              transform="rotate(-90 252 208)"
              stroke="#0073BD"
              strokeWidth="0.423077"
              pathLength="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.svg>
          */}
          <div className="relative h-full w-full">
            <ImageSequence images={ABOUT_LEFT_IMAGES} duration={3200} />
          </div>
        </div>

        <div className="flex p-4 backdrop-blur-sm z-10 flex-col gap-[3em]">
          <AnimatedSentence
            as="h2"
            className="font-semibold"
            style={{ color: "var(--primary_color)" }}
            text="A Regional Platform for Ocean Science Excellence"
          />

          <FadeUpInView
            className="p-5 md:p-6 text-white text-justify"
            style={{ backgroundColor: "var(--primary_color)" }}
          >
            <p className="body_text text-justify">
              COES-WIO was initiated by the University of Michigan and three
              Kenyan partners, building on successful programmes previously
              delivered in West Africa. Planning began in 2023 under the
              leadership of Prof. Brian Arbic. What started as a national
              initiative quickly evolved into a regional programme following
              strong interest from institutions and early-career professionals
              across the Western Indian Ocean (WIO) region.
            </p>
          </FadeUpInView>

          {/* <h4 className="font-semibold" style={{ color: "var(--primary_color)" }}>
            Supported by US National Science Foundation for the first two(2) years.
          </h4> */}

          <FadeUpInView>
            <div className="h-[220px] w-full overflow-hidden rounded-lg sm:h-[260px] md:h-[300px]">
              <ImageSwiper images={ABOUT_SWIPER_IMAGES} duration={2200} />
            </div>
          </FadeUpInView>

          <div className="flex flex-col gap-[2em] w-full" style={{ color: "var(--primary_color)" }}>
          
          {/* 2025 school */}
            <div>
              <p className="font-semibold body_text">
                The inaugural 2025 school was co-hosted in Mumbasa, Kenya from 21st to 27th of September 2025 by:
              </p>
              <div className="space-y-1 flex flex-col gap-1">
                <DotListItem>Technical University of Mombasa (TUM)</DotListItem>
                <DotListItem>Pwani University</DotListItem>
                <DotListItem>
                  Kenya Marine and Fisheries Research Institute (KMFRI)
                </DotListItem>
              </div>
            </div>


            {/* 2026 school */}
            <div>
              <p className="font-semibold body_text">
                The 2026 school will be co-hosted in Dar es Salaam, Tanzania from 20th to 26th of September 2026 by:
              </p>
              <div className="space-y-1 flex flex-col gap-1">
                <DotListItem>University of Dar es Salaam</DotListItem>

{/* 
                <DotListItem>Western Indian Ocean Marine Science Association (WIOMSA) </DotListItem>
                <DotListItem>Intergovernmental Oceanographic Commission (IOC-UNESCO / IOC Africa),</DotListItem>
             
              */}
             
             
             
              </div>
            </div>






            <div>
              <p className="font-semibold body_text pt-2 md:max-w-[80%]">
                Additional regional and international collaborators included:
              </p>
              <div className="space-y-1 flex flex-col gap-1">
                <DotListItem>
                  Western Indian Ocean Marine Science Association (WIOMSA)
                </DotListItem>
                <DotListItem>
                Intergovernmental Oceanographic Commission (IOC-UNESCO / IOC Africa)
                </DotListItem>
                <DotListItem>Early Career Ocean Professionals (ECOP Africa)</DotListItem>
                <DotListItem> University of Michigan </DotListItem>
              </div>
            </div>



            <div className="flex flex-col gap-6">
              <h2 className="subheading_text">Meet Our Founding Team</h2>
              <p className="body_text">
                The founding team came from the University of Michigan and three
                Kenyan partner institutions: Technical University of Mombasa
                (TUM), Pwani University, and Kenya Marine and Fisheries Research
                Institute (KMFRI).
              </p>
              <div className="border border-primary_color/25 p-6">
                <h3 className="subheading_text mb-3">Brian K. Arbic</h3>
                <p className="body_text">
                  Professor at the University of Michigan. Founder of COESSING,
                  held yearly since 2015 in Ghana and Nigeria, and of COES-WIO
                  in the Western Indian Ocean. His work supports additional
                  summer schools and capacity-sharing programmes across Africa.
                </p>
              </div>
              <p className="body_text">
                Guided by a steering committee and not tied to a specific
                institution or nation.
              </p>
              <p className="body_text">
                In addition to being a UN Ocean Decade Program, the Ocean Corps
                concept is listed on the Ocean Shot Directory of the US National
                Committee for the UN Decade of Ocean Science for Sustainable
                Development.
              </p>
            </div>
          </div>





          
        </div>
      </div>

      <section className="lg:py-[5em] md:max-h-[500px] flex items-center justify-center">
        <AnimatedSentence
          as="h1"
          className="text-sm md:text-base leading-relaxed lg:!text-[4em] pt-2 m-0"
          text="COES-WIO now serves as a growing network of institutions and professionals committed to strengthening marine science capacity in the region."
        />
      </section>
    </section>
  );
};

export default AboutUs;
