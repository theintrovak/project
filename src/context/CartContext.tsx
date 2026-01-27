"use client"
import { createContext, useContext, useState, useEffect, use } from "react";
import { useAuth } from "./AuthContext";

type cartItems = {
    _id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    color?: string;
    size?: string;
    slug: string;
}
type CartContextType = {
    cart: cartItems[];
    addToCart: (item: cartItems) => void;
    removeFromCart: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    increaseQuantity: (id: string) => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
    clearCart: () => void;
}
const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState<cartItems[]>([]);

    useEffect(() => {
        if (!user) {
            setCart([]);
            return;
        }
        const storedCart = localStorage.getItem(`cart-${user.id}`);
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, [user])
    useEffect(() => {
        if (user) {
            localStorage.setItem(`cart-${user.id}`, JSON.stringify(cart));
        }
    }, [cart, user])

    const addToCart = (item: cartItems) => {
        if (!user) {
            alert("Please login to add items to cart");
            return;
        }
        setCart((prev) => {
            const existingItem = prev.find(
                (p) => p._id === item._id && p.color === item.color && p.size === item.size
            );
            if (existingItem) {
                return prev.map((p) => p === existingItem
                    ? { ...p, quantity: p.quantity + 1 }
                    : p)
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    }

    const removeFromCart = (id: string) => {
        if (!user) return;
        setCart((prev) => prev.filter((p) => p._id !== id));
    }
    const clearCart = () => {
        if (!user) return;
        setCart([]);
    }
}
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}


