import React from "react";
import FadeUpInView from "./animations/FadeUpInView";

const ClosingSection = () => {
  return (
    <section className="w-full px-4 py-16 md:px-8 lg:px-12 text-primary_color regular_div">
      <FadeUpInView>
        <h2 className="heading_text">a global connection</h2>
      </FadeUpInView>
      <p className="body_text mt-6 max-w-4xl">
        COES-WIO connects scientists, students, and institutions across East
        Africa and beyond—building purposeful pathways for ocean science,
        collaboration, and long-term capacity in the Western Indian Ocean.
      </p>
    </section>
  );
};

export default ClosingSection;
