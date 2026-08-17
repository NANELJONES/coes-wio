"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi";

const PAGE_SIZE = 50;

const EMPTY_FILTERS = {
  year: "",
  country: "",
  status: "",
};

const selectClassName =
  "w-full border border-primary_color/35 bg-white px-3 py-2 text-sm text-primary_color outline-none focus:border-primary_color";

function formatLabel(value) {
  if (!value) return "";
  return String(value).charAt(0).toUpperCase() + String(value).slice(1).toLowerCase();
}

export default function SchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [filterOptions, setFilterOptions] = useState({
    years: [],
    countries: [],
    statuses: [],
  });

  const hasActiveFilters = Boolean(filters.year || filters.country || filters.status);

  const fetchSchools = useCallback(async (nextFilters) => {
    const params = new URLSearchParams({
      limit: String(PAGE_SIZE),
      skip: "0",
    });

    if (nextFilters.year) params.set("year", nextFilters.year);
    if (nextFilters.country) params.set("country", nextFilters.country);
    if (nextFilters.status) params.set("status", nextFilters.status);

    const response = await fetch(`/api/schools?${params.toString()}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch schools");
    }

    return data.data;
  }, []);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [filtersResponse, schoolsResponse] = await Promise.all([
          fetch("/api/schools/filters"),
          fetchSchools(EMPTY_FILTERS),
        ]);
        const filtersData = await filtersResponse.json();

        if (!mounted) return;

        if (filtersData.success) {
          setFilterOptions({
            years: filtersData.data.years || [],
            countries: filtersData.data.countries || [],
            statuses: filtersData.data.statuses || [],
          });
        }

        setSchools(schoolsResponse);
      } catch (err) {
        if (!mounted) return;
        console.error("Error fetching schools:", err);
        setError("Failed to load schools.");
        setSchools([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [fetchSchools]);

  const handleFilterChange = async (key, value) => {
    const nextFilters = { ...filters, [key]: value };
    setFilters(nextFilters);
    setLoading(true);
    setError("");

    try {
      const data = await fetchSchools(nextFilters);
      setSchools(data);
    } catch (err) {
      console.error("Error filtering schools:", err);
      setError("Failed to filter schools.");
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = async () => {
    setFilters(EMPTY_FILTERS);
    setLoading(true);
    setError("");

    try {
      const data = await fetchSchools(EMPTY_FILTERS);
      setSchools(data);
    } catch (err) {
      console.error("Error clearing school filters:", err);
      setError("Failed to load schools.");
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[2000px] px-4 py-20 text-primary_color md:px-8 lg:px-12">
      <header className="mb-10 flex w-full flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="heading_text">our schools</h1>
          <p className="body_text mt-4">
            Explore past and upcoming COES-WIO summer schools across the Western
            Indian Ocean.
          </p>
        </div>

        <div className="grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wide">
              Year
            </span>
            <select
              value={filters.year}
              onChange={(event) => handleFilterChange("year", event.target.value)}
              className={selectClassName}
            >
              <option value="">All years</option>
              {filterOptions.years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wide">
              Country
            </span>
            <select
              value={filters.country}
              onChange={(event) =>
                handleFilterChange("country", event.target.value)
              }
              className={selectClassName}
            >
              <option value="">All countries</option>
              {filterOptions.countries.map((country) => (
                <option key={country} value={country}>
                  {formatLabel(country)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wide">
              Status
            </span>
            <select
              value={filters.status}
              onChange={(event) =>
                handleFilterChange("status", event.target.value)
              }
              className={selectClassName}
            >
              <option value="">All statuses</option>
              {filterOptions.statuses.map((status) => (
                <option key={status} value={status}>
                  {formatLabel(status)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      {hasActiveFilters ? (
        <button
          type="button"
          onClick={clearFilters}
          className="secondary_button mb-8 px-4 py-2 text-sm"
        >
          Clear filters
        </button>
      ) : null}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary_color" />
        </div>
      ) : error ? (
        <p className="body_text text-red-600">{error}</p>
      ) : schools.length === 0 ? (
        <p className="body_text text-primary_color/70">
          No schools match these filters.
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,280px))] gap-5">
          {schools.map((school) => (
            <Link
              key={school.id || school.slug}
              href={`/schools/${school.slug}`}
              className="group flex h-full flex-col overflow-hidden border border-primary_color/30 transition-colors hover:bg-primary_color/5"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-primary_color/10">
                {school.coverImage?.url ? (
                  <Image
                    src={school.coverImage.url}
                    alt={school.schoolName || "School"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-6 text-center">
                    <p className="text-lg font-medium text-primary_color/25">
                      {school.schoolYear || "COES-WIO"}
                    </p>
                  </div>
                )}
                {school.schoolStatus ? (
                  <span className="absolute right-3 top-3 border border-white/70 bg-primary_color px-3 py-1 text-xs uppercase tracking-wide text-white">
                    {formatLabel(school.schoolStatus)}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col gap-1 p-3">
                <p className="m-0 text-xs text-primary_color/70">
                  {school.schoolYear}
                </p>
                <h5 className="m-0 text-sm font-semibold leading-tight">
                  {school.schoolName}
                </h5>
                {school.schoolLocation ? (
                  <div className="mt-auto flex items-center gap-1.5 pt-1 text-xs text-primary_color/80">
                    <HiLocationMarker className="h-3.5 w-3.5 shrink-0" />
                    <span>{school.schoolLocation}</span>
                  </div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
