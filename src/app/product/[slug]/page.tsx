import Image from "next/image";
import AddToCartSection from "@/components/porduct/addToCartSection";
import axios from "axios";
async function getProduct(slug: string) {

    try {
        const res = await axios.get(
            `${process.env.NEXTAUTH_URL}/api/product/${slug}`,
            {
                // equivalent of fetch({ cache: "no-store" })
                headers: {
                    "Cache-Control": "no-store",
                },
            }
        );

        return res.data

    } catch (error) {
        throw error
        return null
    }

}
export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProduct(slug);
    if (!product) {
        return (
            <section className="flex min-h-[60vh] items-center justify-center px-6 py-20">
                <p className="text-base font-medium text-neutral-500 dark:text-neutral-400">
                    Product not found
                </p>
            </section>
        );
    }

    return (
        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-2 md:gap-12 lg:gap-16 lg:px-8">
            {/* IMAGE GALLERY */}
            <div className="space-y-4">
                <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-sm sm:h-96 lg:h-[28rem] dark:border-neutral-800 dark:bg-neutral-900">
                    <Image
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex gap-3 overflow-x-auto pb-1">
                    {product.images?.map((img: string) => (
                        <div
                            key={img}
                            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 transition-all duration-200 hover:border-neutral-400 sm:h-20 sm:w-20 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600"
                        >
                            <Image
                                src={img}
                                alt=""
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl lg:text-4xl dark:text-white">
                    {product.name}
                </h1>
                <p className="mt-3 text-lg font-semibold text-neutral-500 sm:text-xl dark:text-amber-400">
                    Rs. {product.price}
                </p>

                <p className="mt-5 max-w-prose text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
                    {product.description}
                </p>

                <div className="mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                    <AddToCartSection product={product} />
                </div>
            </div>
        </section>
    );
}