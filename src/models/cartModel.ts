import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICartItem {
    _id: any;
    productId: mongoose.Types.ObjectId;
    quantity: number;
    size?: string;
    color?: string;
    image?: string;
}

export interface ICart extends Document {
    userId: mongoose.Types.ObjectId;
    items: ICartItem[];
}

const CartItemSchema = new Schema<ICartItem>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    quantity: {
        type: Number,
        default: 1,
    },

    size: String,
    color: String,
    image: String,
});

const CartSchema = new Schema<ICart>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        items: [CartItemSchema],
    },
    {
        timestamps: true,
    }
);

const Cart: Model<ICart> =
    mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);

export default Cart;