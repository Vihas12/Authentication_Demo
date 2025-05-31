import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
            if (!uri) {
              throw new Error("MONGODB_URI is not defined in environment variables");
            }
        
        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Failed to connect to the database");
    }
}