import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const dbPath = path.join(process.cwd(), 'data', 'db.json')
  const raw = fs.readFileSync(dbPath, 'utf-8')
  const db = JSON.parse(raw)
  const product = db.products.find((p:any) => p.slug === params.slug)
  if (!product) return notFound()

  return (
    <section className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-md" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="text-xl font-extrabold mb-4">{product.price.toLocaleString()} تومان</div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="mb-4">
            <label className="block text-sm mb-2">انتخاب سایز</label>
            <select id="size" className="px-3 py-2 border rounded-md w-full">
              {product.sizes?.map((s: string) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex gap-3">
            <form action="/api/orders" method="post">
              <input type="hidden" name="productId" value={product.id} />
              <button type="submit" className="bg-pk-pastel text-white px-4 py-2 rounded-md">افزودن به سبد و خرید</button>
            </form>
            <a href="/cart" className="px-4 py-2 border rounded-md">افزودن به سبد</a>
          </div>
        </div>
      </div>
    </section>
  )
}
