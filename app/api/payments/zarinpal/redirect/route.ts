import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const orderId = url.searchParams.get('orderId')
  const amount = url.searchParams.get('amount')
  // Simulate user paid successfully at gateway and redirect to verify with authority
  return NextResponse.redirect(`/api/payments/zarinpal/verify?orderId=${orderId}&authority=MOCK_AUTH`)
}
