import Link from 'next/link'

export default function ProductCard({ product }: { product: any }) {
  return (
    <article className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition">
      <Link href={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-3" />
      </Link>
      <h3 className="font-semibold">{product.name}</h3>
      <div className="flex justify-between items-center mt-2">
        <div className="font-bold">{product.price.toLocaleString()} تومان</div>
        <Link href={`/product/${product.slug}`}><a className="text-sm bg-accent-pink px-3 py-1 rounded-md text-white">مشاهده</a></Link>
      </div>
    </article>
  )
}
