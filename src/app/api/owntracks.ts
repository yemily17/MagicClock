// pages/api/owntracks.ts

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body;

  // Optional: log what OwnTracks sends
  console.log("OwnTracks update:", JSON.stringify(body, null, 2));

  // OwnTracks region messages have `_type: 'transition'`
  if (body._type === 'transition') {
    const location = body.desc; // this is the region name you defined
    const event = body.event;   // 'enter' or 'leave'
    const user = body.tid;      // short user ID (2-character ID from OwnTracks)

    // OPTIONAL: You could store this in Supabase, or send a response to the ESP

    return res.status(200).json({ status: 'ok', received: { location, event, user } });
  }

  return res.status(200).json({ status: 'ignored', reason: 'not a transition event' });
}
