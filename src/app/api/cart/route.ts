import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/dbconfig";
import Cart from "@/models/cartModel";
import Product from "@/models/productModel";
import { AddToCartBody } from "@/types/cart";
import { getDataFromToken } from "@/helper/getDataFromToken";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body: AddToCartBody = await req.json();

        const {
            _id,
            quantity,
            size,
            color,
        } = body;


        const userId = await getDataFromToken();

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [],
            });


        }

        const existingItem = cart.items.find(
            (item) =>
                item.productId._id.toString() === _id &&
                item.size === size &&
                item.color === color
        );

        if (existingItem) {
            existingItem.quantity += quantity;

        } else {

            const product = await Product.findById(_id);

            if (!product) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Product does not exist",
                    },
                    {
                        status: 404,
                    }
                );
            }
            cart.items.push({
                productId: new mongoose.Types.ObjectId(_id),
                quantity,
                size,
                color,
                _id: undefined
            });
        }

        await cart.save();
        if (!cart) {
            return NextResponse.json({
                items: [],
            });
        }
        return NextResponse.json(cart);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to add cart item",
            },
            {
                status: 500,
            }
        );
    }
}
export async function GET() {
    try {
        await connectDB();

        const userId = await getDataFromToken();

        const cart = await Cart.findOne({
            userId,
        }).populate("items.productId");

        return NextResponse.json(cart);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}
export async function DELETE() {
    try {
        await connectDB();

        const userId = await getDataFromToken();

        await Cart.findOneAndDelete({
            userId,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Cart deleted successfully",
            },
            {
                status: 200,
            }
        );
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete cart",

            }, {
            status: 500
        }
        )
    }
}