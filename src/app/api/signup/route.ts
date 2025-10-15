import { connectDB } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, email, password } = reqBody;
        console.log(reqBody, "data fetched");


        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }
        //hashing hte passord
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("password hashed");


        //create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        console.timeLog("User created successfully");

        const savedUser = await newUser.save();
        console.log("User saved successfully");

        return NextResponse.json({
            message: "User created successfully",
            status: 201,
            success: true,
            savedUser,
        });
        console.log("User returnsuccessfully")

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

    }
}



