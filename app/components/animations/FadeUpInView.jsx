"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function FadeUpInView({
  children,
  className,
  style,
  as = "div",
  y = 24,
  duration = 1,
  delay = 0,
  amount = 0.2,
  once = false,
  ...rest
}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { amount, once });

  useEffect(() => {
    controls.start(isInView ? "visible" : "hidden");
  }, [controls, isInView]);

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={controls}
      {...rest}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
