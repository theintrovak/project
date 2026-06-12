"use client"
import { createContext, useContext, useState, useEffect, use } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { totalmem } from "os";
import { styleText } from "util";
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
    updateQuantity: (id: string, quantity: number) => void;
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
            toast.error("Please login to add items to cart");
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
        toast.success(`${item.name} added to cart`);
    }
    const removeFromCart = (id: string) => {
        if (!user) return;
        setCart((prev) => prev.filter((p) => p._id !== id));
        toast.success("Item removed from cart");
    }
    const clearCart = () => {
        if (!user) return;
        setCart([]);
        toast.success("Cart cleared");
    }
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }
    const updateQuantity = (id: string, quantity: number) => {
        if (!user) return;
        setCart((prev) => prev.map((p) => p._id === id ? { ...p, quantity } : p));
    }
    return (
        <CartContext.Provider value={{ cart, removeFromCart, clearCart, addToCart, getTotalPrice, getTotalItems, updateQuantity }}>
            {children}
        </CartContext.Provider>
    )
}
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}