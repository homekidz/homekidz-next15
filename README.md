# HomeKidz - Final Scaffold (Zarinpal + Admin + Search + Pastel UI)

این نسخه شامل:
- Next.js (App Router) + TypeScript + Tailwind (پالت صورتی/آبی پاستیلی)
- صفحه محصول، سبد، تسویه (Checkout)
- اتصال به زرین‌پال (نمونه‌ی sandbox flow, نیاز به MERCHANT ID دارد)
- پنل ادمین ساده در مسیر `/admin` با پسورد اولیه `admin123` (قابل تغییر در .env.local)
- جستجو و فیلتر در فرانت (client-side)
- Mock DB: فایل `data/db.json` برای محصولات و سفارش‌ها (قابل تعویض با Postgres/Prisma)

## راه‌اندازی محلی

1. کلون / استخراج آرشیو
2. `cp .env.example .env.local` و مقادیر را ویرایش کن (خصوصاً ZARINPAL_MERCHANT_ID)
3. `npm install`
4. `npm run dev`
5. وارد `http://localhost:3000` شو و برای پنل ادمین `http://localhost:3000/admin` با رمز `admin123` وارد شو.

## نکات درگاه زرین‌پال
- برای تست، از MERCHANT ID تستی زرین‌پال استفاده کن یا sandbox تستی ارائه شده در مستندات زرین‌پال.
- مسیرها:
  - POST `/api/payments/zarinpal` : ایجاد تراکنش و دریافت لینک پرداخت (redirect)
  - GET `/api/payments/zarinpal/verify` : تایید پرداخت بعد از بازگشت از زرین‌پال
- README شامل نمونهٔ جریان و security notes است.


## نحوه تست Zarinpal (mock)
- اگر `ZARINPAL_MERCHANT_ID` را در `.env.local` قرار ندهی، برنامه از مسیر mock داخلی استفاده می‌کند که پرداخت را شبیه‌سازی می‌کند.
- برای فعال‌سازی پرداخت واقعی، `ZARINPAL_MERCHANT_ID` را قرار بده و در `app/api/payments/zarinpal/route.ts` بخش ارسال درخواست به API زرین‌پال را پیاده کن (مستندات زرین‌پال را دنبال کن).

## رنگ‌بندی پاستلی
- پینک پاستل: `#FFD6E8` (class: `bg-pk-pastel`)
- آبی پاستل: `#C5E1F9` (class: `bg-bk-pastel`)

## Zarinpal production integration
- Set `ZARINPAL_MERCHANT_ID` and `NEXT_PUBLIC_BASE_URL` in `.env.local`.
- The app will POST to `https://payment.zarinpal.com/pg/v4/payment/request.json` and later verify at `https://payment.zarinpal.com/pg/v4/payment/verify.json` as per Zarinpal docs. See: https://payment.zarinpal.com/pg/v4/payment/request.json and https://payment.zarinpal.com/pg/v4/payment/verify.json. citeturn0search12turn0search1

## Email notifications (SendGrid)
- For email notifications you can set `SENDGRID_API_KEY` and `SENDER_EMAIL` in `.env.local`.
- We use SendGrid v3 Mail Send API to send admin notifications after successful payment. Docs: https://docs.sendgrid.com/api-reference/mail-send/mail-send. citeturn1search0

## تنظیم و تست ایمیل (SendGrid)
برای فعال‌سازی ایمیل‌های اطلاع‌رسانی:
1. ثبت‌نام در SendGrid و گرفتن `SENDGRID_API_KEY` (API Key).  
2. مقدار `SENDER_EMAIL` را در `.env.local` قرار بده (مثلاً `no-reply@yourdomain.com`).  
3. در پنل ادمین -> Settings، می‌توانی ایمیل آزمایشی ارسال کنی تا مطمئن شوی همه چیز درست است.  
4. اگر نمی‌خواهی SendGrid استفاده کنی، می‌توانیم SMTP Gmail را جایگزین کنیم (نیاز به App Password دارد).

## اضافه شدن Prisma و راه‌اندازی دیتابیس (اختیاری اما پیشنهاد می‌شود)
برای استفاده از دیتابیس Postgres با Prisma (نسبت به فایل JSON برای production ایمن‌تر است):

1. نصب وابستگی‌ها:
```bash
npm install prisma @prisma/client
```

2. تنظیم `DATABASE_URL` در `.env.local`، مثال:
```
DATABASE_URL=postgresql://user:password@db-host:5432/homekidz
```

3. اجرای مایگریت‌ها و Seed:
```bash
npm run prisma:generate
npm run prisma:migrate
node prisma/seed.js
# یا از اسکریپت اتومات:
DATABASE_URL=... ./scripts/deploy.sh
```

4. اگر از Vercel استفاده می‌کنی، در بخش Environment Variables متغیرهای `DATABASE_URL`, `ZARINPAL_MERCHANT_ID`, `SENDGRID_API_KEY`, `SENDER_EMAIL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_BASE_URL` را تنظیم کن.

## Deploy خودکار (GitHub → Vercel)
- Push کردن ریپو به GitHub و اتصال پروژه به Vercel کافی است. GitHub Actions یا Vercel Builds اسکریپت build را اجرا خواهند کرد. قبل از deploy، در Vercel بخش Environment Variables را تکمیل کن و در صورت استفاده از DB دستور `npx prisma migrate deploy` را اجرا کن یا از اسکریپت بالا استفاده کن.
