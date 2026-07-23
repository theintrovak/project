"use client"
import { Marquee } from '../ui/marquee'


const ProductCard = ({ name, price, image, slug }: any) => (
    <div
        className="group relative flex w-30 shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg sm:w-32 md:w-36 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-neutral-700 dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
        onClick={() => window.location.href = `/product/${slug}`}
    >
        <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <img
                src={image}
                alt={name}
                className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-black/30" />
        </div>
        <div className="flex flex-1 flex-col gap-0.5 p-2.5">
            <h3 className="truncate text-xs font-medium text-neutral-900 dark:text-neutral-100">
                {name}
            </h3>
            <p className="text-xs font-semibold text-neutral-500 dark:text-amber-400">
                Rs. {price}
            </p>
        </div>
    </div>
)

export default function FeaturedProduct(products: any) {

    return (
        <div className="mx-auto max-w-2xl px-2 py-2 sm:px-2 sm:py-2  lg:max-w-7xl lg:px-8">
            <div className=" flex items-end justify-between ">
                <h2 className="text-xl font-bold tracking-tight text-neutral-950 sm:text-xl lg:text-2xl dark:text-white">
                    Featured Products
                </h2>
                <span className="hidden text-xs text-neutral-400 sm:block dark:text-neutral-500">
                    Hover to pause
                </span>
            </div>

            <Marquee reverse className="[--duration:25s] gap-4" pauseOnHover>
                {products.products.map((product) => (
                    <ProductCard
                        key={product._id}
                        name={product.name}
                        price={product.price}
                        slug={product.slug}
                        // Access the first image from the array here
                        image={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'}
                    />
                ))}
            </Marquee>
        </div>
    )
}