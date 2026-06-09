export function getDiscountedPrice(price: number, discountPercentage?: number) {
  if (!discountPercentage) return price
  return price - (price * discountPercentage) / 100
}

export function formatPrice(price: number, discountPercentage?: number) {
  return `$${getDiscountedPrice(price, discountPercentage).toFixed(2)}`
}
