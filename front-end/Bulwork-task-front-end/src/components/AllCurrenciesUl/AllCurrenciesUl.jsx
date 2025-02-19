import React from "react";

const AllCurrenciesUl = ({
  allCurrencies,
  setCurrencies,
  setFilteredCurrencies,
  setDisplayAll,
}) => {
  return (
    <div className="absolute bottom-0 w-full h-[200px] max-h-[200px] overflow-auto bg-white  px-2 mx-2">
      <ul className="border border-gray-300 rounded-md shadow-md">
        {Object.keys(allCurrencies).length > 0 &&
          Object.entries(allCurrencies).map(([code, value]) => (
            <li
              key={code}
              onClick={() => {
                setCurrencies((prev) => ({
                  ...prev,
                  [code]: value,
                })),
                setFilteredCurrencies((prev) => [...prev, code]),
                  setDisplayAll(false);
              }}
              className="border-b-2 border-b-gray-300 text-center p-2 hover:bg-gray-300 cursor-pointer"
            >
              {code}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AllCurrenciesUl;
