import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export async function getDataFromToken(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';
        if (token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
            if (typeof decodedToken === "string") {
                throw new Error("Invalid token");
            }
            return decodedToken.id as string;
        }
    } catch (error) {
        console.log(error);

    }
}