'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Link from 'next/link';

export default function GridBanner() {

  const banners = [
    {
      image: '/grid/grid-01.png',
      alt: 'Grid banner product Nike',
      href: '/products/89',
    },
    {
      image: '/grid/grid-02.png',
      alt: 'Grid banner product Camisa',
      href: '/products/84',
    },
    {
      image: '/grid/grid-03.png',
      alt: 'Grid banner product AirPods',
      href: '/products/101',
    },
    {
      image: '/grid/grid-04.png',
      alt: 'Grid banner product Homepod',
      href: '/products/103',
    },
  ]
  return (
    <div className="mx-auto w-full md:max-w-7xl p-4">
      <Swiper spaceBetween={10} slidesPerView={4} loop={true} modules={[Autoplay]} autoplay={{ delay: 5000, disableOnInteraction: false }}>
        {banners.map((banner) => (
          <SwiperSlide key={banner.alt}>
            <Link href={banner.href}>
              <img src={banner.image} alt={banner.alt} className="w-full h-full object-cover rounded-2xl cursor-pointer" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  )
}