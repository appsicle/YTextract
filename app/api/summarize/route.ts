import { NextRequest, NextResponse } from "next/server";
import { getClaudeResponse } from "../llm";

export async function POST(request: NextRequest) {
  try {
    const text = await request.text();
    console.log(text);
    const response = await getClaudeResponse(text);
    console.log(response);
    return NextResponse.json({ data: response });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
