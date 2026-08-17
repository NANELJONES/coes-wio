import { NextResponse } from "next/server";

const CHANNEL_ID = "UChiCQrtC6U06ce3u_4aSKAQ";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function decodeXml(value = "") {
  return value
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function parseVideos(xml) {
  const entries = xml.split("<entry>").slice(1);

  return entries
    .map((entry) => {
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];

      if (!id || !title) return null;

      return {
        id,
        title: decodeXml(title),
      };
    })
    .filter(Boolean)
    .slice(0, 7);
}

export async function GET() {
  try {
    const response = await fetch(RSS_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch YouTube feed");
    }

    const xml = await response.text();
    const videos = parseVideos(xml);

    return NextResponse.json({
      success: true,
      data: videos,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to fetch videos",
      },
      { status: 500 }
    );
  }
}
