"use client"
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer"
import { XMarkIcon } from "@heroicons/react/24/outline"
import Link from 'next/link'


type LoginDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}


export default function LoginDrawer({ open, onOpenChange }: LoginDrawerProps) {

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange} >
      <DrawerContent className="w-full max-w-xl">
        <div className="flex flex-col gap-4 p-6">
          <div className="flex justify-between items-center">
            <DrawerTitle className="text-2xl font-semibold tracking-tight text-balance text-gray-900 sm:text-2xl">
              Login
            </DrawerTitle>
            <button type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer" onClick={() => onOpenChange(false)}>
              <XMarkIcon className="size-6" />
            </button>
          </div>
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input id="email" name="email" type="email" required autoComplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input id="password" name="password" type="password" required autoComplete="current-password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="flex h-6 shrink-0 items-center">
                  <div className="group grid size-4 grid-cols-1">
                    <input id="remember-me" name="remember-me" type="checkbox" className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                    <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" >
                      <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-checked:opacity-100"/>
                      <path d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-indeterminate:opacity-100"/>
                    </svg>
                  </div>
                </div>
                <label htmlFor="remember-me" className="block text-sm/6 text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm/6">
                <Link href="#" className="font-semibold text-black hover:text-gray-600">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-pointer">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}