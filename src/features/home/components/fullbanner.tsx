'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Link from 'next/link';

export default function FullBanner() {

  const banners = [
    {
      image: '/fullbanner/fullbanner-01.png',
      alt: 'Fullbanner product Iphone 13 Pro Max',
      href: '/products/123',
    },
    {
      image: '/fullbanner/fullbanner-02.png',
      alt: 'Fullbanner product Nike Air Jordan 1 Red And Black',
      href: '/products/88',
    },
    {
      image: '/fullbanner/fullbanner-03.png',
      alt: 'Fullbanner product Macbook Pro 13 M3',
      href: '/products/78',
    },
  ]
  return (
    <div className="mx-auto w-full md:max-w-7xl p-4">
      <Swiper spaceBetween={50} slidesPerView={1} loop={true} modules={[Autoplay]} autoplay={{ delay: 5000, disableOnInteraction: false }}>
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