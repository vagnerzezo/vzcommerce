'use client'

import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import type { Product } from '@/features/products/types/product'

type ShowcaseSliderProps = {
  products: Product[]
}

export default function ShowcaseSlider({ products }: ShowcaseSliderProps) {
  return (
    <Swiper
      className="mt-6"
      spaceBetween={16}
      slidesPerView={2}
      breakpoints={{
        640: { spaceBetween: 24 },
        768: { slidesPerView: 4, spaceBetween: 32 },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div className="group relative">
            <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
              <img
                alt={product.title}
                src={product.thumbnail}
                className="size-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
              <Link href={`/products/${product.id}`}>
                <span className="absolute inset-0" />
                {product.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-900">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
