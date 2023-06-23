
import { connect, connection } from 'mongoose';

const mongoUri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "";


export async function createMongoConnection() {
  if (connection.readyState === 1) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    console.log('Connecting to MongoDB...');
    await connect(mongoUri);
    console.log('Connected to MongoDB successfully!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}