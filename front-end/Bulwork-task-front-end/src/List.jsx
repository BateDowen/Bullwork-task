import React, { useContext, useEffect, useState } from "react";
import { getCurrencies } from "./utils/api";
import { CurrenciesContext } from "./context/context";
import { Input } from "./components/Input/Input";
import { NavLink } from "react-router-dom";

const List = () => {
  const [loading, setLoading] = useState(false);

  const { globalCurrencies } = useContext(CurrenciesContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCurrencies, setFilteredCurrencies] =
    useState(globalCurrencies);

  const handleSearch = (event) => {
    const value = event.target.value.toUpperCase();
    setSearchTerm(value);

    const filtered = Object.fromEntries(
      Object.entries(globalCurrencies).filter(([code]) => code.includes(value))
    );

    setFilteredCurrencies(filtered);
  };
  useEffect(() => {
    console.log("List Currencies updated:", { globalCurrencies });
  }, []);
  return (
    <div className=" mx-auto my-5 max-md:w-[80%] w-[40%] mt-10 max-h-[80%]">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="flex flex-col justify-center">
          <div className="bg-white shadow-sm rounded-md mx-auto px-6 py-2 my-2">
            <NavLink to={"/"}>Converter</NavLink>
          </div>
          <h1 className="text-center text-2xl text-gray-300 my-5">
            All currencies
          </h1>
          <Input placeholder="Find currency" onChange={handleSearch} />
          <div className="bg-white rounded-xl py-1 ">
            {filteredCurrencies ? (
              Object.keys(filteredCurrencies).length > 0 &&
              Object.entries(filteredCurrencies).map(([code, value]) => (
                <p className="border-b-2 rounded-xl text-center p-2 hover:bg-gray-300 cursor-pointer">{`${code}: ${value}`}</p>
              ))
            ) : (
              <h3 className="text-center text-2xl text-gray-300 my-5">
                No results found
              </h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
