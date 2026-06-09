'use client'

import Link from 'next/link'
import { CheckIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/features/cart/cart-context'
import { formatPrice } from '@/features/cart/utils/format-price'

export default function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCart()

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
        Cart
      </h1>

      {items.length === 0 ? (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Seu carrinho está vazio.</p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Continuar comprando
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4"
              >
                <div className="flex w-full items-center justify-between gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="size-18 rounded-md object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={`/products/${item.id}`}
                      className="truncate text-sm font-medium text-gray-900 hover:text-gray-700"
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {formatPrice(item.price, item.discountPercentage)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 rounded-md border border-gray-200 p-2">
                    <button
                      type="button"
                      className="cursor-pointer text-sm/6 font-semibold text-gray-900"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <MinusIcon className="size-4" />
                    </button>
                    <p className="text-sm font-medium text-gray-900">{item.quantity}</p>
                    <button
                      type="button"
                      className="cursor-pointer text-sm/6 font-semibold text-gray-900"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <PlusIcon className="size-4" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="cursor-pointer text-sm/6 font-semibold text-gray-900"
                  onClick={() => removeItem(item.id)}
                >
                  <TrashIcon className="size-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-sm font-medium text-gray-900">${total.toFixed(2)}</p>
          </div>

          <Link
            href="/checkout"
            className="mt-6 flex cursor-pointer items-center justify-center gap-2 rounded-md bg-black p-2 text-sm/6 font-semibold text-white"
          >
            Checkout
            <CheckIcon className="size-4" />
          </Link>
        </>
      )}
    </div>
  )
}
