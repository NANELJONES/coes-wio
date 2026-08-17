"use client";

import React, { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSchoolContext } from "@/contexts/SchoolContext";
import GallerySection from "@/app/components/GallerySection";
import SectionNavigation from "@/app/components/SectionNavigation";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { transformSchoolData } from "@/lib/schoolTransform";
import { FiMapPin } from "react-icons/fi";

function formatLabel(value) {
  if (!value) return "";
  return String(value).charAt(0).toUpperCase() + String(value).slice(1).toLowerCase();
}

function Fact({ label, value, icon = null }) {
  if (!value) return null;

  return (
    <div className="min-w-0">
      <p className="m-0 text-[11px] font-medium uppercase tracking-wide text-primary_color/55">
        {label}
      </p>
      <p className="mt-1 m-0 flex items-start gap-1.5 text-sm leading-snug">
        {icon}
        <span>{value}</span>
      </p>
    </div>
  );
}

export default function SchoolDetailClient({ slug }) {
  const { schools, loading: schoolsLoading } = useSchoolContext();
  const [school, setSchool] = useState(null);
  const [transformedSchool, setTransformedSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/schools/${slug}`);
        const data = await response.json();

        if (data.success && data.data) {
          setSchool(data.data);
          setTransformedSchool(transformSchoolData(data.data));
        } else {
          setError(data.message || "School not found");
        }
      } catch (err) {
        console.error("Error fetching school:", err);
        setError("Failed to fetch school");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchSchool();
  }, [slug]);

  const sections = useMemo(() => {
    const items = [
      { id: "about", title: "About" },
      { id: "description", title: "Description" },
      { id: "details", title: "Details" },
      { id: "instructors", title: "Instructors" },
      { id: "info", title: "Info" },
      { id: "gallery", title: "Gallery" },
    ];
    if (transformedSchool?.partners?.length) {
      items.push({ id: "partners", title: "Partners" });
    }
    return items;
  }, [transformedSchool]);

  const previousSchools = useMemo(() => {
    if (!schools || schoolsLoading || !transformedSchool) return [];

    return schools
      .filter((item) => item.slug !== transformedSchool.slug)
      .sort((a, b) => b.schoolYear - a.schoolYear)
      .map((item) => ({
        schoolName: item.schoolName,
        slug: item.slug,
        year: item.schoolYear,
      }));
  }, [schools, schoolsLoading, transformedSchool]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-16">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-b-2 border-primary_color" />
          <p className="text-sm text-primary_color">Loading school data...</p>
        </div>
      </div>
    );
  }

  if (error || !school || !transformedSchool) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-16">
        <div className="text-center">
          <p className="mb-2 text-lg text-red-500">Error loading school</p>
          <p className="text-sm text-primary_color/70">{error || "School not found"}</p>
          <Link href="/schools" className="mt-4 inline-block text-sm underline">
            Back to schools
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full px-4 py-20 text-primary_color md:px-8 lg:px-12">
      <Link
        href="/schools"
        className="text-sm text-primary_color/70 transition-opacity hover:opacity-100"
      >
        ← All schools
      </Link>

      <div className="mt-6 flex gap-8">
        <div className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-20">
            <SectionNavigation sections={sections} />
          </div>
        </div>

        <article className="min-w-0 flex-1">
          <h1 className="m-0 text-3xl font-bold leading-tight md:text-4xl">
            {transformedSchool.schoolName}
          </h1>

          <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-primary_color/20 py-4 sm:grid-cols-3">
            <Fact label="Year" value={transformedSchool.year} />
            <Fact label="Status" value={formatLabel(transformedSchool.status)} />
            <Fact
              label="Location"
              value={transformedSchool.location}
              icon={<FiMapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />}
            />
            <Fact label="Country" value={formatLabel(transformedSchool.country)} />
            <Fact label="Theme" value={transformedSchool.theme} />
          </dl>

          {transformedSchool.coverImage ? (
            <div className="relative mt-6 aspect-[16/9] max-h-[320px] w-full overflow-hidden bg-primary_color/10">
              <Image
                src={transformedSchool.coverImage}
                alt={transformedSchool.schoolName}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-10">
            <section id="about">
              <h2 className="mb-2 text-lg font-semibold">Excerpt</h2>
              {transformedSchool.excerpt ? (
                <p className="m-0 text-sm leading-relaxed text-primary_color/90">
                  {transformedSchool.excerpt}
                </p>
              ) : (
                <p className="m-0 text-sm text-primary_color/60">No excerpt available.</p>
              )}
            </section>

            <section id="description">
              <h2 className="mb-2 text-lg font-semibold">Description</h2>
              {transformedSchool.description ? (
                <p className="m-0 text-sm leading-relaxed text-primary_color/90">
                  {transformedSchool.description}
                </p>
              ) : (
                <p className="m-0 text-sm text-primary_color/60">No description available.</p>
              )}
            </section>

            <section id="details">
              <h2 className="mb-3 text-lg font-semibold">Details</h2>
              {school.schoolDetails?.raw ? (
                <div className="max-w-none text-sm leading-relaxed">
                  <RichText
                    content={school.schoolDetails.raw}
                    renderers={{
                      p: ({ children }) => (
                        <p className="mb-3 text-sm leading-relaxed">{children}</p>
                      ),
                      bold: ({ children }) => (
                        <strong className="font-semibold text-primary_color">
                          {children}
                        </strong>
                      ),
                      italic: ({ children }) => (
                        <em className="italic text-primary_color/80">{children}</em>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-3 list-disc space-y-1 pl-5">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-3 list-decimal space-y-1 pl-5">{children}</ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-sm leading-relaxed">{children}</li>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="mb-3 border-l-2 border-primary_color pl-4 italic">
                          {children}
                        </blockquote>
                      ),
                      table: ({ children }) => (
                        <div className="my-4 overflow-x-auto">
                          <table className="min-w-full divide-y divide-primary_color/20">
                            {children}
                          </table>
                        </div>
                      ),
                      table_head: ({ children }) => <thead>{children}</thead>,
                      table_body: ({ children }) => (
                        <tbody className="divide-y divide-primary_color/10">
                          {children}
                        </tbody>
                      ),
                      table_row: ({ children }) => <tr>{children}</tr>,
                      table_cell: ({ children }) => (
                        <td className="px-3 py-2 text-sm">{children}</td>
                      ),
                      table_header_cell: ({ children }) => (
                        <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide">
                          {children}
                        </th>
                      ),
                      img: (props) => {
                        const { src, altText, title, height, width } = props;
                        if (!src) return null;
                        return (
                          <div className="my-4 max-h-[360px] w-full overflow-hidden">
                            <Image
                              src={src}
                              alt={altText || title || "Content image"}
                              width={width || 1000}
                              height={height || 600}
                              className="h-auto w-full object-cover"
                            />
                          </div>
                        );
                      },
                      a: ({ children, href, openInNewTab }) => (
                        <a
                          href={href}
                          target={openInNewTab ? "_blank" : "_self"}
                          rel={openInNewTab ? "noopener noreferrer" : ""}
                          className="font-medium underline underline-offset-2"
                        >
                          {children}
                        </a>
                      ),
                      iframe: (props) => {
                        const node = props?.node || props;
                        const url = node?.url || node?.src || "";
                        if (!url) return null;

                        let embedUrl = url;
                        if (url.includes("youtube.com/watch")) {
                          const videoId = url.match(/[?&]v=([^&]+)/)?.[1];
                          if (videoId) {
                            embedUrl = `https://www.youtube.com/embed/${videoId}`;
                          }
                        } else if (url.includes("youtu.be/")) {
                          const videoId = url.match(/youtu.be\/([^?]+)/)?.[1];
                          if (videoId) {
                            embedUrl = `https://www.youtube.com/embed/${videoId}`;
                          }
                        }

                        return (
                          <div
                            className="relative my-4 w-full overflow-hidden"
                            style={{ paddingBottom: "56.25%", height: 0 }}
                          >
                            <iframe
                              src={embedUrl}
                              className="absolute top-0 left-0 h-full w-full"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title="Embedded content"
                            />
                          </div>
                        );
                      },
                      embed: ({ node }) => {
                        const url =
                          node.url ||
                          node.src ||
                          (node.nodeType === "Asset" && node.url) ||
                          "";
                        if (!url) return null;

                        let embedUrl = url;
                        if (url.includes("youtube.com/watch")) {
                          const videoId = url.match(/[?&]v=([^&]+)/)?.[1];
                          if (videoId) {
                            embedUrl = `https://www.youtube.com/embed/${videoId}`;
                          }
                        } else if (url.includes("youtu.be/")) {
                          const videoId = url.match(/youtu.be\/([^?]+)/)?.[1];
                          if (videoId) {
                            embedUrl = `https://www.youtube.com/embed/${videoId}`;
                          }
                        }

                        return (
                          <div
                            className="relative my-4 w-full overflow-hidden"
                            style={{ paddingBottom: "56.25%", height: 0 }}
                          >
                            <iframe
                              src={embedUrl}
                              className="absolute top-0 left-0 h-full w-full"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title="Embedded content"
                            />
                          </div>
                        );
                      },
                    }}
                  />
                </div>
              ) : (
                <p className="m-0 text-sm text-primary_color/60">No details available.</p>
              )}
            </section>

            <section id="instructors">
              <h2 className="mb-3 text-lg font-semibold">Instructors</h2>
              {transformedSchool.instructors.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {transformedSchool.instructors.map((instructor, index) => (
                    <span
                      key={`${instructor}-${index}`}
                      className="border border-primary_color/30 px-3 py-1 text-xs"
                    >
                      {instructor}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="m-0 text-sm text-primary_color/60">No instructors listed.</p>
              )}
            </section>

            <section id="info">
              <h2 className="mb-3 text-lg font-semibold">Info</h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="border border-primary_color/30 p-4">
                  <h3 className="mb-1 text-sm font-semibold">Country</h3>
                  <p className="m-0 text-sm">
                    {formatLabel(transformedSchool.country) || "Not specified"}
                  </p>
                </div>
                <div className="border border-primary_color/30 p-4">
                  <h3 className="mb-1 text-sm font-semibold">Status</h3>
                  <p className="m-0 text-sm">
                    {formatLabel(transformedSchool.status) || "Not specified"}
                  </p>
                </div>
              </div>
            </section>

            <section id="gallery">
              <GallerySection images={transformedSchool.gallery} />
            </section>

            {transformedSchool.partners?.length > 0 ? (
              <section id="partners">
                <h2 className="mb-3 text-lg font-semibold">Partners</h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {transformedSchool.partners.map((partner, index) => (
                    <div
                      key={`${partner.name}-${index}`}
                      className="flex flex-col items-center justify-center gap-2 border border-primary_color/20 p-3 text-center"
                    >
                      {partner.logo ? (
                        <img
                          src={partner.logo}
                          alt={partner.name || "Partner"}
                          className="max-h-14 max-w-full object-contain"
                        />
                      ) : null}
                      <p className="m-0 text-xs font-medium">{partner.name}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </article>

        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-20">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Previous schools
          </h2>
          <div className="flex flex-col">
            {schoolsLoading ? (
              <p className="text-sm text-primary_color/60">Loading...</p>
            ) : previousSchools.length > 0 ? (
              previousSchools.map((prevSchool) => (
                <Link
                  key={prevSchool.slug}
                  href={`/schools/${prevSchool.slug}`}
                  className="border-b border-primary_color/25 py-2 text-sm transition-opacity hover:opacity-70"
                >
                  <span className="block font-medium">{prevSchool.schoolName}</span>
                  <span className="text-xs text-primary_color/60">{prevSchool.year}</span>
                </Link>
              ))
            ) : (
              <p className="text-sm text-primary_color/60">No previous schools found</p>
            )}
          </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
