"use client";

import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import { HiFilter, HiCalendar, HiAcademicCap } from "react-icons/hi";

const BATCH_SIZE = 12;

const QuoteIcon = ({ className = "h-8 w-8" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState("");
  const [expandedCards, setExpandedCards] = useState({});

  const skipRef = useRef(0);
  const loadingRef = useRef(false);
  const hasNextPageRef = useRef(true);
  const sentinelRef = useRef(null);

  // Fetch batch of testimonials (12 incrementally)
  const fetchBatch = useCallback(async (year, isInitial = false) => {
    if (loadingRef.current) return;
    if (!isInitial && !hasNextPageRef.current) return;

    loadingRef.current = true;
    if (isInitial) {
      setLoadingInitial(true);
      setError("");
    } else {
      setLoadingMore(true);
    }

    const currentSkip = isInitial ? 0 : skipRef.current;

    try {
      const params = new URLSearchParams({
        schoolType: "coeswio",
        first: String(BATCH_SIZE),
        skip: String(currentSkip),
      });

      const response = await fetch(`/api/testimonials?${params.toString()}`);
      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Failed to load testimonials");
      }

      const fetchedItems = json.data || [];
      const isNext = Boolean(json.hasNextPage && fetchedItems.length > 0);

      // Only update availableYears from the backend (strictly coeswio schoolYear values)
      if (json.availableYears) {
        setAvailableYears(json.availableYears);
      }

      if (isInitial) {
        setTestimonials(fetchedItems);
      } else {
        setTestimonials((prev) => [...prev, ...fetchedItems]);
      }

      skipRef.current = currentSkip + fetchedItems.length;
      hasNextPageRef.current = isNext;
      setHasNextPage(isNext);
    } catch (err) {
      console.error("Error fetching testimonials batch:", err);
      setError(err.message || "Failed to load testimonials.");
    } finally {
      loadingRef.current = false;
      setLoadingInitial(false);
      setLoadingMore(false);
    }
  }, []);

  // Handle year filter changes
  useEffect(() => {
    skipRef.current = 0;
    hasNextPageRef.current = true;
    setHasNextPage(true);
    fetchBatch(selectedYear, true);
  }, [selectedYear, fetchBatch]);

  // Infinite Scroll Observer using Sentinel element
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPageRef.current && !loadingRef.current) {
          fetchBatch(selectedYear, false);
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [selectedYear, fetchBatch]);

  // Filter the loaded batches by the selected school year.
  const filteredTestimonials = useMemo(() => {
    if (selectedYear === "all") return testimonials;
    return testimonials.filter((item) => String(item.schoolYear) === selectedYear);
  }, [testimonials, selectedYear]);

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="mx-auto w-full max-w-[2000px] px-4 py-20 text-primary_color md:px-8 lg:px-12">
      {/* Header */}
      <header className="mb-12 border-b border-primary_color/15 pb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary_color/20 bg-primary_color/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary_color mb-3">
              <HiAcademicCap className="h-4 w-4" />
              Impact & Voices
            </span>
            <h1 className="heading_text">testimonials</h1>
            <p className="body_text mt-4 text-base md:text-lg text-primary_color/80">
              Read real experiences and inspiring stories from participants, instructors,
              and collaborators of the Coastal Ocean Environment Summer School in the Western Indian Ocean (COES-WIO).
            </p>
          </div>

          {/* Statistics summary badge */}
          <div className="flex items-center gap-4 rounded-xl border border-primary_color/20 bg-primary_color/5 p-4 self-start lg:self-auto">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary_color text-white shadow-sm">
              <QuoteIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold leading-tight">
                {testimonials.length}
              </p>
              <p className="text-xs font-medium uppercase tracking-wide opacity-75">
                Loaded Testimonials
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Year Filter */}
      <section className="mb-10 flex flex-col gap-4 rounded-xl border border-primary_color/20 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <label htmlFor="testimonial-year" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary_color/70">
            <HiFilter className="h-4 w-4" />
            <span>Select year:</span>
          </label>
          <select
            id="testimonial-year"
            value={selectedYear}
            onChange={(event) => setSelectedYear(event.target.value)}
            className="rounded-lg border border-primary_color/25 bg-white px-3 py-2 text-sm text-primary_color outline-none focus:border-primary_color"
          >
            <option value="all">All years</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Search input kept commented out as requested.
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search testimonials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-primary_color/25 bg-white py-2 pl-9 pr-3 text-xs text-primary_color placeholder-primary_color/40 outline-none transition-colors focus:border-primary_color"
          />
        </div>
        */}
      </section>

      {/* Content Area */}
      {loadingInitial ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary_color/20 border-t-primary_color" />
          <p className="mt-4 text-sm font-medium text-primary_color/70">
            Loading COES-WIO testimonials...
          </p>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
          <p className="font-semibold">{error}</p>
          <button
            type="button"
            onClick={() => fetchBatch(selectedYear, true)}
            className="mt-3 rounded-lg border border-red-300 bg-white px-4 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
          >
            Try Again
          </button>
        </div>
      ) : filteredTestimonials.length === 0 && !hasNextPage ? (
        <div className="rounded-xl border border-primary_color/15 bg-primary_color/5 p-12 text-center">
          <QuoteIcon className="mx-auto h-12 w-12 text-primary_color/30" />
          <h3 className="mt-4 text-xl font-semibold">No Testimonials Found</h3>
          <p className="mt-2 text-sm text-primary_color/70">
            {selectedYear !== "all"
              ? `No testimonials found for year ${selectedYear}.`
              : "No testimonials currently match your filter criteria."}
          </p>
          {selectedYear !== "all" && (
            <button
              type="button"
              onClick={() => setSelectedYear("all")}
              className="secondary_button mt-4 px-4 py-2 text-xs"
            >
              View All Years
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTestimonials.map((item) => {
              const isExpanded = expandedCards[item.id];
              const text = item.testimonial || "";
              const isLong = text.length > 280;
              const displayText = isLong && !isExpanded ? `${text.slice(0, 280)}...` : text;

              return (
                <article
                  key={item.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-primary_color/20 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary_color/40 hover:shadow-md"
                >
                  <div>
                    {/* Card Top Header */}
                    <div className="mb-4 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary_color/20 bg-primary_color/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary_color">
                        COES-WIO
                      </span>
                      {item.schoolYear && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary_color/70">
                          <HiCalendar className="h-3.5 w-3.5" />
                          {item.schoolYear}
                        </span>
                      )}
                    </div>

                    {/* Quote Icon */}
                    <div className="mb-3 text-primary_color/20">
                      <QuoteIcon className="h-8 w-8" />
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="body_text text-sm leading-relaxed text-primary_color/90">
                      &ldquo;{displayText}&rdquo;
                    </blockquote>

                    {isLong && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.id)}
                        className="mt-2 text-xs font-semibold text-primary_color hover:underline"
                      >
                        {isExpanded ? "Show Less" : "Read Full Testimonial"}
                      </button>
                    )}
                  </div>

                  {/* Footer with Image / Author info */}
                  <div className="mt-6 flex items-center gap-3 border-t border-primary_color/10 pt-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-primary_color/20 bg-primary_color/10">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt="COES-WIO Participant"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-primary_color">
                          <HiAcademicCap className="h-6 w-6 opacity-60" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-snug">
                        COES-WIO Participant
                      </p>
                      <p className="text-[11px] text-primary_color/60">
                        {item.schoolYear ? `Class of ${item.schoolYear}` : "Alumnus"}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Sentinel for Infinite Scroll */}
          <div ref={sentinelRef} className="h-12 w-full" />

          {/* Infinite Scroll Loading or Completion Indicator */}
          {loadingMore && (
            <div className="mt-6 flex justify-center py-4">
              <div className="flex items-center gap-2 text-xs font-medium text-primary_color/70">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary_color/20 border-t-primary_color" />
                <span>Loading more testimonials (12 per batch)...</span>
              </div>
            </div>
          )}

          {!hasNextPage && testimonials.length > 0 && !loadingMore && (
            <p className="mt-10 text-center text-xs text-primary_color/60">
              You have reached the end of the testimonials.
            </p>
          )}
        </>
      )}
    </main>
  );
}
