"use client"
import { useCart } from "@/context/CartContext"

import { useRouter } from "next/navigation"



export default function CartPage() {

    const router = useRouter();
    const { cart, removeFromCart, clearCart, getTotalPrice, getTotalItems, updateQuantity } = useCart()
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);



    if (cart.length === 0) return <div className="text-center mt-6"> <h2 className="text-2xl text-red-600 m-40 font-bold">Your Cart Is Empty</h2><button className="border py-2 px-4 rounded bg-green-600 text-white" onClick={() => router.push("/")} >Continue Shopping</button></div>
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.map((item) => (
                <div
                    key={item._id}
                    className="flex justify-between items-center border-b py-4"
                >
                    <div>
                        <img className="h-16 w-20" src={item.image?.[0]} alt={item.slug} />
                    </div>
                    <div>
                        <h2>{item.name}</h2>
                        <p>${item.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() =>
                                updateQuantity(item._id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                        >
                            -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                            onClick={() =>
                                updateQuantity(item._id, item.quantity + 1)
                            }
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <div className="text-right mt-6">
                <h2 className="text-xl font-semibold">
                    Total: ${total.toFixed(2)}
                </h2>
            </div>
        </div>
    )
}