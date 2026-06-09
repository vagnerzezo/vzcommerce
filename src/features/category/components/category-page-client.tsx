'use client'
import Link from 'next/link'
import type { Product } from '@/features/products/types/product'


function formatCategoryTitle(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

type CategoryPageClientProps = {
  slug: string
  products: Product[]
}

export default function CategoryPageClient({ slug, products }: CategoryPageClientProps) {
  const categoryTitle = formatCategoryTitle(slug)

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">{categoryTitle}</h1>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="flex gap-8">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="group text-sm">
                  <img
                    alt={product.title}
                    src={product.thumbnail}
                    className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                  />
                  <h3 className="mt-4 font-medium text-gray-900">{product.title}</h3>
                  <p className="text-gray-500 italic">{product.brand ?? product.category}</p>
                  <p className="mt-2 font-medium text-gray-900">${product.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
