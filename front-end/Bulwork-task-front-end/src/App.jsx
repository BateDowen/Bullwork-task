import { useContext, useEffect, useState } from "react";
import AllCurrenciesUl from "./components/AllCurrenciesUl/AllCurrenciesUl";
import { getCurrencies, getIputCurrencies } from "./utils/api";
import CurrenciesComponent from "./components/CurrenciesComponent/CurrenciesComponent";
import { CurrenciesContext } from "./context/context";
import { NavLink } from "react-router-dom";
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
  const { setGlobalCurrencies } = useContext(CurrenciesContext);
  const [amount, setAmount] = useState(1);
  useEffect(() => {
    getCurrencies({
      setLoading,
      amount,
      filteredCurrencies,
      setCurrencies,
      setAllCurrencies,
    });
  }, []);
  useEffect(() => {
    setGlobalCurrencies(allCurrencies);
    console.log("Currencies updated:", currencies);
    console.log("AllCurrencies updated:", allCurrencies);
  }, [currencies]);

  const handleInputChange = async (code, newAmount) => {
    setTimeout(() => {
      getIputCurrencies({
        setLoading,
        newAmount,
        code,
        filteredCurrencies,
        setCurrencies,
        setAllCurrencies,
      });
    }, 3000);
  };
  return (
    <>
      <div className=" mx-auto my-5 max-md:w-[80%] w-[40%] mt-10 max-h-[80%]">
        {loading ? (
          <p className="p-3 text-center text-xl text-white">Loading...</p>
        ) : (
          <div className="flex flex-col justify-center">
            <h1 className="text-center text-2xl text-gray-300 my-5">
              Currency converter
            </h1>
            {currencies ? (
              <div className="flex flex-col justify-center bg-white rounded-xl ">
                <CurrenciesComponent
                  currencies={currencies}
                  setCurrencies={setCurrencies}
                  handleInputChange={handleInputChange}
                  setFilteredCurrencies={setFilteredCurrencies}
                />
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
            ) : (
              <h3 className="text-center text-2xl text-gray-300 my-5">
                No results found
              </h3>
            )}
            <div className="bg-white shadow-sm rounded-md mx-auto px-6 py-2 my-2">
              <NavLink to={"/list"}>See all</NavLink>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
