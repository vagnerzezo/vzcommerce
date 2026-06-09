export type CartItem = {
  id: number
  title: string
  price: number
  quantity: number
  thumbnail: string
  discountPercentage?: number
}

export type Cart = {
  products: CartItem[]
  totalQuantity: number
  total: number
}