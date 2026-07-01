import { Order } from "@/models/orderModel";
import { connectDB } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import Cart from "@/models/cartModel";
import User from "@/models/userModel";
import Product from "@/models/productModel";


export async function POST(request: Request) {
    const reqBody = await request.json();
    try {
        await connectDB();
        // authenticate user
        const userId = await getDataFromToken();
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }



        if (!reqBody.orderItems?.length) {
            return NextResponse.json({ success: false, message: "Cart is empty" }, { status: 400 });
        }
        let totalAmount = 0;
        // 4️⃣ Validate every cart item
        for (const item of reqBody.orderItems) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return NextResponse.json({ success: false, message: `Product ${item.name} not found` }, { status: 404 });
            }

            // Stock check
            if (product.stock < item.quantity) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `${product.name} has only ${product.stock} left in stock`,
                    },
                    { status: 400 }
                );

            }
            const totalPrice = product.price * item.quantity;
            totalAmount += totalPrice;
        }

        // 5️⃣ Create order
        const order = await Order.create({
            user: userId,
            orderItems: reqBody.orderItems,
            shippingAddress: reqBody.shippingAddress,
            paymentMethod: reqBody.paymentMethod,
            itemsPrice: reqBody.itemsPrice,
            shippingPrice: reqBody.shippingPrice,
            taxPrice: reqBody.taxPrice,
            totalPrice: totalAmount,
        });
        order.save();

        // 6️⃣ Clear cart
        await Cart.findOneAndDelete({ user: userId });
        return NextResponse.json({ success: true, message: "Order created successfully", order }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to create order" }, { status: 500 });
    }
}



