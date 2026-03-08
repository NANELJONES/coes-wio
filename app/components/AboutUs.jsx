"use client";

import React from "react";
import DotListItem from "./DotListItem";
import { motion } from "framer-motion";
import FadeUpInView from "./animations/FadeUpInView";
import AnimatedSentence from "./animations/AnimatedSentence";
import ImageSwiper from "./ImageSwiper";
import dayImages from "../data/data";

const ABOUT_SWIPER_IMAGES = [
  dayImages["day 0"][0],
  dayImages["day 1"][1],
  dayImages["day 2"][3],
  dayImages["day 3"][2],
  dayImages["day 2"][1],
];

const AboutUs = () => {
  return (
    <section className="w-full px-4   flex flex-col justify-center gap-[3em] justify-items-evenly py-12 md:px-8 lg:px-12 mx-auto">
   <FadeUpInView>
     <h2 className="heading_text">about us</h2>
   </FadeUpInView>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
       
   
         {/* left SVG: path draw + rotation */}
          <div className="sticky top-10 aspect-[4/5] max-w-[450px] mx-auto h-[500px] rounded-lg overflow-hidden flex items-center justify-center">
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
          </div>
     {/* right intro and text */}
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
            <p className="!text-[1em] leading-relaxed m-0">
              COES-WIO was initiated by the University of Michigan, building on
              successful programmes previously delivered in West Africa. Planning
              began in 2023 under the leadership of Prof. Brion Arbic in
              collaboration with Kenyan partners. What started as a national
              initiative quickly evolved into a regional programme following
              strong interest from institutions and early-career professionals
              across the Western Indian Ocean (WIO) region.
            </p>
          </FadeUpInView>


          
          <FadeUpInView>
            <div className="h-[220px] w-full overflow-hidden rounded-lg sm:h-[260px] md:h-[300px]">
              <ImageSwiper images={ABOUT_SWIPER_IMAGES} duration={2200} />
            </div>
          </FadeUpInView>

          <div className="space-y-4 flex flex-col gap-[3em]  gap-4 w-full" style={{ color: "var(--primary_color)" }}>
           
           <div className="">
            <p className="font-semibold">
              The inaugural 2025 school was co-hosted in Kenya by:
            </p>
            <div className="space-y-1 flex flex-col gap-1 ">
              <DotListItem>Technical University of Mombasa (TUM)</DotListItem>
              <DotListItem>Pwani University</DotListItem>
              <DotListItem>Kenya Marine and Fisheries Research Institute (KMFRI)</DotListItem>
            </div>
         
       
       
    
         
         
         
            </div>


            <div>
             <div>
        <p className="font-bold pt-2 md:max-w-[80%]">
              Additional regional and international collaborators included:
            </p>

            <div className="space-y-1 flex flex-col gap-1">
              <DotListItem>Western Indian Ocean Marine Science Association (WIOMSA)</DotListItem>
              <DotListItem>Intergovernmental Oceanographic Commission (IOC-UNESCO)</DotListItem>
            </div>
       
       
        </div>
            
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
