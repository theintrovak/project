import mongoose from "mongoose";

export interface IOrderItem {
    productId: mongoose.Types.ObjectId;
    name: string;
    slug: string;
    image: string;
    quantity: number;
    size?: string;
    color?: string;
    unitPrice: number;
    totalPrice: number;
}
export interface IShippingAddress {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
export interface IOrderPricing {
    subtotal: number;
    shippingCharge: number;
    tax: number;
    discount: number;
    totalAmount: number;
}
export interface IPaymentDetails {
    paymentMethod: "COD" | "UPI";
    paymentStatus:
    | "Pending"
    | "Paid"
    | "Failed"
    | "Refunded";
    transactionId?: string;
    paidAt?: Date;
}
export interface ICouponDetails {
    couponCode?: string;
    discount: number;
}
export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    orderItems: IOrderItem[];
    shippingAddress: IShippingAddress;
    pricing: IOrderPricing;
    payment: IPaymentDetails;
    coupon?: ICouponDetails;
    orderStatus:
    | "Pending"
    | "Confirmed"
    | "Packed"
    | "Shipped"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled"
    | "Returned";
    placedAt: Date;
    deliveredAt?: Date;
    cancelledAt?: Date;
    returnedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            name: { type: String, required: true },
            slug: { type: String, required: true },
            image: { type: String, required: true },
            quantity: { type: Number, required: true },
            size: { type: String },
            color: { type: String },
            unitPrice: { type: Number, required: true },
            totalPrice: { type: Number, required: true },
        },
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    pricing: {
        subtotal: { type: Number, required: true },
        shippingCharge: { type: Number, required: true },
        tax: { type: Number, required: true },
        discount: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
    },
    payment: {
        paymentMethod: { type: String, required: true },
        paymentStatus: { type: String, default: "Paid" },
        transactionId: { type: String },
        paidAt: { type: Date },
    },
    coupon: {
        couponCode: { type: String },
        discount: { type: Number, required: true },
    },
    orderStatus: { type: String, default: "Confirmed" },
    deliveredAt: { type: Date },
    cancelledAt: { type: Date },
    returnedAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model<IOrder>("Order", orderSchema);