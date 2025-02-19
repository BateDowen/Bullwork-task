import { useEffect, useState } from "react";
import { Input } from "./components/Input/Input";
import AllCurrenciesUl from "./components/AllCurrenciesUl/AllCurrenciesUl";
const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
const BASE_URL = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&currencies=EUR%2CUSD%2CBYN%2CRUB`;
function App() {
  const [currencies, setCurrencies] = useState();
  const [filteredCurrencies, setFilteredCurrencies] = useState([
    "USD",
    "EUR",
    "BYN",
    "RUB",
  ]);
  const [allCurrencies, setAllCurrencies] = useState();
  const [loading, setLoading] = useState(true);
  const [displayAll, setDisplayAll] = useState(false);

  const [amount, setAmount] = useState(1);
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:3031/currencies?amount=${amount}&filteredCurrencies=${JSON.stringify(
        filteredCurrencies
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch currencies");
        return response.json();
      })
      .then((data) => {
        console.log("Updated currency rates:", data);
        setCurrencies(data.updated);
        setAllCurrencies(data.allCurrencies);
        setLoading(false);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);
  useEffect(() => {
    console.log("Currencies updated:", currencies);
    console.log("AllCurrencies updated:", allCurrencies);
  }, [currencies]);

  const handleInputChange = async (code, newAmount) => {
    setTimeout(() => {
      setLoading(true);
      fetch(
        `http://localhost:3031/currencies?amount=${newAmount}&code=${code}&filteredCurrencies=${JSON.stringify(
          filteredCurrencies
        )}`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch currencies");
          return response.json();
        })
        .then((data) => {
          setCurrencies(data.updated);
          setAllCurrencies(data.allCurrencies);
          setLoading(false);
        })
        .catch((error) => console.error("Fetch error:", error));
    }, 2000);
  };
  return (
    <>
      <div className=" mx-auto my-5 max-md:w-[80%] w-[40%] mt-10 max-h-[80%]">
        {loading ? (
          <p>Loading</p>
        ) : (
          <div className="flex flex-col justify-center">
            <h1 className="text-center text-2xl text-gray-300 my-5">
              Currency converter
            </h1>
            <div className="flex flex-col justify-center bg-white rounded-xl ">
              { console.log('---------',{currencies})}
              { console.log('---------',{filteredCurrencies})}
              {currencies && Object.keys(currencies).length > 0 &&
                Object.entries(currencies).map(([code, value]) => (
                  <div className=" flex justify-between relative mx-auto">
                    <Input
                      key={code}
                      onChange={(e) =>
                        handleInputChange(code, parseFloat(e.target.value) || 0)
                      }
                      value={value.toFixed(4)}
                      label={code}
                    />
                    { code != 'USD' && code !=  'EUR' && code != 'RUB' && code != 'BYN' && (
                      <button
                      className=" absolute right-0 top-2 p-4"
                        onClick={() => {
                          setCurrencies((prev) => {
                            const { [code]: _, ...newCurrencies } = prev; //Remove currency
                            return newCurrencies;
                          }),
                          setFilteredCurrencies((prev) => prev.filter((currency) => currency !== code))
                          
                        }}
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
              <div className="flex flex-row justify-center gap-2 my-3  relative">
                <span>+</span>
                <button onClick={() => setDisplayAll(true)}>
                  Add currency
                </button>
                {displayAll && (
                  <AllCurrenciesUl
                    allCurrencies={allCurrencies}
                    setCurrencies={setCurrencies}
                    setFilteredCurrencies={setFilteredCurrencies}
                    setDisplayAll={setDisplayAll}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
