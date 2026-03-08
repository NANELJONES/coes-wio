"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchGalleryEntries, isVideoUrl } from "../../lib/hygraph";

const PAGE_SIZE = 10;

export default function GalleryPage() {
  const [albums, setAlbums] = useState([]);
  const [visibleCounts, setVisibleCounts] = useState({});
  const [entrySkip, setEntrySkip] = useState(0);
  const [hasNextEntry, setHasNextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const sentinelRef = useRef(null);

  const loadNextEntry = useCallback(async () => {
    if (isLoading || !hasNextEntry) return;
    setIsLoading(true);
    setError("");

    try {
      const { entries, hasNextPage } = await fetchGalleryEntries({
        first: 1,
        skip: entrySkip,
      });

      if (entries.length > 0) {
        setAlbums((prev) => [...prev, entries[0]]);
        setVisibleCounts((prev) => ({
          ...prev,
          [entrySkip]: Math.min(PAGE_SIZE, entries[0].media.length),
        }));
      }

      setEntrySkip((prev) => prev + entries.length);
      setHasNextEntry(hasNextPage && entries.length > 0);
    } catch (err) {
      setError(err?.message || "Failed to load gallery");
    } finally {
      setIsLoading(false);
    }
  }, [entrySkip, hasNextEntry, isLoading]);

  const loadMore = useCallback(async () => {
    if (isLoading) return;

    if (albums.length === 0) {
      await loadNextEntry();
      return;
    }

    const lastAlbumIndex = albums.length - 1;
    const lastAlbum = albums[lastAlbumIndex];
    const visible = visibleCounts[lastAlbumIndex] ?? 0;

    if (visible < lastAlbum.media.length) {
      setVisibleCounts((prev) => ({
        ...prev,
        [lastAlbumIndex]: Math.min(visible + PAGE_SIZE, lastAlbum.media.length),
      }));
      return;
    }

    if (hasNextEntry) {
      await loadNextEntry();
    }
  }, [albums, hasNextEntry, isLoading, loadNextEntry, visibleCounts]);

  useEffect(() => {
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
