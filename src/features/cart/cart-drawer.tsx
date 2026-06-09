"use client"
import Link from 'next/link'
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer"
import { MinusIcon, PlusIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useCart } from '@/features/cart/cart-context'
import { formatPrice } from '@/features/cart/utils/format-price'

type CartDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, total, removeItem, updateQuantity } = useCart()

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange} >
      <DrawerContent className="w-full max-w-xl">
        <div className="flex flex-col gap-4 p-6">
          <div className="flex justify-between items-center">
            <DrawerTitle className="text-2xl font-semibold tracking-tight text-balance text-gray-900 sm:text-2xl">
              Cart
            </DrawerTitle>
            <button type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer" onClick={() => onOpenChange(false)}>
              <XMarkIcon className="size-6" />
            </button>
          </div>

          {items.length === 0 ? (
            <p className="mt-8 text-sm text-gray-500">Seu carrinho está vazio.</p>
          ) : (
            <div className="flex flex-col gap-4 mt-8">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 justify-between border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between gap-4 w-full">
                    <img src={item.thumbnail} alt={item.title} className="size-18 rounded-md object-cover" />
                    <div className="flex flex-col flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{item.title}</h3>
                      <p className="text-sm text-gray-500">{formatPrice(item.price, item.discountPercentage)}</p>
                    </div>
                    <div className="flex items-center gap-4 border border-gray-200 rounded-md p-2">
                      <button
                        type="button"
                        className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <MinusIcon className="size-4" />
                      </button>
                      <p className="text-sm font-medium text-gray-900">{item.quantity}</p>
                      <button
                        type="button"
                        className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <PlusIcon className="size-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
                    onClick={() => removeItem(item.id)}
                  >
                    <TrashIcon className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-sm font-medium text-gray-900">${total.toFixed(2)}</p>
          </div>

          {items.length > 0 && (
            <Link
              href="/checkout"
              onClick={() => onOpenChange(false)}
              className="text-sm/6 font-semibold text-gray-900 cursor-pointer flex items-center gap-2 justify-center bg-black text-white rounded-md p-2"
            >
              Checkout
              <CheckIcon className="size-4" />
            </Link>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
