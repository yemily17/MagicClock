'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [label, setLabel] = useState('')
  const [angle, setAngle] = useState('')

  useEffect(() => {
    fetch('/api/location')
      .then(res => res.json())
      .then(data => {
        setLabel(data.label)
        setAngle(data.angle)
      })
  }, [])

  const updateLocation = async () => {
    await fetch('/api/location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label, angle })
    })
  }

  return (
    <main className="p-6">
      <h1 className="text-xl mb-4">Magic Clock Control Panel</h1>
      <div className="mb-2">
        <label>Label:</label>
        <input value={label} onChange={e => setLabel(e.target.value)} className="border ml-2" />
      </div>
      <div className="mb-2">
        <label>Servo Angle:</label>
        <input value={angle} onChange={e => setAngle(e.target.value)} className="border ml-2" />
      </div>
      <button onClick={updateLocation} className="bg-blue-500 text-white px-4 py-2 mt-2">Update</button>
    </main>
  )
}
