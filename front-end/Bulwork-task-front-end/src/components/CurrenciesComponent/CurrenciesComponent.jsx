import React from "react";
import { Input } from "../Input/Input";

const CurrenciesComponent = ({
  currencies,
  setCurrencies,
  handleInputChange,
  setFilteredCurrencies,
}) => {
  return (
    <>
      {currencies &&
        Object.keys(currencies).length > 0 &&
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
            {code != "USD" &&
              code != "EUR" &&
              code != "RUB" &&
              code != "BYN" && (
                <button
                  className=" absolute right-0 top-2 p-4"
                  onClick={() => {
                    setCurrencies((prev) => {
                      const { [code]: _, ...newCurrencies } = prev; //Remove currency
                      return newCurrencies;
                    }),
                      setFilteredCurrencies((prev) =>
                        prev.filter((currency) => currency !== code)
                      );
                  }}
                >
                  X
                </button>
              )}
          </div>
        ))}
    </>
  );
};

export default CurrenciesComponent;
