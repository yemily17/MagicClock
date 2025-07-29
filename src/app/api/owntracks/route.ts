import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const body = request.body;

  // Optional: log what OwnTracks sends
  console.log("OwnTracks update:", JSON.stringify(body, null, 2));

  // OwnTracks region messages have `_type: 'transition'`
  if (body._type === 'transition') {
    console.log('Transition event received:', body);
    const location = body.desc; // this is the region name you defined
    const event = body.event;   // 'enter' or 'leave'
    const user = body.tid;      // short user ID (2-character ID from OwnTracks)

const supabase = await createClient()
  const { error } = await supabase
    .from('current_location')
    .insert([{ user, location, event }])

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ ok: true })
}

    // if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ ok: true })
}