import { connectDB } from "@/dbconfig/dbconfig";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";
import { generateSlug } from "@/utils/slugify";

connectDB();
// get all products
export async function GET() {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ messagge: "Something went wrong!", success: false }, { status: 500 });
    }
}
// create new product (for admin only)
export async function POST(req: Request) {
    try {
        const Body = await req.json();
        const slug = generateSlug(Body.name);
        const newProduct = await Product.create({ ...Body, slug });
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ messagge: "Something went wrong!", success: false }, { status: 500 });
    }
}