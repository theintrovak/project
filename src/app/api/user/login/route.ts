import { connectDB } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;


        // Check if user already exists
        const user = await (User as any).findOne({ email });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User Not Found",
                hint: "Try with different email in instead",
            },
                { status: 400 }
            );
        }


        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({
                success: false,
                message: "this password is incorrect",
                hint: "Try with different password in instead",
            },
                { status: 400 }
            );
        }
        const tokendata = {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        }
        const token = await jwt.sign(tokendata, process.env.JWT_SECRET as string, { expiresIn: "1d" });
        const response = NextResponse.json({ message: "Login successful", success: true }, { status: 200 });
        response.cookies.set("token", token, { httpOnly: true });

        console.log("login successfull");
        return response

    }
    catch (error) {
        console.log("Login failed", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

}