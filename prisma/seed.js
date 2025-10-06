const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')
const prisma = new PrismaClient()

async function main() {
  const dbPath = path.join(process.cwd(), '..', 'data', 'db.json')
  const raw = fs.readFileSync(dbPath, 'utf-8')
  const db = JSON.parse(raw)
  for (const p of db.products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description || '',
        price: p.price,
        image: p.image,
        sizes: p.sizes
      }
    })
  }
  console.log('Seed complete')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
