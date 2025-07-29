import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('API called - attempting Supabase query...')
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('mappings')
      .select('*')
      .single()

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

export async function POST(request: NextRequest) {
  const { label, angle } = await request.json()
  console.log('POST request received with data:', { label, angle })
  console.log("angle type:", typeof angle)
  console.log("label type:", typeof label)
  const supabase = await createClient()
  const { error } = await supabase
    .from('status')
    .update({ label })
    .eq('angle', angle)

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ ok: true })
}
