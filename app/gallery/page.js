"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const PAGE_SIZE = 10;
const VIDEO_EXT = /\.(m4v|mov|mp4|ogg|ogv|webm)(\?.*)?$/i;
const isVideoUrl = (url = "") => VIDEO_EXT.test(url);

export default function GalleryPage() {
  const [albums, setAlbums] = useState([]);
  const [visibleCounts, setVisibleCounts] = useState({});
  const [hasNextEntry, setHasNextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const sentinelRef = useRef(null);
  const initializedRef = useRef(false);

  const albumsRef = useRef([]);
  const visibleCountsRef = useRef({});
  const entrySkipRef = useRef(0);
  const hasNextEntryRef = useRef(true);
  const isLoadingRef = useRef(false);

  const syncAlbums = useCallback((nextAlbums) => {
    albumsRef.current = nextAlbums;
    setAlbums(nextAlbums);
  }, []);

  const syncVisibleCounts = useCallback((nextVisibleCounts) => {
    visibleCountsRef.current = nextVisibleCounts;
    setVisibleCounts(nextVisibleCounts);
  }, []);

  const loadNextEntry = useCallback(async () => {
    if (isLoadingRef.current || !hasNextEntryRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/gallery?first=1&skip=${entrySkipRef.current}`,
        { cache: "no-store" }
      );
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Failed to fetch gallery");
      }

      const { entries, hasNextPage } = payload;

      if (entries.length > 0) {
        const newAlbumIndex = albumsRef.current.length;
        syncAlbums([...albumsRef.current, entries[0]]);
        syncVisibleCounts({
          ...visibleCountsRef.current,
          [newAlbumIndex]: Math.min(PAGE_SIZE, entries[0].media.length),
        });
      }

      entrySkipRef.current += entries.length;
      hasNextEntryRef.current = Boolean(hasNextPage && entries.length > 0);
      setHasNextEntry(hasNextEntryRef.current);
    } catch (err) {
      setError(err?.message || "Failed to load gallery");
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [syncAlbums, syncVisibleCounts]);

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current) return;

    if (albumsRef.current.length === 0) {
      await loadNextEntry();
      return;
    }

    const lastAlbumIndex = albumsRef.current.length - 1;
    const lastAlbum = albumsRef.current[lastAlbumIndex];
    const visible = visibleCountsRef.current[lastAlbumIndex] ?? 0;

    if (visible < lastAlbum.media.length) {
      syncVisibleCounts({
        ...visibleCountsRef.current,
        [lastAlbumIndex]: Math.min(visible + PAGE_SIZE, lastAlbum.media.length),
      });
      return;
    }

    if (hasNextEntryRef.current) {
      await loadNextEntry();
    }
  }, [loadNextEntry, syncVisibleCounts]);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    loadMore();
  }, [loadMore]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMore]);

  const hasMedia = useMemo(
    () => albums.some((album) => album.media.length > 0),
    [albums]
  );

  return (
    <main className="mx-auto w-full max-w-[2000px] px-4 py-20 text-primary_color md:px-8">
      <header className="mb-12">
        <h1 className="heading_text">gallery</h1>
        <p className="mt-3 max-w-[780px] text-base leading-relaxed md:text-lg">
          Explore album entries from each COES-WIO day, including image and
          video highlights.
        </p>
      </header>

      {albums.map((album, albumIndex) => {
        const visible = visibleCounts[albumIndex] ?? 0;
        const visibleMedia = album.media.slice(0, visible);

        return (
          <section key={`${album.title}-${albumIndex}`} className="mb-14">
            <div className="mb-5 border-b border-primary_color/25 pb-3">
              <h2 className="text-3xl md:text-5xl">{album.title}</h2>
              {album.description ? (
                <p className="mt-2 max-w-[760px] text-sm md:text-base">
                  {album.description}
                </p>
              ) : null}
            </div>

            {visibleMedia.length === 0 ? (
              <p className="text-sm text-primary_color/70">No supported media.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleMedia.map((url, mediaIndex) => (
                  <article
                    key={`${url}-${mediaIndex}`}
                    className="overflow-hidden rounded-lg bg-primary_color/10"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      {isVideoUrl(url) ? (
                        <video
                          src={url}
                          controls
                          className="h-full w-full object-cover"
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={url}
                          alt={`${album.title} ${mediaIndex + 1}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        );
      })}

      {error ? (
        <p className="mb-4 text-sm text-red-600">{error}</p>
      ) : null}

      {!isLoading && !hasMedia ? (
        <p className="text-sm text-primary_color/75">No gallery entries found.</p>
      ) : null}

      <div ref={sentinelRef} className="h-12 w-full" />

      {isLoading ? (
        <p className="text-center text-sm text-primary_color/70">Loading...</p>
      ) : !hasNextEntry &&
        albums.length > 0 &&
        (visibleCounts[albums.length - 1] ?? 0) >=
          albums[albums.length - 1].media.length ? (
        <p className="text-center text-sm text-primary_color/70">
          You have reached the end of the gallery.
        </p>
      ) : null}
    </main>
  );
}
