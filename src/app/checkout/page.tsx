'use client'
import Link from 'next/link'
import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';
import Cards, { type Focused } from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { CheckCircleIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import { useCart } from '@/features/cart/cart-context'
import { formatPrice, getDiscountedPrice } from '@/features/cart/utils/format-price'
import { OrderConfirmModal } from './confirmed'

type CardState = {
  number: string
  expiry: string
  cvc: string
  name: string
  focus: Focused
}

const deliveryMethods = [
  { id: 1, title: 'Standard', turnaround: '4–10 business days', price: 5 },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: 16 },
]

const taxa = 0.08625

const limit_number = {
  numberDigits: 16,
  numberDisplay: 19,
  expiry: 5,
  cvc: 4,
  name: 26,
} as const

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, limit_number.numberDigits)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function sanitizeCardField(name: keyof typeof limit_number, value: string): string {
  switch (name) {
    case 'numberDigits':
      return formatCardNumber(value)
    case 'expiry': {
      const digits = value.replace(/\D/g, '').slice(0, 4)
      if (digits.length <= 2) return digits
      return `${digits.slice(0, 2)}/${digits.slice(2)}`
    }
    case 'cvc':
      return value.replace(/\D/g, '').slice(0, limit_number.cvc)
    case 'name':
      return value.slice(0, limit_number.name)
    default:
      return value
  }
}

export default function CheckoutPage() {
  const { items, total, removeItem, updateQuantity } = useCart()
  const [selectedDeliveryId, setSelectedDeliveryId] = useState(deliveryMethods[0].id)

  const [cardState, setCardState] = useState<CardState>({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const selectedDelivery = deliveryMethods.find((m) => m.id === selectedDeliveryId) ?? deliveryMethods[0]
  const shipping = items.length > 0 ? selectedDelivery.price : 0
  const taxes = total * taxa
  const orderTotal = total + shipping + taxes

  const handleCardInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    const field = name === 'number' ? 'numberDigits' : name

    if (field in limit_number) {
      setCardState((prev) => ({
        ...prev,
        [name]: sanitizeCardField(field as keyof typeof limit_number, value),
      }))
    }
  };

  const handleCardInputFocus = (evt: FocusEvent<HTMLInputElement>) => {
    setCardState((prev) => ({
      ...prev,
      focus: evt.target.name as Focused,
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (items.length === 0) return
    setConfirmModalOpen(true)
  };

  return (
    <div className="bg-gray-50">

      <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Contact information</h2>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 items-center mt-4">
                  <div>
                    <label htmlFor="email-address" className="block text-sm/6 font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email-address"
                        name="email-address"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-700">
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        autoComplete="tel"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-700">
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-700">
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm/6 font-medium text-gray-700">
                      Address
                    </label>
                    <div className="mt-2">
                      <input
                        id="address"
                        name="address"
                        type="text"
                        autoComplete="street-address"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="apartment" className="block text-sm/6 font-medium text-gray-700">
                      Apartment, suite, etc.
                    </label>
                    <div className="mt-2">
                      <input
                        id="apartment"
                        name="apartment"
                        type="text"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm/6 font-medium text-gray-700">
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm/6 font-medium text-gray-700">
                      Country
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 sm:size-4"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="region" className="block text-sm/6 font-medium text-gray-700">
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        id="region"
                        name="region"
                        type="text"
                        autoComplete="address-level1"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-700">
                      Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        id="postal-code"
                        name="postal-code"
                        type="text"
                        autoComplete="postal-code"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Delivery method</h2>

                <fieldset aria-label="Delivery method" className="mt-4">
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {deliveryMethods.map((deliveryMethod) => (
                      <label
                        key={deliveryMethod.id}
                        aria-label={deliveryMethod.title}
                        aria-description={`${deliveryMethod.turnaround} for ${deliveryMethod.price}`}
                        className="group relative flex rounded-lg border border-gray-300 bg-white p-4 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-indigo-600 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                      >
                        <input
                          value={deliveryMethod.id}
                          checked={selectedDeliveryId === deliveryMethod.id}
                          onChange={() => setSelectedDeliveryId(deliveryMethod.id)}
                          name="delivery-method"
                          type="radio"
                          className="absolute inset-0 appearance-none focus:outline-none"
                        />
                        <div className="flex-1">
                          <span className="block text-sm font-medium text-gray-900">{deliveryMethod.title}</span>
                          <span className="mt-1 block text-sm text-gray-500">{deliveryMethod.turnaround}</span>
                          <span className="mt-6 block text-sm font-medium text-gray-900">{formatPrice(deliveryMethod.price)}</span>
                        </div>
                        <CheckCircleIcon
                          aria-hidden="true"
                          className="invisible size-5 text-indigo-600 group-has-checked:visible"
                        />
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <div className="mt-6 mb-6">
                  <Cards
                    number={cardState.number}
                    expiry={cardState.expiry}
                    cvc={cardState.cvc}
                    name={cardState.name}
                    focused={cardState.focus}
                  />
                </div>

                <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                  <div className="col-span-2">
                    <label htmlFor="card-number" className="block text-sm/6 font-medium text-gray-700">
                      Card number
                    </label>
                    <div className="mt-2">
                      <input
                        id="card-number"
                        name="number"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        maxLength={limit_number.numberDisplay}
                        placeholder="0000 0000 0000 0000"
                        value={cardState.number}
                        onChange={handleCardInputChange}
                        onFocus={handleCardInputFocus}
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="name-on-card" className="block text-sm/6 font-medium text-gray-700">
                      Name on card
                    </label>
                    <div className="mt-2">
                      <input
                        id="name-on-card"
                        name="name"
                        type="text"
                        autoComplete="cc-name"
                        maxLength={limit_number.name}
                        value={cardState.name}
                        onChange={handleCardInputChange}
                        onFocus={handleCardInputFocus}
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label htmlFor="expiration-date" className="block text-sm/6 font-medium text-gray-700">
                      Expiration date (MM/YY)
                    </label>
                    <div className="mt-2">
                      <input
                        id="expiration-date"
                        name="expiry"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        maxLength={limit_number.expiry}
                        placeholder="MM/YY"
                        value={cardState.expiry}
                        onChange={handleCardInputChange}
                        onFocus={handleCardInputFocus}
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cvc" className="block text-sm/6 font-medium text-gray-700">
                      CVC
                    </label>
                    <div className="mt-2">
                      <input
                        id="cvc"
                        name="cvc"
                        type="text"
                        inputMode="numeric"
                        autoComplete="csc"
                        maxLength={limit_number.cvc}
                        placeholder="123"
                        value={cardState.cvc}
                        onChange={handleCardInputChange}
                        onFocus={handleCardInputFocus}
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-xs">
                <h3 className="sr-only">Items in your cart</h3>

                {items.length === 0 ? (
                  <div className="px-4 py-12 text-center sm:px-6">
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
                    <ul role="list" className="divide-y divide-gray-200">
                      {items.map((item) => (
                        <li key={item.id} className="flex px-4 py-6 sm:px-6">
                          <div className="shrink-0">
                            <img alt={item.title} src={item.thumbnail} className="w-20 rounded-md object-cover" />
                          </div>

                          <div className="ml-6 flex flex-1 flex-col">
                            <div className="flex">
                              <div className="min-w-0 flex-1">
                                <h4 className="text-sm">
                                  <Link href={`/products/${item.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                                    {item.title}
                                  </Link>
                                </h4>
                                {item.discountPercentage ? (
                                  <p className="mt-1 text-sm text-green-600">{item.discountPercentage}% off</p>
                                ) : null}
                              </div>

                              <div className="ml-4 flow-root shrink-0">
                                <button
                                  type="button"
                                  onClick={() => removeItem(item.id)}
                                  className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                                >
                                  <span className="sr-only">Remove</span>
                                  <TrashIcon aria-hidden="true" className="size-5" />
                                </button>
                              </div>
                            </div>

                            <div className="flex flex-1 items-end justify-between pt-2">
                              <p className="mt-1 text-sm font-medium text-gray-900">
                                {formatPrice(
                                  getDiscountedPrice(item.price, item.discountPercentage) * item.quantity
                                )}
                              </p>

                              <div className="ml-4 grid grid-cols-1">
                                <select
                                  id={`quantity-${item.id}`}
                                  name="quantity"
                                  aria-label="Quantity"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                  {[1, 2, 3, 4, 5, 6, 7, 8].map((qty) => (
                                    <option key={qty} value={qty}>{qty}</option>
                                  ))}
                                </select>
                                <ChevronDownIcon
                                  aria-hidden="true"
                                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 sm:size-4"
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">{formatPrice(total)}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-sm">Shipping</dt>
                        <dd className="text-sm font-medium text-gray-900">{formatPrice(shipping)}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-sm">Taxes</dt>
                        <dd className="text-sm font-medium text-gray-900">{formatPrice(taxes)}</dd>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                        <dt className="text-base font-medium">Total</dt>
                        <dd className="text-base font-medium text-gray-900">{formatPrice(orderTotal)}</dd>
                      </div>
                    </dl>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <button
                        type="submit"
                        className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
                      >
                        Confirm order
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>

      <OrderConfirmModal open={confirmModalOpen} onOpenChange={setConfirmModalOpen} />
    </div>
  )
}
