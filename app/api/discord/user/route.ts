import { NextResponse } from 'next/server';

export async function GET() {
  // Implementar autenticação OAuth2 do Discord
  return NextResponse.json({ message: 'User endpoint - implement OAuth' });
}
