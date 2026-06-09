"use client"
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer"
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"


type SearchDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}


export default function SearchDrawer({ open, onOpenChange }: SearchDrawerProps) {

  return (
    <Drawer direction="top" open={open} onOpenChange={onOpenChange} >
      <DrawerContent className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 p-6">
          <div className="flex justify-between items-center">
            <DrawerTitle className="text-2xl font-semibold tracking-tight text-balance text-gray-900 sm:text-2xl">
              Search
            </DrawerTitle>
            <button type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer" onClick={() => onOpenChange(false)}>
              <XMarkIcon className="size-6" />
            </button>
          </div>
          <div className="flex items-center gap-2 relative">
            <input type="text" placeholder="Search" className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            <button type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer absolute right-4 top-1">
              <MagnifyingGlassIcon className="size-6" />
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}