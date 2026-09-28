import { NextResponse } from "next/server";
import { fetchTestimonials } from "../../../lib/hygraph";
import { getSchoolYears } from "../../../lib/schools";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedSchoolType = searchParams.get("schoolType") || searchParams.get("school") || "coeswio";
    const first = Number(searchParams.get("first") || searchParams.get("limit") || 12);
    const skip = Number(searchParams.get("skip") || 0);

    const schoolType = String(requestedSchoolType).toLowerCase();
    const pageSize = Number.isFinite(first) && first > 0 ? Math.min(first, 100) : 12;
    const pageOffset = Number.isFinite(skip) && skip >= 0 ? skip : 0;

    // Year options come from schools, and testimonial records are fetched in batches.
    const [availableYears, { testimonials, hasNextPage }] = await Promise.all([
      getSchoolYears(schoolType),
      fetchTestimonials({ schoolType, first: pageSize, skip: pageOffset }),
    ]);

    return NextResponse.json(
      {
        success: true,
        schoolType,
        availableYears,
        first: pageSize,
        skip: pageOffset,
        hasNextPage,
        count: testimonials.length,
        data: testimonials,
        testimonialsConnection: {
          edges: testimonials.map((node) => ({ node })),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/testimonials:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to fetch testimonials from Hygraph",
      },
      { status: 500 }
    );
  }
}
