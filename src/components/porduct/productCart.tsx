import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: any) {
    return (
        <Link
            href={`/product/${product.slug}`}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition"
        >
            <div className="relative h-56">
                <Image
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-3">
                <h3 className="font-semibold truncate">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                    Rs. {product.price}
                </p>
            </div>
        </Link>
    );
}
