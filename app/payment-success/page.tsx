import { useSearchParams } from 'next/navigation'

export default function Success() {
  const params = useSearchParams()
  const orderId = params.get('orderId')
  const authority = params.get('authority')

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">پرداخت موفق</h2>
      <div className="bg-white p-4 rounded shadow">
        <p>سفارش با شماره <strong>{orderId}</strong> با موفقیت پرداخت شد.</p>
        <p>کد مرجع: <strong>{authority}</strong></p>
        <p className="mt-4">از خرید شما متشکریم؛ کد رهگیری به شماره شما ارسال خواهد شد.</p>
      </div>
    </section>
  )
}
