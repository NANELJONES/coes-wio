export function transformSchoolData(school) {
  return {
    schoolName: school.schoolName,
    year: school.schoolYear,
    slug: school.slug,
    theme: school.schoolTheme,
    location: school.schoolLocation,
    excerpt: school.excerpt,
    description: school.schoolDetails?.raw?.children
      ? (() => {
          const paragraphs = school.schoolDetails.raw.children.filter(
            (child) => child.type === "paragraph"
          );
          if (paragraphs.length === 0) return "";
          const firstPara = paragraphs[0];
          return firstPara.children.map((child) => child.text).join("");
        })()
      : "",
    coverImage: school.coverImage?.url || "",
    country: school.country,
    status: school.schoolStatus,
    instructors: school.instructors || [],
    gallery: (school.gallery || []).map((item) => item?.url).filter(Boolean),
    partners: (school.partners || []).map((partner) => ({
      name: partner.partnerName || partner.schoolName || "",
      logo: partner.partnerLogo?.url || partner.logo?.url || null,
    })),
  };
}
