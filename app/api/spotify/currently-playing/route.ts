import { NextResponse } from 'next/server';
import { getCurrentlyPlaying } from '@/lib/spotify';

export async function GET() {
  try {
    const data = await getCurrentlyPlaying();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    );
  }
}
