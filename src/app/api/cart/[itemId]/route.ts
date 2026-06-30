import { NextRequest, NextResponse } from "next/server";
import Cart from "@/models/cartModel";
import { connectDB } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/helper/getDataFromToken";

interface Params {
    params: Promise<{
        itemId: string;
    }>;
}

export async function DELETE(
    req: NextRequest,
    { params }: Params
) {
    try {
        await connectDB();

        const { itemId } = await params;

        const userId = await getDataFromToken();

        const cart = await Cart.findOne({
            userId,
        });

        if (!cart) {
            return NextResponse.json(
                {
                    message: "Cart not found",
                },
                {
                    status: 404,
                }
            );
        }

        cart.items = cart.items.filter(
            (item) => item._id?.toString() !== itemId
        );

        await cart.save();

        return NextResponse.json({
            success: true,
        });
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
export async function PATCH(req: NextRequest,
    { params }: Params) {

    try {
        connectDB();
        const { itemId } = await params;
        const body = await req.json();
        const { quantity } = body;
        const item = await Cart.findOneAndUpdate(
            {
                "items._id": itemId,
            },
            {
                $set: {
                    "items.$.quantity": quantity,
                },
            },
            {
                new: true,
            }
        );
        item.save();

        return NextResponse.json({
            success: true,
            message: "Item quantity updated successfully"
        }, {
            status: 200
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Failed to update item quantity",
        }, {
            status: 500
        })


    }
}