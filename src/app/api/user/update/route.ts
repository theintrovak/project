import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function PUT(request: NextRequest) {
    try {
        await connectDB();
        const userId = await getDataFromToken();
        const reqBody = await request.json();
        const { name, email, phone } = reqBody;
        const updatedData: Record<string, any> = {}
        if (name?.trim()) {
            updatedData.name = name.trim();
        }
        if (email?.trim()) {
            updatedData.email = email.trim();
        }
        if (phone?.trim()) {
            updatedData.phone = phone.trim();
        }
        if (Object.keys(updatedData).length === 0) {
            return NextResponse.json({ success: false, message: "No fields to update" }, { status: 400 });
        }

        const updatedUser = await (User as any).findOneAndUpdate(
            { _id: userId },
            { $set: updatedData },
            { new: true, runValidators: true }
        )
        if (!updatedUser) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "User updated successfully", updatedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to update user" }, { status: 500 });
    }

}