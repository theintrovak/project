import { NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/dbconfig";
import Product from "@/models/productModel";

connectDB();

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {

    } catch (error) {

    }
}