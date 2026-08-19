import mongoose from "mongoose";
import { connect, disconnect } from "./connect.js";

const collections = [
  "users",
  "sessions",
  "blogs",
  "technologies",
  "jobs",
  "mainsections",
  "migrations",
];

const drop = async () => {
  await connect();

  for (const name of collections) {
    try {
      await mongoose.connection.db.dropCollection(name);
      console.log(`Colección ${name} eliminada`);
    } catch {
      console.log(`Colección ${name} no existía, omitida`);
    }
  }

  console.log("Drop completado");
  await disconnect();
};

drop().catch(console.error);
