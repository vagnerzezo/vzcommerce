import { getCategory } from '@/features/products/services/product-service'
import type { Product } from '@/features/products/types/product'
import ShowcaseSlider from './showcase-slider'
import Link from 'next/link'

export default async function Showcase() {
  const categories = await getCategory('laptops')
  const products: Product[] = categories.products

  return (
    
    <div className="mx-auto w-full md:max-w-7xl px-4 py-16">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">LAPTOPS</h2>
        <Link href="/category/laptops" className="hidden text-sm font-medium text- black hover:text-black md:block">
          Shop the collection
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>

      <ShowcaseSlider products={products} />

      <div className="mt-8 text-sm md:hidden">
        <Link href="/category/laptops" className="font-medium text-black hover:text-black">
          Shop the collection <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </div>
  );
}
