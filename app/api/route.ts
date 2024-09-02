// File: app/api/transcript/route.ts
import { convertLongToShort } from './shortener';
import { NextRequest, NextResponse } from 'next/server';

const cache = new Map();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return NextResponse.json({ error: 'Missing videoId parameter' }, { status: 400 });
  }
  try {
    const msg = await convertLongToShort(cache, videoId);
    return NextResponse.json(JSON.parse(msg));
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

