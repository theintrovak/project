"use client"


const ProductCard = ({ name, price, image, slug }: any) => (
    <div className="group relative flex flex-col w-full  overflow-hidden rounded-lg border border-gray-200 bg-white"
        onClick={() => window.location.href = `/product/${slug}`}
    >
        <div className="aspect-h-4 aspect-w-3 h-32 w-full bg-gray-100">
            <img
                src={image}
                alt={name}
                className="h-full w-full mx-auto  object-cover object-center"
            />
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-4">
            <h3 className="text-sm font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-700">Rs. {price}</p>
        </div>
    </div>
)


export default function AllProducts(porducts: any) {
    return (
        <div className="mx-auto max-w-2xl px-2 py-4 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight dark:text-white text-gray-950">All Products</h2>
            <div className="mt-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {porducts.products.map((product: any) => (
                    <ProductCard key={product._id}
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
