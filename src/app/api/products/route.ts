import { connectDB } from "@/dbconfig/dbconfig";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ messagge: "Something went wrong!", success: false }, { status: 500 });
    }
}
export async function POST(req: Request) {
    try {
        const Body = await req.json();
        const newProduct = await Product.create(Body);
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ messagge: "Something went wrong!", success: false }, { status: 500 });
    }
}