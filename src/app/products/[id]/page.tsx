import { notFound } from 'next/navigation'
import ProductDetail from '@/features/products/components/detail'
import { getProductById } from '@/features/products/services/product-service'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  try {
    const product = await getProductById(id)
    
    return <ProductDetail product={product} />
  } catch {
    notFound()
  }
}
