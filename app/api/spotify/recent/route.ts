import { NextResponse } from 'next/server';
import { getRecentTracks } from '@/lib/spotify';

export async function GET() {
  try {
    const data = await getRecentTracks(10);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recent tracks' },
      { status: 500 }
    );
  }
}
