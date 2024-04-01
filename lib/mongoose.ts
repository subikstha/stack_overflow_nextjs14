import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  //   We set this to prevent unknown field queries

  if (!process.env.MONGODB_URL) return console.log("Missing MONGODB_URL");

  if (isConnected) return console.log("MongoDB is already connected");

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devFlow",
    });

    isConnected = true;

  } catch (error) {
    console.log("Monogodb connection failed", error);
  }
};
