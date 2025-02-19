import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import currencyRouter from "./routes/currencies.js";
import mongoose from "mongoose";
dotenv.config();
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3031;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/currencies',currencyRouter)
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
app.listen(port, host, () => {
  connect()
  console.log(`Server is listening on ${host}:${port}...`);
});