import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-pk-pastel w-10 h-10 flex items-center justify-center font-bold text-white">ک</div>
            <div>
              <h1 className="text-lg font-semibold">HomeKidz</h1>
              <p className="text-xs text-gray-500">شیک، نرم، و ایمن برای کوچولوها</p>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <Link href="/"><a className="text-sm hover:underline">خانه</a></Link>
            <Link href="/cart"><a className="text-sm hover:underline">سبد خرید</a></Link>
            <Link href="/admin"><a className="text-sm hover:underline">پنل ادمین</a></Link>
            <a href="https://instagram.com/home_kidz_" target="_blank" rel="noreferrer" className="text-sm hover:underline">اینستاگرام</a>
          </nav>
        </div>
      </div>
    </header>
  )
}
