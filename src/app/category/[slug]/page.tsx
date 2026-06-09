import CategoryPageClient from '@/features/category/components/category-page-client'
import { getCategory } from '@/features/products/services/product-service'
import type { Product } from '@/features/products/types/product'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategory(slug)
  const products: Product[] = category.products

  return <CategoryPageClient slug={slug} products={products} />
}
