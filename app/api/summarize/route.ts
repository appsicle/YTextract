import { NextRequest, NextResponse } from "next/server";
import { getGeminiResponse } from "../llm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const transcript = body.transcript;
    const granularity = body.granularity || "Standard Analysis"; // Default if not provided

    if (!transcript) {
      return NextResponse.json({ error: "Transcript is required" }, { status: 400 });
    }

    console.log(`Received transcript (length: ${transcript.length}), Granularity: ${granularity}`);
    const response = await getGeminiResponse(transcript, granularity);
    // console.log("Response from Gemini:", response); // Potentially very verbose
    return NextResponse.json({ data: response });
  } catch (error: any) {
    console.error("Full error in /api/summarize:", error); // Log full error to server console
    // Return a generic error message to the client
    return NextResponse.json({ error: "Failed to process the request. Please try again." }, { status: 500 });
  }
}
