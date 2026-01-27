"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Props = {
    product: any;
};

export default function AddToCartSection({ product }: Props) {
    const { addToCart } = useCart();

    const [selectedColor, setSelectedColor] = useState(
        product.colors?.[0] || ""
    );
    const [selectedSize, setSelectedSize] = useState(
        product.sizes?.[0] || ""
    );
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="mt-6 space-y-4">
            {/* COLORS */}
            {product.colors?.length > 0 && (
                <div>
                    <p className="font-medium mb-1">Color</p>
                    <div className="flex gap-2">
                        {product.colors.map((color: string) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`px-3 py-1 border rounded ${selectedColor === color
                                    ? "bg-black text-white"
                                    : ""
                                    }`}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* SIZES */}
            {product.sizes?.length > 0 && (
                <div>
                    <p className="font-medium mb-1">Size</p>
                    <div className="flex gap-2">
                        {product.sizes.map((size: string) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-3 py-1 border rounded ${selectedSize === size
                                    ? "bg-black text-white"
                                    : ""
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* QUANTITY */}
            <div>
                <p className="font-medium mb-1">Quantity</p>
                <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border px-3 py-2 w-24"
                />
            </div>

            {/* ADD TO CART BUTTON */}
            <button
                onClick={() =>
                    addToCart({
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        slug: product.slug,
                        color: selectedColor,
                        size: selectedSize,
                        image: product.image,
                        quantity,
                    })
                }
                className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
            >
                Add to Cart
            </button>
        </div>
    );
}
