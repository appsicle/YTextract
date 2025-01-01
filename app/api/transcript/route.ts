// File: app/api/transcript/route.ts
import { extractCaptions } from ".";
import { NextRequest, NextResponse } from "next/server";

const cache = new Map();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const videoId = searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json(
      { error: "Missing videoId parameter" },
      { status: 400 }
    );
  }
  try {
    const normalizedTranscript = await extractCaptions(videoId);
    console.log(normalizedTranscript)
    return NextResponse.json(normalizedTranscript);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
