import { getSchoolFilterOptions } from "@/lib/schools";

export async function GET() {
  try {
    const data = await getSchoolFilterOptions();

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("API Error fetching filters:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch filter options",
      },
      { status: 500 }
    );
  }
}
