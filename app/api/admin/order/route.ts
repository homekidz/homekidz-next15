import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', 'db.json')

export async function POST(req: Request) {
  const body = await req.json()
  const raw = fs.readFileSync(dbPath, 'utf-8')
  const db = JSON.parse(raw)
  const order = db.orders.find((o:any)=>o.id === body.id)
  if (!order) return NextResponse.json({ ok: false }, { status: 404 })
  order.status = body.status || order.status
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8')
  return NextResponse.json({ ok: true, order })
}
