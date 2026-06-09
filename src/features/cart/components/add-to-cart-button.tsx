'use client'

import { useState } from 'react'
import type { Product } from '@/features/products/types/product'
import { useCart } from '@/features/cart/cart-context'
import { addCart } from '@/features/cart/services/cart-service'

type AddToCartButtonProps = {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem, openCartTemporarily } = useCart()
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      addItem(product, 1)
      openCartTemporarily(5000)

      await addCart({
        userId: 1,
        products: [{ id: product.id, quantity: 1 }],
      })

      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch {
      console.error('Erro ao adicionar ao carrinho')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      disabled={product.stock === 0 || loading}
      onClick={handleClick}
      className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-black/80 focus:ring-2 focus:ring-black-500 focus:ring-offset-2 focus:outline-hidden disabled:cursor-not-allowed disabled:bg-gray-300 cursor-pointer"
    >
      {loading ? 'Adicionando...' : added ? 'Adicionado!' : 'Add to cart'}
    </button>
  )
}
