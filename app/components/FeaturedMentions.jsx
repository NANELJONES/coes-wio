"use client";

import React from "react";
import { pressMentions } from "../data/pressMentions";

const FeaturedMentions = ({ title = "featured mentions" }) => {
  return (
    <div className="w-full py-12 regular_div">
      <h2 className="heading_text heading_text--light mb-4">
        {title}
      </h2>
      <p className="body_text text-white/80 max-w-2xl mb-8">
        COES-WIO, COESSING, and affiliated programmes in the press and partner
        channels.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {pressMentions.map((item) => (
          <a
            key={`${item.source}-${item.link}`}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-white/20 bg-white/5 backdrop-blur-sm p-4 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <p className="body_text font-semibold text-white group-hover:text-secondary_color transition-colors">
                {item.source}
              </p>
              <p className="body_text text-white/60">{item.date}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMentions;
