import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function getDataFromToken() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value || "";
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