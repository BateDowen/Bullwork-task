import { useEffect, useState } from "react";
import "./App.css";
import { Input } from "./components/Input/Input";
const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
const BASE_URL =
  `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&currencies=EUR%2CUSD%2CBYN%2CRUB`;
function App() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [convertedValues, setConvertedValues] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((result) => {
        const currencyData = Object.values(result.data);
        console.log({currencyData});
        setCurrencies(currencyData);
        setLoading(false);
      });
    }, []);
    
    useEffect(() => {
      
      updateConversions(currencies, "USD", 1);
  },[currencies])
  const updateConversions = (currencyList, baseCode, baseAmount) => {
    const baseCurrency = currencyList.find((c) => c.code === baseCode);
    if (!baseCurrency) return;

    const updatedValues = {};
    currencyList.forEach((currency) => {
      updatedValues[currency.code] =
        (baseAmount / baseCurrency.value) * currency.value;
    });
    console.log({updatedValues});
    setConvertedValues(updatedValues);
  };

  const handleInputChange = (code, newAmount) => {
    updateConversions(currencies, code, newAmount);
  };
  return (
    <>
      <div>
        {loading ? (
          <p>Loading</p>
        ) : (
          <div>
            {currencies.length > 0 && currencies.map((currency) => (
              <Input
                key={currency.code}
                value={convertedValues[currency.code]|| ""}
                onChange={(e) =>
                  handleInputChange(
                    currency.code,
                    parseFloat(e.target.value) || 0
                    )
                  }
                  label={currency.code}
                  />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
