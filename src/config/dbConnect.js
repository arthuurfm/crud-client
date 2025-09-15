import mongoose from 'mongoose';

async function dbConnect() {
  mongoose.connect('mongodb+srv://admin:admin123@cluster0.dab6zwx.mongodb.net/database?retryWrites=true&w=majority&appName=cluster0');

  return mongoose.connection;
}

export default dbConnect;