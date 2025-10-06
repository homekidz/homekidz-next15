import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', 'db.json')

export async function POST(req: Request) {
  const body = await req.json()
  const raw = fs.readFileSync(dbPath, 'utf-8')
  const db = JSON.parse(raw)
  const newId = db.products.length ? Math.max(...db.products.map((p:any)=>p.id))+1 : 1
  const product = { id: newId, slug: body.slug || ('p-' + newId), name: body.name, price: body.price, image: body.image || '/images/placeholder.jpg', sizes: body.sizes || ['0-3m'], description: body.description || '' }
  db.products.push(product)
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8')
  return NextResponse.json({ ok: true, product })
}
