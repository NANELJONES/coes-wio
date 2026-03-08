"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function ImageSwiper({ images = [], duration = 3000 }) {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );

  if (safeImages.length === 0) {
    return <div className="relative h-full w-full" />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={safeImages.length > 1}
        autoplay={
          safeImages.length > 1
            ? { delay: duration, disableOnInteraction: false }
            : false
        }
        className="h-full w-full"
      >
        {safeImages.map((src, index) => (
          <SwiperSlide key={`${src}-${index}`} className="!h-full !w-full">
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt={`swiper-${index + 1}`}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
