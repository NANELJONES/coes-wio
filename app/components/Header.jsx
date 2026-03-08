"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUpInView from "./animations/FadeUpInView";
import AnimatedSentence from "./animations/AnimatedSentence";
import ImageSequence from "./ImageSequence";
import dayImages from "../data/data";

const HERO_SEQUENCE_IMAGES = [
  dayImages["day 0"][0],
  dayImages["day 1"][1],
  dayImages["day 2"][2],
  dayImages["day 3"][0],
  dayImages["day 2"][4],
];

const INLINE_SEQUENCE_IMAGES = [
  dayImages["day 0"][1],
  dayImages["day 1"][0],
  dayImages["day 2"][0],
  dayImages["day 3"][2],
  dayImages["day 3"][1],
];

const SLIDES = [
  {
    items: [
      "Coastal", "Ocean", "Environment", "School", "in", "the",
      "Western", "Indian", "Ocean", "(COES-WIO)",
    ],
  },
  {
    items: [
      "Advancing", "Ocean", "Science",
      { type: "sequence", images: INLINE_SEQUENCE_IMAGES, duration: 1800 },
      "Across", "the", "Western", "Indian", "Ocean",
    ],
  },
];

const ANIMATION_DURATION = 0.5;
const WAIT_AFTER_ANIMATION_MS = 3000;

const AnimatedSlide = ({ slide, onAnimationComplete }) => {
  const items = SLIDES[slide].items;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: ANIMATION_DURATION, ease: "easeOut" }}
      onAnimationComplete={onAnimationComplete}
      className="flex flex-wrap gap-x-10 gap-y-1 items-baseline"
    >
      {items.map((item, index) => {
        const isSequence = typeof item === "object" && item?.type === "sequence";
        return (
          <motion.span
            key={`${slide}-${index}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.06,
              ease: "easeOut",
            }}
            className="inline-flex items-baseline"
          >
            {isSequence ? (
              <span className="inline-block h-[90px] w-[140px] overflow-hidden rounded-full align-baseline lg:h-[130px] lg:w-[200px]">
                <ImageSequence
                  images={item.images}
                  duration={item.duration}
                />
              </span>
            ) : (
              <span
                className="text-[3em] md:text-[3.5rem] xl:text-[5em] 2xl:text-[5.7em] leading-tight font-bold"
                style={{ color: "var(--primary_color)" }}
              >
                {item}
              </span>
            )}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

const Header = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const timeoutRef = useRef(null);

  const handleAnimationComplete = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, WAIT_AFTER_ANIMATION_MS);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header className="relative flex flex-col min-h-screen  md:max-h-[800px] w-full min-w-full max-w-none overflow-hidden">
      <div className="w-full max-w-none px-4 py-12 md:px-8 lg:px-12 h-full">
          {/* Animated text area with left indicator - full width */}
          <div className="flex gap-4 mb-8 w-full max-w-none">
            {/* Slide indicator - | and . toggle between slides */}
            <div className="flex flex-col gap-1 pt-1">
              <button
                type="button"
                onClick={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  setActiveSlide(0);
                }}
                className="text-left"
                aria-label="Show slide 1"
              >
                <motion.span
                  animate={{ opacity: activeSlide === 0 ? 1 : 0.3 }}
                  className="text-2xl md:text-3xl font-bold block"
                  style={{ color: "var(--primary_color)" }}
                >
                  |
                </motion.span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  setActiveSlide(1);
                }}
                className="text-left"
                aria-label="Show slide 2"
              >
                <motion.span
                  animate={{ opacity: activeSlide === 1 ? 1 : 0.3 }}
                  className="text-2xl md:text-3xl font-bold block"
                  style={{ color: "var(--primary_color)" }}
                >
                  .
                </motion.span>
              </button>
            </div>
            <div className="min-h-[180px] md:min-h-[220px] overflow-hidden flex-1 min-w-0 w-full">
              <AnimatePresence mode="wait">
                <AnimatedSlide
                  key={activeSlide}
                  slide={activeSlide}
                  onAnimationComplete={handleAnimationComplete}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Constant bottom part */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-around w-full">
            <FadeUpInView className="w-full md:w-[280px] lg:w-[340px] flex-shrink-0">
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                <ImageSequence images={HERO_SEQUENCE_IMAGES} duration={2200} />
              </div>
            </FadeUpInView>
            <div className="flex-1 md:max-w-[50%]">
              <AnimatedSentence
                as="h5"
                className="text-base md:text-lg leading-relaxed mb-6"
                style={{ color: "var(--primary_color)" }}
                text="The Coastal Ocean Environment School in the Western Indian Ocean (COES-WIO) is a regional summer school strengthening ocean science capacity across Africa and beyond."
              />
              <br/>
              <FadeUpInView className="flex flex-wrap gap-4" delay={0.08}>
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "var(--primary_color)" }}
                >
                  Apply for 2025 School
                </a>
                <a
                  href="#partner"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border-2 transition-colors hover:bg-primary_color/5"
                  style={{
                    borderColor: "var(--primary_color)",
                    color: "var(--primary_color)",
                  }}
                >
                  Partner With Us
                </a>
              </FadeUpInView>
            </div>
          </div>
        </div>
    </header>
  );
};

export default Header;
