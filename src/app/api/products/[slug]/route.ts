import { NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/dbconfig";
import Product from "@/models/productModel";

connectDB();

// get a single product 
export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        const product = await Product.findOne({ slug: params.slug });
        if (!product) {
            return NextResponse.json({ message: "product not found", success: false }, { status: 404 });
        }
        return NextResponse.json(product);

    } catch (error) {
        return NextResponse.json({ message: "something went wrong ", success: false }, { status: 500 });

    }
}
//update product 
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
    try {
        const Body = await req.json();
        const updatedProduct = await Product.findOneAndUpdate({ slug: params.slug }, Body, { new: true });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        return NextResponse.json({ message: "something went wrong ", success: false }, { status: 500 });

    }
}
// Delete Product
export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
    try {
        await Product.findOneAndDelete({ slug: params.slug });
        return NextResponse.json({ message: "product deleted successfully", success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "something went wrong ", success: false }, { status: 500 });
    }
}   