import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/test";

let DB_NAME = process.env.NODE_ENV === "production" ? process.env.DB_NAME_PROD : process.env.DB_NAME_DEV;

const connect = () => {
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 1) {
        console.log("✅ Already connected to MongoDB");
        return Promise.resolve();
    }
    if (connectionState === 2) {
        console.log("Connecting to MongoDB");
        return Promise.resolve();
    }
    try {
        mongoose.connect(MONGODB_URI!, {
            dbName: DB_NAME,
            bufferCommands: true,
        });
        console.log("✅ Connected!");
    } catch (error) {
        console.error("Error connecting to MongoDB");
        console.error(error);
    }
};

export default connect;