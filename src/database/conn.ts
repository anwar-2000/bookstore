
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "";

const mongoClient = new MongoClient(mongoUri);

export async function createMongoConnection() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}