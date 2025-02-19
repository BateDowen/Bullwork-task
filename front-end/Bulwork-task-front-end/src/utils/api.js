const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getCurrencies = ({
  setLoading,
  amount,
  filteredCurrencies,
  setCurrencies,
  setAllCurrencies,
}) => {
  setLoading(true);
  fetch(
    `${BASE_URL}/currencies?amount=${amount}&filteredCurrencies=${JSON.stringify(
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
    .catch((error) => {
      setCurrencies({});
      setAllCurrencies({});
      console.error("Fetch error:", error);
    });
};
export const getIputCurrencies = ({
  setLoading,
  newAmount,
  code,
  filteredCurrencies,
  setCurrencies,
  setAllCurrencies,
}) => {
  setLoading(true);
  fetch(
    `${BASE_URL}/currencies?amount=${newAmount}&code=${code}&filteredCurrencies=${JSON.stringify(
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
    .catch((error) => {
      setCurrencies({});
      setAllCurrencies({});
      console.error("Fetch error:", error);
    });
};
