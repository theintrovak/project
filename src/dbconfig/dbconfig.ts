import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        const connect = mongoose.connection;
        connect.on("connected", () => {
            console.log('mongoDb connected successfully');


        })
        connect.on("error", (err) => {
            console.error.bind(console, "MongoDB connection error:" + err)
            process.exit();

        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};