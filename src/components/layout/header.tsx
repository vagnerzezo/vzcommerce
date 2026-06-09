import { getCategories } from '@/features/products/services/product-service'
import HeaderClient from '@/components/layout/header-client'

export default async function Header() {
  const categories = await getCategories()
  return <HeaderClient categories={categories} />
}
