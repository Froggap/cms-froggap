import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async () => {
  mongoose.set("debug", true);
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB conectado");
};

const disconnect = async () => {
  await mongoose.disconnect();
  console.log("MongoDB desconectado");
};

export { connect, disconnect };
