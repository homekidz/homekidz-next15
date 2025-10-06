'use client'
import { useState, useMemo } from 'react'
import useSWR from 'swr'
import ProductCard from '../components/ProductCard'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function Home() {
  const { data } = useSWR('/api/products', fetcher, { fallbackData: [] })
  const [q, setQ] = useState('')
  const [maxPrice, setMaxPrice] = useState(0)

  const products = data || []

  const filtered = useMemo(() => {
    return products.filter((p: any) => {
      if (q && !p.name.includes(q) && !p.description?.includes(q)) return false
      if (maxPrice && p.price > maxPrice) return false
      return true
    })
  }, [products, q, maxPrice])

  return (
    <section className="max-w-6xl mx-auto p-4">
      <header className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">HomeKidz</h1>
          <p className="text-sm text-gray-600">اینستاگرام: @home_kidz_</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="جستجو نام یا توضیحات..." className="px-3 py-2 rounded-l-md w-full md:w-80" />
          <input type="number" value={maxPrice||''} onChange={(e)=>setMaxPrice(Number(e.target.value))} placeholder="حداکثر قیمت" className="px-3 py-2 rounded-r-md w-36" />
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p: any) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}
