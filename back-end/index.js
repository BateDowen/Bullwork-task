import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import currencyRouter from "./routes/currencies.js";
dotenv.config();
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3031;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/currencies',currencyRouter)

app.listen(port, host, () => {
  console.log(`Server is listening on ${host}:${port}...`);
});