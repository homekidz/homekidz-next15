import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const pass = process.env.ADMIN_PASSWORD || 'admin123'
  if (body.password === pass) return NextResponse.json({ ok: true })
  return NextResponse.json({ ok: false }, { status: 401 })
}
