import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'



export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  console.log("OwnTracks POST content-type:",
    request.headers.get("content-type"));
  console.log("OwnTracks POST raw body:",
    JSON.stringify(rawBody));

  if (!rawBody.trim()) {
    return Response.json(
      { error: "Empty request body" },
      { status: 400 }
    );
  }

  let body;

  try {
    body = JSON.parse(rawBody);
  } catch (error) {
    console.error("Invalid OwnTracks JSON:", error);
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  console.log("Parsed OwnTracks body:", body);

  // Keep the rest of your existing POST handler here.
  // Use the parsed `body` variable; do not call request.json() again.
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