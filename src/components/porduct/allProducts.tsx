"use client"



const ProductCard = ({ name, price, image, slug }: any) => (
    <div
        className="group relative  cursor-pointer flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg w-full dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-neutral-700 dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
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


export default function AllProducts(porducts: any) {

    return (
        <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
            <h2 className="text-xl font-bold tracking-tight text-neutral-950 sm:text-2xl lg:text-3xl mb-2 dark:text-white">
                All Products
            </h2>
            <div className="
grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-7 xl:grid-cols-4 2xl:grid-cols-5
">
                {porducts.products.map((product: any) => (
                    <ProductCard
                        key={product._id}
                        name={product.name}
                        price={product.price}
                        slug={product.slug}
                        // Access the first image from the array here
                        image={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'}
                    />
                ))}
            </div>
        </div>
    )

}
