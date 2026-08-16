"use client";

import React, { useState } from "react";
import { HiChevronDown, HiMail, HiGlobe } from "react-icons/hi";
import { affiliatedActions } from "../data/affiliatedActions";

const AffiliatedActions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="w-full py-12 regular_div">
      <h2 className="heading_text heading_text--light mb-4">
        affiliated actions
      </h2>
      <p className="body_text text-white/80 max-w-2xl mb-8">
        Ocean Decade partners and affiliated actions working alongside COES-WIO
        and COESSING.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {affiliatedActions.map((action, index) => {
          const isOpen = openIndex === index;
          const hasDetails =
            action.description || action.emails.length > 0 || action.websites.length > 0;

          return (
            <div
              key={action.name}
              className="border border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 p-4 text-left rounded-none border-0 bg-transparent hover:bg-white/5"
                aria-expanded={isOpen}
              >
                <span className="body_text font-semibold text-white">
                  {action.name}
                </span>
                <HiChevronDown
                  className={`w-6 h-6 shrink-0 text-white/70 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && hasDetails && (
                <div className="px-4 pb-5 space-y-3 text-white/80">
                  {action.description && (
                    <p className="body_text">{action.description}</p>
                  )}
                  {action.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="flex items-center gap-2 hover:text-white"
                    >
                      <HiMail className="w-4 h-4 shrink-0" />
                      {email}
                    </a>
                  ))}
                  {action.websites.map((site) => (
                    <a
                      key={site}
                      href={site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-white break-all"
                    >
                      <HiGlobe className="w-4 h-4 shrink-0" />
                      {site.replace(/^https?:\/\//, "")}
                    </a>
                  ))}
                </div>
              )}

              {isOpen && !hasDetails && (
                <p className="px-4 pb-5 text-white/60">More details coming soon.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AffiliatedActions;
