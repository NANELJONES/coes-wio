import { NextResponse } from "next/server";
import { fetchGalleryEntries } from "../../../lib/hygraph";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const first = Number(searchParams.get("first") || 1);
    const skip = Number(searchParams.get("skip") || 0);

    const data = await fetchGalleryEntries({
      first: Number.isFinite(first) ? first : 1,
      skip: Number.isFinite(skip) ? skip : 0,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error?.message || "Failed to fetch gallery entries" },
      { status: 500 }
    );
  }
}
