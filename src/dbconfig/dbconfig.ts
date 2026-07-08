
import mongoose from "mongoose";

export const connectDB = async () => {
    // 1. Check if already connected or connecting
    if (mongoose.connection.readyState >= 1) {
        console.log("Using existing MongoDB connection");
        return;
    }

    try {
        // 2. Set up event listeners BEFORE calling connect
        const connect = mongoose.connection;

        connect.once("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connect.on("error", (err) => {
            console.error("MongoDB connection error:", err);
            // Optional: process.exit(1);
        });

        connect.on("disconnected", () => {
            console.warn("MongoDB disconnected! Mongoose will automatically try to reconnect.");
        });

        // 3. Initiate the connection
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Connected to MongoDB");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};