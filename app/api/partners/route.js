import { NextResponse } from "next/server";
import { fetchPartners } from "../../../lib/hygraph";

export async function GET() {
  try {
    const partners = await fetchPartners();

    return NextResponse.json({
      success: true,
      data: partners,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to fetch partners",
      },
      { status: 500 }
    );
  }
}
