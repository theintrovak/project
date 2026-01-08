import { connectDB } from "@/dbconfig/dbconfig";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
    try {
        const products = await Product.find({ isFeatured: true }).limit(4).sort({ createdAt: -1 });
        return NextResponse.json(products);
    }
    catch (error) {
        return NextResponse.json({ messagge: "Something went wrong!", success: false }, { status: 500 });
    }

}
