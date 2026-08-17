"use client";

import React, { useEffect, useState } from "react";

const CHANNEL_URL = "https://www.youtube.com/@coessingschool4994/videos";

const YoutubeContent = () => {
  const [videos, setVideos] = useState([]);
  const [playingId, setPlayingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const response = await fetch("/api/youtube");
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load videos");
        }

        setVideos(data.data);
        setPlayingId(data.data[0]?.id || null);
      } catch (err) {
        setError(err.message || "Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const activeVideo = videos.find((video) => video.id === playingId) || videos[0];

  return (
    <section
      id="youtube"
      className="w-full px-4 py-12 md:px-8 lg:px-12 text-primary_color regular_div"
    >
      <h2 className="heading_text">youtube content</h2>
      <p className="body_text max-w-2xl">
        Talks, recaps, and participant stories from the COESSING School channel,
        including COES-WIO.
      </p>

      {loading ? (
        <p className="body_text text-primary_color/70">Loading videos...</p>
      ) : error ? (
        <p className="body_text text-red-600">{error}</p>
      ) : !activeVideo ? (
        <p className="body_text text-primary_color/70">No videos found.</p>
      ) : (
        <div className="mt-2 grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(260px,0.9fr)]">
          <article className="hidden overflow-hidden border border-primary_color/30 lg:block">
            <div className="relative aspect-video w-full bg-primary_color/10">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}`}
                title={activeVideo.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="p-3">
              <h5 className="!m-0 !text-sm !font-medium !leading-snug">
                {activeVideo.title}
              </h5>
            </div>
          </article>

          <div className="flex flex-col gap-2 lg:max-h-[520px] lg:overflow-y-auto">
            {videos.map((video) => {
              const isActive = video.id === activeVideo.id;
              const itemClassName = `flex w-full items-start gap-3 border p-2 text-left transition-colors ${
                isActive
                  ? "border-primary_color bg-primary_color/5"
                  : "border-primary_color/20 hover:bg-primary_color/5"
              }`;

              return (
                <React.Fragment key={video.id}>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-start gap-3 border border-primary_color/20 p-2 text-left hover:bg-primary_color/5 lg:hidden"
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                      alt=""
                      className="h-16 w-28 shrink-0 object-cover"
                    />
                    <h5 className="!m-0 !text-xs !font-medium !leading-snug">
                      {video.title}
                    </h5>
                  </a>
                  <button
                    type="button"
                    onClick={() => setPlayingId(video.id)}
                    className={`${itemClassName} hidden lg:flex`}
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                      alt=""
                      className="h-16 w-28 shrink-0 object-cover"
                    />
                    <h5 className="!m-0 !text-xs !font-medium !leading-snug">
                      {video.title}
                    </h5>
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      <a
        href={CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="secondary_button mt-2 text-sm"
      >
        View channel
      </a>
    </section>
  );
};

export default YoutubeContent;
