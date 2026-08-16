import { NextResponse } from "next/server";
import { fetchSchoolPartners } from "../../../lib/hygraph";

export async function GET() {
  try {
    const partners = await fetchSchoolPartners();

    return NextResponse.json({
      success: true,
      data: partners,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to fetch school partners",
      },
      { status: 500 }
    );
  }
}
