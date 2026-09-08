"use client";

import React from "react";

const AppreciatedPartner = () => {
  return (
    <div className="w-full py-12 regular_div">
      <h2 className="heading_text heading_text--light mb-4">
    our funders
      </h2>
      <h5 className=" text-white/80 max-w-2xl mb-8">
      Supported by US National Science Foundation for the first two (2) years (2025 and 2026).
      </h5>
      <a
        href="https://www.schmidtsciences.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center bg-white p-4 border border-white/20 hover:border-white/40 transition-colors"
      >
        <img
          src="/US NATIONAL LOGO.jpeg"
          alt="Schmidt Sciences"
          className="h-auto w-[180px] object-contain"
        />
      </a>
    </div>
  );
};

export default AppreciatedPartner;
