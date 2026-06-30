
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
        return <p>Product not found</p>;
    }

    return (
        <section className="p-6 grid md:grid-cols-2 gap-10">
            {/* IMAGE GALLERY */}
            <div className="space-y-4">
                <div className="relative h-96 border rounded-xl">
                    <Image
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-xl"
                    />
                </div>

                <div className="flex gap-3">
                    {product.images?.map((img: string) => (
                        <div key={img} className="relative h-20 w-20 border rounded">
                            <Image
                                src={img}
                                alt=""
                                fill
                                className="object-cover rounded"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* PRODUCT INFO */}
            <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-xl text-gray-600 mt-2">
                    Rs. {product.price}
                </p>

                <p className="mt-4 text-gray-700">
                    {product.description}
                </p>

                <AddToCartSection product={product} />
            </div>
        </section>
    );
}


