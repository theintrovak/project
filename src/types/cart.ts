export interface AddToCartBody {
    _id: string;
    quantity: number;
    size?: string;
    color?: string;
    image?: string;
}
export interface CartProduct {
    _id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
}

export interface CartItem {
    _id: string;
    productId: CartProduct;
    quantity: number;
    size?: string;
    color?: string;
}

export interface Cart {
    _id: string;
    userId: string;
    items: CartItem[];
}