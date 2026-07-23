import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/dbconfig/dbconfig";
import Product from "@/models/productModel";

connectDB();

// get a single product 
export async function GET(
    req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await context.params;
        const product = await Product.findOne({ slug });


        if (!product) {
            return NextResponse.json({ message: "product not found", success: false }, { status: 404 });

        }
        return NextResponse.json(product);

    } catch (error) {
        return NextResponse.json({ message: "something went wrong ", success: false }, { status: 500 });

    }
}
//update product 
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const slug = (await params).slug
    try {
        const Body = await req.json();
        const updatedProduct = await Product.findOneAndUpdate({ slug: slug }, Body, { new: true });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        return NextResponse.json({ message: "something went wrong ", success: false }, { status: 500 });

    }
}
// Delete Product
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const slug = (await params).slug
    try {
        const deletedProduct = await Product.findOneAndDelete({ slug: slug });
        if (!deletedProduct) {
            return NextResponse.json({ message: "product not found", success: false }, { status: 404 });
        }
        return NextResponse.json({
            message: "product deleted successfully",
            success: true
        },
            { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "something went wrong ", success: false },
            { status: 500 }
        );
    }
}   