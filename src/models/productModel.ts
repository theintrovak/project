import mongoose, { Schema, Model, models } from "mongoose";
export interface ProductDocument extends mongoose.Document {
    name: string;
    description: string;
    slug: string;
    price: number;
    category: string;
    images: string[];
    sizes: string[];
    stock: number;
    color: string;
    isFeatured: boolean;
}
const productSchema = new Schema<ProductDocument>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true,
        }
    ],
    sizes: [
        {
            type: String,
            required: true,
        }
    ],
    stock: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
}
    , {
        timestamps: true
    }
)
const Product: Model<ProductDocument> =
    models.Product || mongoose.model<ProductDocument>("Product", productSchema);
export default Product