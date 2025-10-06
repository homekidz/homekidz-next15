'use client'
import { useContext } from 'react'
import CartContext from '../../components/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { items, addItem, removeItem, clear } = useContext(CartContext)

  const total = items.reduce((s: number, it: any) => s + it.price * it.qty, 0)

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">سبد خرید</h2>
      {items.length === 0 ? (
        <div>سبد خرید خالی است. <Link href="/"><a className="text-pk-pastel">مشاهده محصولات</a></Link></div>
      ) : (
        <div>
          <ul className="space-y-4">
            {items.map((it: any) => (
              <li key={it.id} className="flex items-center gap-4 bg-white p-3 rounded-md shadow">
                <img src={it.image} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{it.name}</div>
                  <div className="text-sm text-gray-500">{it.size}</div>
                </div>
                <div className="text-sm">{it.qty} × {it.price.toLocaleString()} تومان</div>
                <button onClick={() => removeItem(it.id)} className="text-red-500">حذف</button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-lg font-bold">مجموع: {total.toLocaleString()} تومان</div>
            <Link href="/checkout"><a className="bg-pk-pastel text-white px-4 py-2 rounded-md">ادامه به پرداخت</a></Link>
          </div>
        </div>
      )}
    </section>
  )
}
