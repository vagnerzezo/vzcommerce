
import Link from 'next/link'
import { StarIcon } from '@heroicons/react/20/solid'
import { CurrencyDollarIcon, GlobeAmericasIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import type { Product } from '@/features/products/types/product'
import AddToCartButton from '@/features/cart/components/add-to-cart-button'
import Zoom from './zoom'

type ProductDetailProps = {
  product: Product
}

const policies = [
  { key: 'shippingInformation' as const, name: 'Entrega', icon: GlobeAmericasIcon },
  { key: 'warrantyInformation' as const, name: 'Garantia', icon: CurrencyDollarIcon },
  { key: 'returnPolicy' as const, name: 'Devolução', icon: ArrowPathIcon },
]

function formatPrice(price: number, discountPercentage?: number) {
  if (!discountPercentage) {
    return `$${price.toFixed(2)}`
  }

  const discounted = price - (price * discountPercentage) / 100
  return `$${discounted.toFixed(2)}`
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const reviewCount = product.reviews?.length ?? 0
  const galleryImages = product.images.length > 0 ? product.images : [product.thumbnail]


  return (
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <Link href="/" className="text-sm font-medium text-gray-900 hover:text-gray-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                  <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                </svg>
                <Link href={`/category/${product.category}`} className="ml-4 text-sm font-medium text-gray-900 capitalize hover:text-gray-600">
                  {product.category.replace('-', ' ')}
                </Link>
              </div>
            </li>
            <li className="text-sm">
              <div className="flex items-center">
                <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                  <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                </svg>
                <span aria-current="page" className="ml-4 font-medium text-gray-500">
                  {product.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between gap-4">
                <h1 className="text-xl font-medium text-gray-900">{product.title}</h1>
                <div className="text-right">
                  <p className="text-xl font-medium text-gray-900">
                    {formatPrice(product.price, product.discountPercentage)}
                  </p>
                  {product.discountPercentage > 0 && ( <p className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</p>)}
                </div>
              </div>
              {product.brand && ( <p className="mt-2 text-sm text-gray-500">{product.brand}</p>)}
              <div className="mt-4">
                <h2 className="sr-only">Avaliações</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {product.rating.toFixed(1)}
                    <span className="sr-only"> de 5 estrelas</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => ( <StarIcon key={rating} aria-hidden="true" className={cn( product.rating > rating ? 'text-yellow-400' : 'text-gray-200', 'size-5 shrink-0', )}/>))}
                  </div>
                  {reviewCount > 0 && ( <> <div aria-hidden="true" className="ml-4 text-sm text-gray-300"> · </div> <p className="ml-4 text-sm text-gray-500">{reviewCount} avaliações</p> </>)}
                </div>
              </div>
            </div>

            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Imagens</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                {galleryImages.map((image, index) => (
                  <Zoom key={image} image={image} alt={`${product.title} - imagem ${index + 1}`} className={cn( index === 0 ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',)}/>
                ))}
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
              <div>
                <div>
                  <h2 className="text-sm font-medium text-gray-900">Disponibilidade</h2>
                  <p className="mt-2 text-sm text-gray-500"> {product.stock > 0 ? `${product.stock} unidades em estoque` : 'Produto indisponível'}</p>
                </div>

                <AddToCartButton product={product} />
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Descrição</h2>
                <p className="mt-4 text-sm/6 text-gray-500">{product.description}</p>
              </div>

              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="sr-only">
                  Políticas
                </h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {policies.map((policy) => {
                    const description = product[policy.key]
                    if (!description) return null

                    return (
                      <div key={policy.name} className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                        <dt>
                          <policy.icon aria-hidden="true" className="mx-auto size-6 shrink-0 text-gray-400" />
                          <span className="mt-4 text-sm font-medium text-gray-900">{policy.name}</span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500">{description}</dd>
                      </div>
                    )
                  })}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
