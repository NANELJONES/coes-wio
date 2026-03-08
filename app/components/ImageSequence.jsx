"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

export default function ImageSequence({ images = [], duration = 3000 }) {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (safeImages.length <= 1) return undefined;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeImages.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, safeImages.length]);

  if (safeImages.length === 0) {
    return <div className="relative h-full w-full" />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {safeImages.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`sequence-${index + 1}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
