import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .delete()
      .lt('expires_at', new Date().toISOString());

    if (error) throw error;

    return NextResponse.json({ message: 'Reservations cleaned up successfully' });
  } catch (error) {
    console.error('Error cleaning up reservations:', error);
    return NextResponse.json({ error: 'Failed to clean up reservations' }, { status: 500 });
  }
}