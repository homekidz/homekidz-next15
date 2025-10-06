'use client'
import { useState } from 'react'

export default function AdminSettings() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function sendTest(e:any){
    e.preventDefault()
    setMessage('در حال ارسال...')
    const res = await fetch('/api/admin/send-test-email', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ to: email }) })
    const data = await res.json()
    if (data.ok) setMessage('آزمایش ایمیل با موفقیت انجام شد.')
    else setMessage('ارسال ایمیل ناموفق بود: ' + (data.error || 'خطا'))
  }

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">تنظیمات ایمیل (SendGrid)</h2>
      <p className="mb-3 text-sm text-gray-600">برای ارسال ایمیل‌های اطلاع‌رسانی، متغیرهای محیطی `SENDGRID_API_KEY` و `SENDER_EMAIL` را در `.env.local` قرار دهید.</p>

      <form onSubmit={sendTest} className="bg-white p-4 rounded shadow space-y-3">
        <div>
          <label className="block text-sm mb-1">ارسال ایمیل آزمایشی به</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="آدرس ایمیل" className="w-full px-3 py-2 border rounded-md" />
        </div>
        <button className="bg-pk-pastel text-white px-4 py-2 rounded-md">ارسال ایمیل آزمایشی</button>
      </form>

      {message && <div className="mt-3 p-3 bg-white rounded shadow text-sm">{message}</div>}
    </section>
  )
}
