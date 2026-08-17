"use client";
import React, { useState } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";

const GallerySection = ({ images = [] }) => {
  const [modalImage, setModalImage] = useState({ url: "", alt: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (url, alt) => {
    setModalImage({ url, alt });
    setIsModalOpen(true);
  };

  if (!images.length) {
    return (
      <div>
        <h2 className="mb-2 text-lg font-semibold">Gallery</h2>
        <p className="text-sm text-primary_color/70">
          No gallery content available for this school.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">Gallery</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="relative aspect-square overflow-hidden cursor-pointer group"
            onClick={() => openModal(url, `School gallery image ${index + 1}`)}
          >
            <Image
              src={url}
              alt={`School gallery image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={modalImage.url}
        imageAlt={modalImage.alt}
      />
    </div>
  );
};

export default GallerySection;
