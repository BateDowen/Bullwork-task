import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import App from "./App";
import List from "./List";
import { CurrenciesContext } from "./context/context";
import { useState } from "react";

const Layout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/list",
        element: <List />,
      },
    ],
  },
]);

const Router = () => {
  const [globalCurrencies, setGlobalCurrencies] = useState([])
  return (
    <CurrenciesContext.Provider value={{globalCurrencies, setGlobalCurrencies}}>
      <RouterProvider router={router}></RouterProvider>
    </CurrenciesContext.Provider>
  );
};
export default Router;
