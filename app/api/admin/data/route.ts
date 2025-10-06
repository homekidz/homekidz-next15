import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', 'db.json')

export async function GET() {
  const raw = fs.readFileSync(dbPath, 'utf-8')
  const db = JSON.parse(raw)
  return NextResponse.json(db)
}
