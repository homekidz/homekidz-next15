import { NextResponse } from 'next/server'
import { sendGridEmail } from '../../../../lib/email'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  const body = await req.json()
  const to = body.to
  const SENDGRID_KEY = process.env.SENDGRID_API_KEY || ''
  const SENDER = process.env.SENDER_EMAIL || ''

  if (!SENDGRID_KEY || !SENDER) {
    return NextResponse.json({ ok: false, error: 'SENDGRID_API_KEY or SENDER_EMAIL not configured' }, { status: 400 })
  }
  if (!to) return NextResponse.json({ ok: false, error: 'recipient missing' }, { status: 400 })

  const html = `<p>این یک ایمیل آزمایشی از HomeKidz است.</p><p>تاریخ: ${new Date().toISOString()}</p>`
  const ok = await sendGridEmail(SENDGRID_KEY, SENDER, to, 'آزمایش ایمیل HomeKidz', html)
  if (ok) return NextResponse.json({ ok: true })
  return NextResponse.json({ ok: false, error: 'sendgrid failed' }, { status: 500 })
}
