export default function Footer() {
  return (
    <footer className="bg-white mt-12 py-8 border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h4 className="font-semibold mb-2">HomeKidz</h4>
          <p className="text-sm text-gray-600">تهران - شعبه آنلاین. پشتیبانی: ۰۹۰۰۱۲۳۴۵۶</p>
        </div>

        <div>
          <h5 className="font-medium mb-2">اشتراک</h5>
          <p className="text-sm text-gray-600 mb-2">برای دریافت تخفیف‌ها ایمیل را وارد کنید</p>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-400">© {new Date().getFullYear()} HomeKidz — همهٔ حقوق محفوظ است.</div>
    </footer>
  )
}
