import { CurrencyServises } from "../services/currencies.js";
import dotenv from "dotenv";
dotenv.config();
const BASE_URL = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/USD`
export class CurrencyController {
  static async getCurrencies(req, res, next) {
    const { amount,code, filteredCurrencies } = req.query;
    const currencyList = filteredCurrencies ? JSON.parse(filteredCurrencies) : [];
    const baseAmount = amount ? parseFloat(amount) : 1;
    try {
      const response = await fetch(BASE_URL, { method: "GET" });
      
      if (!response.ok) throw new Error("Failed to fetch exchange rates");
      
      const result = await response.json();
      
      if (result && result.conversion_rates) {
        const filteredData = Object.fromEntries(
          Object.entries(result.conversion_rates).filter(([code]) =>
          filteredCurrencies.includes(code)
          )
        );
        const updated = CurrencyServises.calculate(filteredData,code, baseAmount);
        const allCurrencies = CurrencyServises.calculate(result.conversion_rates,code, baseAmount);
        console.log({updated});
        console.log({allCurrencies});
        return res.json({updated, allCurrencies: allCurrencies || {}}); 
      } else {
        throw new Error("Invalid data received from API");
      }
    } catch (error) {
      console.error("Error fetching currencies:", error);
      res.status(500).json({ error: "Failed to retrieve currency data" });
    }
  }
}
