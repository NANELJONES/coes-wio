import "server-only";

const GET_GALLERY_ENTRIES = `
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

const GET_PARTNERS = `
  query GetPartners($first: Int!) {
    partnersConnection(first: $first) {
      edges {
        node {
          partnerName
          partnerLogo {
            url
          }
        }
      }
    }
  }
`;

const GET_SCHOOL_PARTNERS = `
  query GetSchoolPartners($first: Int!) {
    schoolPartnersConnection(first: $first) {
      edges {
        node {
          schoolName
          logo {
            url
          }
        }
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

async function hygraphRequest(query, variables = {}) {
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
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const payload = await response.json();

  if (!response.ok || payload.errors) {
    throw new Error(payload.errors?.[0]?.message || "Hygraph request failed");
  }

  return payload.data;
}

export async function fetchGalleryEntries({ first = 1, skip = 0 } = {}) {
  const data = await hygraphRequest(GET_GALLERY_ENTRIES, { first, skip });
  const connection = data?.coeswiogalleriesConnection;
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

export async function fetchPartners({ first = 100 } = {}) {
  const data = await hygraphRequest(GET_PARTNERS, { first });
  const edges = data?.partnersConnection?.edges ?? [];

  return edges.map((edge) => edge?.node).filter(Boolean);
}

export async function fetchSchoolPartners({ first = 100 } = {}) {
  const data = await hygraphRequest(GET_SCHOOL_PARTNERS, { first });
  const edges = data?.schoolPartnersConnection?.edges ?? [];

  return edges.map((edge) => edge?.node).filter(Boolean);
}
