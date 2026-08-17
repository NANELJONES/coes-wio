import "server-only";

import { hygraphRequest } from "./hygraph";

export const DEFAULT_SCHOOL_TYPE = "coeswio";

const GET_SCHOOLS = `
  query GetSchools($first: Int!, $schoolType: SchoolType!) {
    schoolsConnection(
      first: $first
      orderBy: schoolYear_DESC
      where: { schoolType: $schoolType }
    ) {
      edges {
        node {
          id
          country
          coverImage {
            url
          }
          excerpt
          schoolName
          schoolLocation
          schoolStatus
          schoolTheme
          schoolYear
          slug
          instructors
          schoolType
        }
      }
    }
  }
`;

const GET_SCHOOLS_LIST = `
  query GetSchoolsList($first: Int!, $schoolType: SchoolType!) {
    schoolsConnection(
      first: $first
      orderBy: schoolYear_DESC
      where: { schoolType: $schoolType }
    ) {
      edges {
        node {
          id
          schoolName
          schoolYear
          slug
          schoolType
        }
      }
    }
  }
`;

const GET_SCHOOL_BY_SLUG = `
  query GetSchoolBySlug($slug: String!, $schoolType: SchoolType!) {
    schoolsConnection(
      first: 1
      where: { slug: $slug, schoolType: $schoolType }
    ) {
      edges {
        node {
          id
          country
          coverImage {
            url
          }
          excerpt
          schoolName
          schoolLocation
          schoolDetails {
            raw
          }
          schoolStatus
          schoolTheme
          schoolYear
          slug
          instructors
          schoolType
          gallery {
            url
          }
          partners {
            partnerName
            partnerLogo {
              url
            }
          }
        }
      }
    }
  }
`;

const GET_ALL_SCHOOLS_FOR_FILTERS = `
  query GetAllSchoolsForFilters($schoolType: SchoolType!) {
    schoolsConnection(first: 1000, where: { schoolType: $schoolType }) {
      edges {
        node {
          schoolYear
          country
          schoolStatus
          schoolLocation
        }
      }
    }
  }
`;

function nodesFromConnection(connection) {
  return (connection?.edges ?? []).map((edge) => edge?.node).filter(Boolean);
}

export async function getSchools(limit = 7, schoolType = DEFAULT_SCHOOL_TYPE) {
  try {
    const data = await hygraphRequest(GET_SCHOOLS, {
      first: limit,
      schoolType,
    });
    return nodesFromConnection(data.schoolsConnection);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return [];
  }
}

export async function getSchoolsList(limit = 50, schoolType = DEFAULT_SCHOOL_TYPE) {
  try {
    const data = await hygraphRequest(GET_SCHOOLS_LIST, {
      first: limit,
      schoolType,
    });
    return nodesFromConnection(data.schoolsConnection);
  } catch (error) {
    console.error("Error fetching schools list:", error);
    return [];
  }
}

export async function getSchoolBySlug(slug, schoolType = DEFAULT_SCHOOL_TYPE) {
  try {
    const data = await hygraphRequest(GET_SCHOOL_BY_SLUG, { slug, schoolType });
    return nodesFromConnection(data.schoolsConnection)[0] || null;
  } catch (error) {
    console.error("Error fetching school by slug:", error);
    return null;
  }
}

export async function getSchoolFilterOptions(schoolType = DEFAULT_SCHOOL_TYPE) {
  try {
    const data = await hygraphRequest(GET_ALL_SCHOOLS_FOR_FILTERS, { schoolType });
    const schools = nodesFromConnection(data.schoolsConnection);

    return {
      years: [...new Set(schools.map((s) => s.schoolYear).filter(Boolean))].sort(
        (a, b) => b - a
      ),
      countries: [...new Set(schools.map((s) => s.country).filter(Boolean))].sort(),
      statuses: [
        ...new Set(schools.map((s) => s.schoolStatus).filter(Boolean)),
      ].sort(),
      locations: [
        ...new Set(schools.map((s) => s.schoolLocation).filter(Boolean)),
      ].sort(),
    };
  } catch (error) {
    console.error("Error fetching school filters:", error);
    return { years: [], countries: [], statuses: [], locations: [] };
  }
}
