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
      <div className="mt-10 max-w-4xl">
        <h3 className="mb-4 text-xl font-semibold text-white">Supplemental funders</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-2 font-semibold text-white">2025</h4>
            <ul className="space-y-2 text-white/90">
              <li>
                <a className="underline underline-offset-2 hover:text-white" href="https://oceandecade.org/ar/capacity-development-facility/" target="_blank" rel="noopener noreferrer">
                  United Nations Ocean Decade Capacity Development Facility
                </a>
              </li>
              <li>
                <a className="underline underline-offset-2 hover:text-white" href="https://classroom.oceanteacher.org/" target="_blank" rel="noopener noreferrer">
                  Ocean Teacher Global Academy (OTGA)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-white">2026</h4>
            <a className="text-white/90 underline underline-offset-2 hover:text-white" href="https://www.ioc-africa.org/" target="_blank" rel="noopener noreferrer">
              IOC Africa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppreciatedPartner;
