import express from "express";
import { CurrencyController } from "../controllers/currencyController.js";
const currencyRouter = express.Router();

currencyRouter.get('/', CurrencyController.getCurrencies)
export default currencyRouter