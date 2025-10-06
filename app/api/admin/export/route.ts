import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', 'db.json')

export async function GET() {
  const raw = fs.readFileSync(dbPath, 'utf-8')
  const db = JSON.parse(raw)
  const orders = db.orders || []
  const headers = ['id','name','phone','address','amount','status','createdAt','paidAt']
  const rows = orders.map(o => headers.map(h => JSON.stringify(o[h] || '')).join(','))
  const csv = [headers.join(','), ...rows].join('\n')
  return new NextResponse(csv, { status: 200, headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="orders.csv"' } })
}
