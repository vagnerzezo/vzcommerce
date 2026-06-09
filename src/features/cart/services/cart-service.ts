import { getApiBaseUrl } from '@/lib/env'

const api = getApiBaseUrl()

type AddCartPayload = {
  userId: number
  products: { id: number; quantity: number }[]
}

export async function addCart(payload: AddCartPayload) {
  const res = await fetch(`${api}/carts/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  if (!res.ok) throw new Error('Erro ao adicionar ao carrinho')
  return res.json()
}

export async function updateCart(
  cartId: number,
  products: { id: number; quantity: number }[],
  merge = true
) {
  const res = await fetch(`${api}/carts/${cartId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ merge, products }),
    cache: 'no-store',
  })

  if (!res.ok) throw new Error('Erro ao atualizar carrinho')
  return res.json()
}
