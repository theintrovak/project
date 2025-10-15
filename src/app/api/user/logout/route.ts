import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({ messagge: "Logout successful!", success: true }, { status: 200 });
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        return response
    } catch (error) {
        return NextResponse.json({ messagge: "Something went wrong!", success: false }, { status: 500 });

    }
}