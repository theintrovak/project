"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";
import axios from "axios";
type cartItems = {
    _id: string;
    quantity: number;
    size?: string;
    color?: string;

    productId: {
        _id: string;
        name: string;
        slug: string;
        price: number;
        images: string[];
    };
};
type cartItemsforadd = {
    _id: string;
    quantity: number;
    color?: string;
    size?: string;
}
type CartContextType = {
    cart: cartItems[];
    addToCart: (item: cartItemsforadd) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
    clearCart: () => void;
    loadCart: () => Promise<void>;
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
        loadCart();


    }, [user]);

    const addToCart = async (item: cartItems) => {
        try {
            if (!user) { toast.error("Please login to add item to cart"); return; }
            const { data } = await axios.post("/api/cart", item);
            setCart(data.cart ?? []);
            loadCart();
            toast.success("Item added to cart");
        } catch (error) {
            console.log(error);
        }
    }


    const loadCart = async () => {
        try {
            const { data } = await axios.get("/api/cart");
            setCart(data?.items ?? []);
        } catch (error) {
            console.error(error);
        }
    };
    const removeItem = async (itemId: string) => {
        try {
            await axios.delete(`/api/cart/${itemId}`);

            loadCart();
            toast.success("Item removed from cart");
        } catch (error) {
            console.error(error);
        }
    };
    const clearCart = () => {
        axios.delete("/api/cart").then(() => {
            setCart([]);
            toast.success("Cart cleared");
        })

    }
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.productId.price * item.quantity, 0);
    }

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }
    const updateQuantity = (itemId: string, quantity: number) => {
        axios.patch(`/api/cart/${itemId}`, { quantity, }).then(() => {
            loadCart();
            toast.success("Item quantity updated");
        })

    }
    return (
        <CartContext.Provider value={{ cart, loadCart, removeItem, clearCart, addToCart, getTotalPrice, getTotalItems, updateQuantity }}>
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