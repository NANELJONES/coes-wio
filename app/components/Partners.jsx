"use client";

import React, { useEffect, useState } from "react";
import FadeUpInView from "./animations/FadeUpInView";

const isHiddenPartner = (name = "") => {
  const normalized = name.toLowerCase();
  return normalized.includes("schmidt") || normalized.includes("schimdt");
};

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/partners");
        const data = await response.json();

        if (data.success) {
          setPartners(
            (data.data || []).filter(
              (partner) => !isHiddenPartner(partner.partnerName)
            )
          );
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch partners");
        console.error("Error fetching partners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="w-full py-12 regular_div">
      <FadeUpInView>
        <h2 className="heading_text heading_text--light">
          our partners
        </h2>
      </FadeUpInView>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <h3 className="subheading_text max-w-[620px] text-white">
          Bringing together all people and ideas that advance ocean science and
          its application
        </h3>
        <div className="max-w-[640px] space-y-4 text-white/95 md:pt-8">
          <p className="body_text">
            COES-WIO thrives through institutional collaboration and
            cross-border partnerships. Universities, marine research institutes,
            development agencies, and international organizations contribute
            expertise and support to ensure the programme&apos;s success.
          </p>
          <p className="body_text">
            Guided by a steering committee and not tied to a specific
            institution or nation.
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
        </div>
      )}

      {!loading && error && (
        <p className="body_text mt-10 text-white/70">
          Unable to load partners at this time.
        </p>
      )}

      {!loading && !error && partners.length === 0 && (
        <p className="body_text mt-10 text-white/70">
          No partners available at this time.
        </p>
      )}

      {!loading && partners.length > 0 && (
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {partners.map((partner, index) => (
            <div
              key={`${partner.partnerName}-${index}`}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center hover:bg-white/10 transition-all duration-300"
            >
              {partner.partnerLogo?.url && (
                <div className="mb-3 flex h-16 w-full items-center justify-center">
                  <img
                    src={partner.partnerLogo.url}
                    alt={partner.partnerName}
                    className="max-h-16 max-w-[140px] object-contain"
                  />
                </div>
              )}
              <p className="body_text text-white font-semibold text-center">
                {partner.partnerName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Partners;
