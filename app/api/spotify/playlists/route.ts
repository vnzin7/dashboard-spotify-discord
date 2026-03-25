import { NextResponse } from 'next/server';
import { getPlaylists } from '@/lib/spotify';

export async function GET() {
  try {
    const data = await getPlaylists(10);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch playlists' },
      { status: 500 }
    );
  }
}
