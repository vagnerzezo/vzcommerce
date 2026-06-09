'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import LoginDrawer from '@/features/auth/login-drawer'
import SearchDrawer from '@/features/search/search-drawer'
import CartDrawer from '@/features/cart/cart-drawer'
import { useCart } from '@/features/cart/cart-context'

export type Category = {
  slug: string
  name: string
  url: string
}

type HeaderClientProps = {
  categories: Category[]
}


export default function HeaderClient({ categories: categoriesList }: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const categories = categoriesList.slice(6, 11)
  const [loginOpen, setLoginOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { totalQuantity, cartOpen, setCartOpen } = useCart()
  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">vz commerce</span>
            <img alt="" src="/img/logo-black.svg" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            {categories.map((category) => (
              <Link key={`/category/${category.slug}`} href={`/category/${category.slug}`} className="text-sm/6 uppercase text-gray-900">
                {category.name}
              </Link>
            ))}

        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-4">
          <button type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer" onClick={() => setSearchOpen(true)}>
            <MagnifyingGlassIcon aria-hidden="true" className="size-6 flex-none" />
          </button> 
          <button type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer" onClick={() => setLoginOpen(true)}>
            <UserIcon aria-hidden="true" className="size-6 flex-none" />
          </button>
          <button type="button" className="relative text-sm/6 font-semibold text-gray-900 cursor-pointer" onClick={() => setCartOpen(true)}>
            <ShoppingBagIcon aria-hidden="true" className="size-6 flex-none" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-black text-xs font-medium text-white">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">vz commerce</span>
              <img alt="Logo" src="/img/logo-black.svg" className="h-8 w-auto" />
            </Link>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 flex flex-col gap-2">
                <div className="flex flex-col gap-6 -mx-3 rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  {categories.map((category) => (
                    <Link key={`/category/${category.slug}`} href={`/category/${category.slug}`} className="text-sm/6 uppercase text-gray-900">
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="py-6">
                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      
      <LoginDrawer open={loginOpen} onOpenChange={setLoginOpen} />
      <SearchDrawer open={searchOpen} onOpenChange={setSearchOpen} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  )
}
