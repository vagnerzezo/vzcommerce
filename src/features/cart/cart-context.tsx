'use client'

import { createContext, useContext, useReducer, useEffect, useRef, useState } from 'react'
import type { Product } from '@/features/products/types/product'
import type { CartItem } from './types/cart'
import { getDiscountedPrice } from './utils/format-price'

type State = {
  items: CartItem[]
}

type Action =
  | { type: 'ADD'; product: Product; quantity?: number }
  | { type: 'REMOVE'; productId: number }
  | { type: 'UPDATE_QTY'; productId: number; quantity: number }
  | { type: 'HYDRATE'; items: CartItem[] }
  | { type: 'CLEAR' }

type CartContextValue = {
  items: CartItem[]
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  openCartTemporarily: (ms?: number) => void
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  totalQuantity: number
  total: number
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'cart'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.items }

    case 'ADD': {
      const qty = action.quantity ?? 1
      const existing = state.items.find((item) => item.id === action.product.id)

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + qty }
              : item
          ),
        }
      }

      return {
        items: [
          ...state.items,
          {
            id: action.product.id,
            title: action.product.title,
            price: action.product.price,
            quantity: qty,
            thumbnail: action.product.thumbnail,
            discountPercentage: action.product.discountPercentage,
          },
        ],
      }
    }

    case 'REMOVE':
      return {
        items: state.items.filter((item) => item.id !== action.productId),
      }

    case 'UPDATE_QTY': {
      if (action.quantity <= 0) {
        return {
          items: state.items.filter((item) => item.id !== action.productId),
        }
      }

      return {
        items: state.items.map((item) =>
          item.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      }
    }

    case 'CLEAR':
      return { items: [] }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const [cartOpen, setCartOpenState] = useState(false)
  const autoCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function clearAutoClose() {
    if (autoCloseRef.current) {
      clearTimeout(autoCloseRef.current)
      autoCloseRef.current = null
    }
  }

  function setCartOpen(open: boolean) {
    clearAutoClose()
    setCartOpenState(open)
  }

  function openCartTemporarily(ms = 5000) {
    clearAutoClose()
    setCartOpenState(true)
    autoCloseRef.current = setTimeout(() => {
      setCartOpenState(false)
      autoCloseRef.current = null
    }, ms)
  }

  useEffect(() => {
    return () => clearAutoClose()
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      dispatch({ type: 'HYDRATE', items: JSON.parse(saved) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  function addItem(product: Product, quantity = 1) {
    dispatch({ type: 'ADD', product, quantity })
  }

  function removeItem(productId: number) {
    dispatch({ type: 'REMOVE', productId })
  }

  function updateQuantity(productId: number, quantity: number) {
    dispatch({ type: 'UPDATE_QTY', productId, quantity })
  }

  function clearCart() {
    dispatch({ type: 'CLEAR' })
  }

  const totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0)

  const total = state.items.reduce((acc, item) => {
    const price = getDiscountedPrice(item.price, item.discountPercentage)
    return acc + price * item.quantity
  }, 0)

  const value: CartContextValue = {
    items: state.items,
    cartOpen,
    setCartOpen,
    openCartTemporarily,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalQuantity,
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider')
  }
  return context
}
