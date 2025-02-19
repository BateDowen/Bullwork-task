import { Schema, model } from "mongoose";

const currencySchema = new Schema({
  code: String,
  rate: Number,
});
export const Currency = model("Currency", currencySchema);
