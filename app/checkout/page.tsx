'use client'
import { useContext, useState } from 'react'
import CartContext from '../../components/CartContext'

export default function Checkout() {
  const { items, clear } = useContext(CartContext)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const total = items.reduce((s: number, it: any) => s + it.price * it.qty, 0)

  async function handleCheckout(e: any) {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.target)
    const payload: any = {}
    form.forEach((v,k) => payload[k] = v)
    payload.items = items
    const res = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    setLoading(false)
    if (data?.paymentUrl) {
      window.location.href = data.paymentUrl
    } else {
      setMessage('خطا در ایجاد سفارش')
    }
  }

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">تسویه‌حساب</h2>
      <div className="bg-white p-4 rounded-md shadow mb-4">
        <div className="text-sm text-gray-600">مبلغ قابل پرداخت: <span className="font-bold">{total.toLocaleString()} تومان</span></div>
      </div>

      <form onSubmit={handleCheckout} className="bg-white p-4 rounded-md shadow space-y-3">
        <div>
          <label className="block text-sm mb-1">نام و نام خانوادگی</label>
          <input name="name" required className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm mb-1">شماره تماس</label>
          <input name="phone" required className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm mb-1">آدرس</label>
          <textarea name="address" required className="w-full px-3 py-2 border rounded-md"></textarea>
        </div>

        <div className="flex justify-between items-center">
          <button type="submit" disabled={loading} className="bg-pk-pastel text-white px-4 py-2 rounded-md">
            {loading ? 'در حال ایجاد سفارش...' : 'پرداخت'}
          </button>
        </div>
        {message && <div className="text-red-500">{message}</div>}
      </form>
    </section>
  )
}
