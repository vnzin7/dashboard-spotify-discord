import { NextResponse } from 'next/server';
import { getServerStats } from '@/lib/discord';

export async function GET() {
  const guildId = process.env.DISCORD_GUILD_ID;
  
  if (!guildId) {
    return NextResponse.json(
      { error: 'Discord guild ID not configured' },
      { status: 500 }
    );
  }

  try {
    const data = await getServerStats(guildId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Discord server stats' },
      { status: 500 }
    );
  }
}
