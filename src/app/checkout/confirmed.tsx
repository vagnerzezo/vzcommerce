'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useCart } from '@/features/cart/cart-context'

type OrderConfirmModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderConfirmModal({ open, onOpenChange }: OrderConfirmModalProps) {
  const [status, setStatus] = useState<'loading' | 'success'>('loading')
  const { clearCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (!open) {
      setStatus('loading')
      return
    }

    const timer = setTimeout(() => setStatus('success'), 5000)
    return () => clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (status !== 'success') return

    const timer = setTimeout(() => {
      onOpenChange(false)
      router.push('/')
      clearCart()
    }, 5000)

    return () => clearTimeout(timer)
  }, [status, clearCart, onOpenChange, router])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => status === 'success' && onOpenChange(false)}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirm-title"
        className="relative z-10 w-full max-w-sm rounded-lg bg-white p-8 shadow-xl"
      >
        {status === 'loading' ? (
          <div className="flex flex-col items-center text-center">
            <div
              className="size-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"
              aria-hidden="true"
            />
            <p id="order-confirm-title" className="mt-6 text-lg font-medium text-gray-900">
              Confirming your order...
            </p>
            <p className="mt-2 text-sm text-gray-500">Please wait a moment</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <CheckCircleIcon className="size-16 text-green-500" aria-hidden="true" />
            <p id="order-confirm-title" className="mt-6 text-lg font-medium text-gray-900">
              Order confirmed!
            </p>
            <p className="mt-2 text-sm text-gray-500">Your order has been placed successfully.</p>
            <Link
              href="/"
              onClick={() => {
                clearCart()
                onOpenChange(false)
              }}
              className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Back to store
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
