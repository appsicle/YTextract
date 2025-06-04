import { NextRequest, NextResponse } from "next/server";
import { analyzeVideoDirectly } from "../llm/gemini-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { youtubeUrl, prompt } = body;

    if (!youtubeUrl) {
      return NextResponse.json({ error: "YouTube URL is required" }, { status: 400 });
    }

    console.log(`Analyzing video directly: ${youtubeUrl}`);
    const analysis = await analyzeVideoDirectly(youtubeUrl, prompt);
    
    return NextResponse.json({ data: analysis });
  } catch (error: any) {
    console.error("Full error in /api/analyze:", error);
    return NextResponse.json({ error: "Failed to analyze video. Please try again." }, { status: 500 });
  }
} 