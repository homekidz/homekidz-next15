'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [pass, setPass] = useState('')
  const router = useRouter()

  useEffect(()=>{
    const ok = sessionStorage.getItem('hk_admin_auth')
    if (ok === '1') router.push('/admin/dashboard')
  },[])

  async function submit(e:any){
    e.preventDefault()
    // check password against env via API
    const res = await fetch('/api/admin/check', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ password: pass }) })
    const data = await res.json()
    if (data.ok) {
      sessionStorage.setItem('hk_admin_auth','1')
      router.push('/admin/dashboard')
    } else {
      alert('رمز اشتباه است')
    }
  }

  return (
    <section className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">ورود ادمین</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded-md shadow space-y-3">
        <input value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="رمز عبور" type="password" className="w-full px-3 py-2 border rounded-md" />
        <button className="bg-pk-pastel text-white px-4 py-2 rounded-md">ورود</button>
      </form>
    </section>
  )
}
