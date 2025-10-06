import { NextResponse } from 'next/server'

const MERCHANT = process.env.ZARINPAL_MERCHANT_ID || ''
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ''

export async function POST(req: Request) {
  const body = await req.json()
  const { orderId, amount } = body

  // If merchant ID not configured, return internal mock link
  if (!MERCHANT) {
    const url = `/api/payments/zarinpal/redirect?orderId=${orderId}&amount=${amount}`
    return NextResponse.json({ ok: true, url })
  }

  // Real Zarinpal integration
  try {
    const res = await fetch('https://payment.zarinpal.com/pg/v4/payment/request.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_id: MERCHANT,
        amount: amount,
        callback_url: `${BASE_URL}/api/payments/zarinpal/verify?orderId=${orderId}`,
        description: `پرداخت سفارش ${orderId}`
      })
    })

    const data = await res.json()
    // Expected: { data: { authority, code, gateway_url, ... } } or error
    if (data && data.data && data.data.authority && data.data.url) {
      // some implementations return url in data.url or gateway_url; prefer url then gateway_url
      const url = data.data.url || data.data.gateway_url || `https://www.zarinpal.com/pg/StartPay/${data.data.authority}`
      return NextResponse.json({ ok: true, url })
    }
    return NextResponse.json({ ok: false, error: data }, { status: 500 })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
