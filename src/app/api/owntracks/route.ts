import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'



export async function POST(request: NextRequest) {
    const body = await request.json();

  console.log("OwnTracks update:", JSON.stringify(body, null, 2));

  // Entering or leaving region
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

  // Manual sent location
  if (body._type === 'location') {
    console.log('Location event received:', body);
    const location = body.poi; // location name
    const user = body.tid;      // short user ID (2-character ID from OwnTracks)

const supabase = await createClient()
  const { error } = await supabase
    .from('current_location')
    .insert([{ user, location, event: 'custom' }])

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ ok: true })
}

export async function GET() {
  try {
    const supabase = await createClient()

    console.log('API called - attempting Supabase query...')
    const { data, error } = await supabase
      .from('current_location')
      .select('*')
      .order('created_at', { ascending: false }) // assuming you track updates
      .limit(1); // get latest row

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    console.log('Success:', data)
    return NextResponse.json(data)
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}