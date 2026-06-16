import { connectDB } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";


await connectDB();
export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;


        // Check if user already exists
        const user = await (User as any).findOne({ email });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "invaliad email or password",
                hint: "Try with different credentials in instead",
            },
                { status: 400 }
            );
        }


        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({
                success: false,
                message: "invaliad email or password",
                hint: "Try with different credentials in instead",
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
        const token = jwt.sign(tokendata, process.env.JWT_SECRET as string, { expiresIn: "5d" });
        const response = NextResponse.json(
            {
                success: true,
                message: "Login successful",
                user: tokendata,
            },
            { status: 200 }
        );
        response.cookies.set("token", token, { httpOnly: true });

        console.log("login successfull");
        return response

    }
    catch (error) {
        console.log("Login failed", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

}