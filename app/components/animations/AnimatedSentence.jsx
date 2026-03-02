"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function AnimatedSentence({
  text,
  className,
  style,
  wordClassName = "",
  as = "p",
  amount = 0.25,
  once = false,
  stagger = 0.045,
  delay = 0,
  ...rest
}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { amount, once });
  const words = useMemo(() => text.trim().split(/\s+/), [text]);

  useEffect(() => {
    controls.start(isInView ? "visible" : "hidden");
  }, [controls, isInView]);

  const MotionTag = motion[as] || motion.p;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={controls}
      {...rest}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className={`inline-block ${wordClassName}`}
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}
