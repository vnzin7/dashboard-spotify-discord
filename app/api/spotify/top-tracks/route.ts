import { NextResponse } from 'next/server';
import { getTopTracks } from '@/lib/spotify';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeRange = searchParams.get('timeRange') || 'short_term';
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const data = await getTopTracks(timeRange, limit);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch top tracks' },
      { status: 500 }
    );
  }
}
