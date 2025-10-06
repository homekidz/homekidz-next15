import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const dbPath = path.join(process.cwd(), 'data', 'db.json');
  const raw = fs.readFileSync(dbPath, 'utf-8');
  const db = JSON.parse(raw);

  const product = db.products.find((p: any) => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <section className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img src={product.image} alt={product.name} />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="text-xl font-extrabold mb-4">{product.price} تومان</div>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="mb-4">
            <label className="block text-sm mb-2">سایز:</label>
            <select id="size" className="px-3 py-2 border rounded">
              {product.sizes?.map((s: string) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <form action="/api/orders" method="post">
              <input type="hidden" name="productId" value={product.id} />
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded"
              >
                افزودن به سبد خرید
              </button>
            </form>
            <a
              href="/cart"
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            >
              مشاهده سبد خرید
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
