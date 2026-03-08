import "server-only";

const HYGRAPH_QUERY = `
  query GetGalleryEntries($first: Int!, $skip: Int!) {
    coeswiogalleriesConnection(first: $first, skip: $skip) {
      edges {
        node {
          title
          description
          gallery {
            url
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

const IMAGE_EXT = /\.(avif|bmp|gif|heic|heif|jpeg|jpg|png|svg|webp)(\?.*)?$/i;
const VIDEO_EXT = /\.(m4v|mov|mp4|ogg|ogv|webm)(\?.*)?$/i;

export function isVideoUrl(url = "") {
  return VIDEO_EXT.test(url);
}

export function isSupportedMediaUrl(url = "") {
  if (!url) return false;
  if (isVideoUrl(url) || IMAGE_EXT.test(url)) return true;

  // GraphCMS/Graphassets URLs may not expose file extensions.
  return url.includes("graphassets.com");
}

export async function fetchGalleryEntries({ first = 1, skip = 0 } = {}) {
  const endpoint =
    process.env.GRAPHCMS_ENDPOINT || process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
  const token = process.env.API_TOKEN || process.env.NEXT_PUBLIC_API_TOKEN;

  if (!endpoint) {
    throw new Error("Missing GRAPHCMS_ENDPOINT");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      query: HYGRAPH_QUERY,
      variables: { first, skip },
    }),
    cache: "no-store",
  });

  const payload = await response.json();

  if (!response.ok || payload.errors) {
    throw new Error(payload.errors?.[0]?.message || "Failed to fetch gallery");
  }

  const connection = payload?.data?.coeswiogalleriesConnection;
  const edges = connection?.edges ?? [];

  const entries = edges.map((edge) => {
    const node = edge?.node ?? {};
    const gallery = Array.isArray(node.gallery) ? node.gallery : [];

    return {
      title: node.title || "Untitled Album",
      description: node.description || "",
      media: gallery
        .map((item) => item?.url)
        .filter((url) => isSupportedMediaUrl(url)),
    };
  });

  return {
    entries,
    hasNextPage: Boolean(connection?.pageInfo?.hasNextPage),
  };
}
