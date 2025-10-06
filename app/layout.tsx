import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CartProvider } from '../components/CartContext'

export const metadata = {
  title: 'HomeKidz — لباس کودک',
  description: 'فروشگاه آنلاین لباس کودک — نرم، شیک، با ارسال سریع',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gradient-to-b from-pk-pastel/30 to-bk-pastel/20 min-h-screen text-gray-800">
        <CartProvider>
          <Header />
          <main className="py-8">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
