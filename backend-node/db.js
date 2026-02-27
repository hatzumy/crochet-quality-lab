import mongoose from 'mongoose';

// Solo la lógica de conexión
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`); // eslint-disable-line no-console
  } catch (error) {
    console.error(`❌ Error: ${error.message}`); // eslint-disable-line no-console
    process.exit(1);
  }
};
