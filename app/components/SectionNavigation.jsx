"use client";

import React, { useState, useEffect } from "react";

const SectionNavigation = ({ sections }) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      let current = sections[0]?.id || "";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && scrollPosition >= element.offsetTop) {
          current = section.id;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="border-r border-primary_color/25 pr-6">
      <h3 className="m-0 mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary_color/55">
        Sections
      </h3>
      <nav className="flex flex-col">
        {sections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={`border-l-2 py-2 pl-3 text-left text-sm transition-colors ${
                isActive
                  ? "border-primary_color font-semibold text-primary_color"
                  : "border-transparent text-primary_color/55 hover:text-primary_color"
              }`}
            >
              {section.title}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SectionNavigation;
