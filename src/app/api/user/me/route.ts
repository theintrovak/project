import { connectDB } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const dbData = await (User as any).findOne({ _id: userId }).select("-password ");
        return NextResponse.json({ success: true, data: dbData });
    } catch (error) {
        console.log(error);

    }

}