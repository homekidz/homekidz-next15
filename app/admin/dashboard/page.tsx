'use client'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [products, setProducts] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [name,setName]=useState(''); const [price,setPrice]=useState(0); const [slug,setSlug]=useState('')

  useEffect(()=>{ fetchData() },[])

  async function fetchData(){
    const ps = await fetch('/api/products').then(r=>r.json())
    const db = await fetch('/api/admin/data').then(r=>r.json())
    setProducts(ps)
    setOrders(db.orders || [])
  }

  async function addProduct(e:any){
    e.preventDefault()
    const p = { name, price, slug, image:'/images/placeholder.jpg', sizes:['0-3m'] }
    await fetch('/api/admin/product', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(p) })
    fetchData()
    setName(''); setPrice(0); setSlug('')
  }

  function downloadCSV(){
    window.location.href = '/api/admin/export'
  }

  return (
    <section className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">پنل ادمین</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">افزودن محصول</h3>
          <form onSubmit={addProduct} className="space-y-3">
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="نام محصول" className="w-full px-3 py-2 border rounded-md" />
            <input value={price} onChange={e=>setPrice(Number(e.target.value))} placeholder="قیمت" className="w-full px-3 py-2 border rounded-md" />
            <input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="slug (مثلا flower-dress)" className="w-full px-3 py-2 border rounded-md" />
            <button className="bg-accent-blue text-white px-3 py-2 rounded-md">افزودن</button>
          </form>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">سفارش‌ها</h3>
          <div className="flex gap-2 mb-3">
            <button onClick={downloadCSV} className="bg-pk-pastel text-white px-3 py-2 rounded-md">دریافت گزارش CSV</button>
          </div>
          <ul className="space-y-2">
            {orders.map(o=> (
              <li key={o.id} className="p-2 border rounded">{o.id} — {o.status} — {o.amount.toLocaleString()} تومان</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">محصولات</h3>
        <ul className="space-y-2">
          {products.map(p=> <li key={p.id} className="p-2 border rounded">{p.name} — {p.price.toLocaleString()} تومان</li>)}
        </ul>
      </div>
    </section>
  )
}
