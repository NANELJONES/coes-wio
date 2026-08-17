"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { HiX } from "react-icons/hi";

const ImageModal = ({ isOpen, onClose, imageUrl, imageAlt }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative max-w-7xl max-h-[90vh] w-full mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
        >
          <HiX size={32} />
        </button>

        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={1200}
            height={800}
            className="object-contain max-h-[90vh] w-full"
            priority
          />
        </div>

        <div className="absolute inset-0 -z-10" onClick={onClose} />
      </div>
    </div>
  );
};

export default ImageModal;
