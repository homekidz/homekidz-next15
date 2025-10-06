import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', 'db.json')
const MERCHANT = process.env.ZARINPAL_MERCHANT_ID || ''
const SENDGRID_KEY = process.env.SENDGRID_API_KEY || ''
const SENDER_EMAIL = process.env.SENDER_EMAIL || ''

async function sendEmail(to: string, subject: string, html: string) {
  if (!SENDGRID_KEY || !SENDER_EMAIL) return false
  try {
    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: SENDER_EMAIL },
        subject,
        content: [{ type: 'text/html', value: html }]
      })
    })
    return true
  } catch (e) {
    return false
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const orderId = url.searchParams.get('orderId') || ''
  const authority = url.searchParams.get('authority') || ''
  const status = url.searchParams.get('status') || '' // sometimes gateways pass status
  const dbRaw = fs.readFileSync(dbPath, 'utf-8')
  const db = JSON.parse(dbRaw)
  const order = db.orders.find((o:any) => o.id === orderId)
  if (!order) return NextResponse.json({ ok: false, error: 'order not found' }, { status: 404 })

  // If merchant not set, mark paid (mock flow)
  if (!MERCHANT) {
    order.status = 'paid'
    order.paidAt = new Date().toISOString()
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8')
    // send notification email to admin (if configured)
    if (order && SENDGRID_KEY && SENDER_EMAIL) {
      const adminEmail = SENDER_EMAIL
      const html = `<p>سفارش ${order.id} با موفقیت پرداخت شد. مبلغ: ${order.amount.toLocaleString()} تومان</p>`
      await sendEmail(adminEmail, `پرداخت موفق - ${order.id}`, html)
    }
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/payment-success?orderId=${orderId}&authority=${authority}`)
  }

  // Real verification
  try {
    const res = await fetch('https://payment.zarinpal.com/pg/v4/payment/verify.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_id: MERCHANT,
        authority: authority,
        amount: order.amount
      })
    })
    const data = await res.json()
    if (data && data.data && (data.data.code === 100 || data.data.code === 101)) {
      order.status = 'paid'
      order.paidAt = new Date().toISOString()
      order.refId = data.data.ref_id || ''
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8')
      // Notify admin via email if configured
      if (SENDGRID_KEY && SENDER_EMAIL) {
        const adminEmail = SENDER_EMAIL
        const html = `<p>سفارش ${order.id} با موفقیت پرداخت شد.<br>مبلغ: ${order.amount.toLocaleString()} تومان<br>RefID: ${order.refId}</p>`
        await sendEmail(adminEmail, `پرداخت موفق - ${order.id}`, html)
      }
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/payment-success?orderId=${orderId}&authority=${authority}`)
    } else {
      // failed
      order.status = 'failed'
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8')
      return NextResponse.json({ ok: false, data }, { status: 400 })
    }
  } catch (err:any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
