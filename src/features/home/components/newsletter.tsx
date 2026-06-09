export default function Example() {
  return (
    <div className="mx-auto w-full md:max-w-7xl px-4 py-16 border border-gray-200 rounded-2xl">
      <div className="flex flex-row justify-between items-center gap-4 px-6">
        <h2 className="w-1/2 text-2xl font-semibold tracking-tight text-balance text-gray-900 sm:text-2xl ">
          Stay up to date with our latest deals, exclusive offers, and new arrivals.
        </h2>
        <form className="w-1/2 lg:pt-2">
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input id="email-address" name="email" type="email" required placeholder="Enter your email" autoComplete="email" className="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
            <button type="submit" className="flex-none rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blac cursor-pointer">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
