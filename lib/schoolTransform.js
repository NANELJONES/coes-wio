export function transformSchoolData(school) {
  return {
    schoolName: school.schoolName,
    year: school.schoolYear,
    slug: school.slug,
    theme: school.schoolTheme,
    location: school.schoolLocation,
    excerpt: school.excerpt,
    description: school.detailedDescription || (school.schoolDetails?.raw?.children
      ? (() => {
          const paragraphs = school.schoolDetails.raw.children.filter(
            (child) => child.type === "paragraph"
          );
          if (paragraphs.length === 0) return "";
          const firstPara = paragraphs[0];
          return firstPara.children.map((child) => child.text).join("");
        })()
      : ""),
    coverImage: school.coverImage?.url || "",
    country: school.country,
    status: school.schoolStatus,
    instructors: school.instructors || [],
    gallery: (school.gallery || []).map((item) => item?.url).filter(Boolean),
    funders: (school.funders || []).map((funder) => ({
      name: funder.funderName || "",
      logo: funder.funderLogo?.url || null,
    })),
    schoolPartners: (school.schoolPartner || school.schoolPartners || []).map((partner) => ({
      name: partner.schoolName || "",
      logo: partner.logo?.url || null,
    })),
  };
}
