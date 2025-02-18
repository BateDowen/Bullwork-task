import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3031;
const app = express();
app.use(cors());


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connect to mongo");
  } catch (error) {
    throw error;
  }
};
app.listen(port, host, () => {
  connect();
  console.log(`Server is listening on ${host}:${port}...`);
});