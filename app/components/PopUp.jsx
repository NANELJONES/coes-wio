"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PopUp({ signupHref = "#" }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-[760px] overflow-hidden rounded-xl bg-white shadow-2xl">
        <button
          type="button"
          aria-label="Close popup"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-sm text-primary_color"
        >
          Close
        </button>

        <div className="flex flex-col">
          <div className="relative h-[240px] w-full sm:h-[280px] md:h-[320px]">
            <Image
              src="/day 3/comp-3.jpg"
              alt="COES-WIO 2026 call for instructors"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 760px"
              priority
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 p-6 text-center md:p-8">
            <h2 className="text-2xl leading-tight text-primary_color md:text-4xl">
              Call for Instructors: COES-WIO 2026
            </h2>
            <p className="max-w-[560px] text-sm leading-relaxed text-primary_color/90 md:text-base">
              Join our 2026 training team and mentor the next generation of
              ocean science professionals.
            </p>

            <Link
              href={signupHref}
              className="inline-flex w-fit items-center justify-center rounded-lg bg-primary_color px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
