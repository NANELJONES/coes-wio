"use client";

import React from "react";

const AppreciatedPartner = () => {
  return (
    <div className="w-full py-12 regular_div">
      <h2 className="heading_text heading_text--light mb-4">
        appreciated partner
      </h2>
      <p className="body_text text-white/80 max-w-2xl mb-8">
        Schmidt Sciences is funding COES-WIO for the next three years. We thank
        Schmidt Sciences for the support that helps make this school possible.
      </p>
      <a
        href="https://www.schmidtsciences.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center bg-white p-4 border border-white/20 hover:border-white/40 transition-colors"
      >
        <img
          src="/partners/image.png"
          alt="Schmidt Sciences"
          className="h-auto w-[180px] object-contain"
        />
      </a>
    </div>
  );
};

export default AppreciatedPartner;
