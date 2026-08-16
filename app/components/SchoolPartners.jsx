"use client";

import React, { useEffect, useState } from "react";

const HOSTS_2025 = [
  "Technical University of Mombasa (TUM)",
  "Pwani University",
  "Kenya Marine and Fisheries Research Institute (KMFRI)",
];

const COLLABORATORS_2025 = [
  "Western Indian Ocean Marine Science Association (WIOMSA)",
  "Intergovernmental Oceanographic Commission (IOC-UNESCO)",
];

const SchoolPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("/api/school-partners");
        const data = await response.json();
        if (data.success) {
          setPartners(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error("Error fetching school partners:", err);
        setError("Failed to fetch school partners");
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="w-full py-16 regular_div">
      <h2 className="heading_text heading_text--light mb-6">
        school partners
      </h2>
      <p className="body_text text-white/80 max-w-2xl mb-12">
        Host institutions and school partners that make each COES-WIO year
        possible.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-16">
        <div>
          <h3 className="subheading_text text-white mb-6">2025 hosts</h3>
          <ul className="space-y-4">
            {HOSTS_2025.map((name) => (
              <li
                key={name}
                className="body_text border-b border-white/20 pb-3 text-white/90"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="subheading_text text-white mb-6">
            2025 collaborators
          </h3>
          <ul className="space-y-4">
            {COLLABORATORS_2025.map((name) => (
              <li
                key={name}
                className="body_text border-b border-white/20 pb-3 text-white/90"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="body_text text-white/70 mb-10">
        2026 school partners will be listed here as they are confirmed.
      </p>

      {loading && <p className="body_text text-white/70">Loading school partners...</p>}

      {!loading && error && partners.length === 0 && (
        <p className="body_text text-white/70">{error}</p>
      )}

      {!loading && partners.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div
              key={`${partner.schoolName}-${index}`}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 flex flex-col items-center justify-center hover:bg-white/10 transition-all min-h-[8rem]"
            >
              {partner.logo?.url && (
                <div className="w-full h-24 flex items-center justify-center mb-4 bg-white p-3">
                  <img
                    src={partner.logo.url}
                    alt={partner.schoolName || "School partner"}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
              <p className="body_text text-white text-center">
                {partner.schoolName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SchoolPartners;
