import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import prisma from '../../../lib/prisma'

const dbPath = path.join(process.cwd(), 'data', 'db.json')

export async function POST(req: Request) {
  const body = await req.json()
  if (!body || !body.items || body.items.length === 0) {
    return NextResponse.json({ ok: false, error: 'no items' }, { status: 400 })
  }
  const raw = fs.readFileSync(dbPath, 'utf-8')
  const db = JSON.parse(raw)
  const orderId = 'ORD_' + Date.now()
  const order = {
    id: orderId,
    items: body.items,
    name: body.name,
    phone: body.phone,
    address: body.address,
    amount: body.items.reduce((s: number, it: any) => s + it.price * it.qty, 0),
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  db.orders.push(order)
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8')
  // Initiate payment via Zarinpal API route
// If DATABASE_URL is set, also persist order to Postgres via Prisma
if (process.env.DATABASE_URL) {
  try {
    prisma.order.create({ data: {
      orderId: orderId,
      name: order.name,
      phone: order.phone,
      address: order.address,
      amount: order.amount,
      status: order.status,
      items: order.items
    }})
  } catch (e) {
    console.error('Prisma save failed', e)
  }
}
  const base = process.env.NEXT_PUBLIC_BASE_URL || ''
  const paymentRes = await fetch(`${base}/api/payments/zarinpal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, amount: order.amount })
  })
  const paymentData = await paymentRes.json()
  return NextResponse.json({ ok: true, orderId, paymentUrl: paymentData.url })
}
