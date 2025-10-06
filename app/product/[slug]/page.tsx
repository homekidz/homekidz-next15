import { getProductBySlug } from '@/lib/products'; // مسیر فانکشن داده‌ات
import ProductPage from '@/components/ProductPage'; // کامپوننت نمایش محصول
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// ✅ نسخه صحیح و بدون خطای TypeScript:
export default async function Page({ params }: ProductPageProps) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}

// ✅ اگر لازم داری مسیرهای استاتیک بسازی (SSG):
export async function generateStaticParams() {
  const products = await import('@/lib/products').then(mod => mod.getAllProducts());
  return products.map((product: any) => ({
    slug: product.slug,
  }));
}
