import React, { useEffect, useContext } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import Footer from "./components/Footer";
import { AppContext } from "./context/AppContext";
import { allProductsApi } from "./apis/productApis";
import { Toaster } from "react-hot-toast";

function App() {
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    (async () => {
      dispatch({
        type: "SET_ALL_PRODUCTS",
        payload: { loading: true, list: [], error: null },
      });
      const data = await allProductsApi();
      if (!data.error)
        dispatch({
          type: "SET_ALL_PRODUCTS",
          payload: { list: data, error: null, loading: false },
        });
      else
        dispatch({
          type: "SET_ALL_PRODUCTS",
          payload: { error: data.error, list: [], loading: false },
        });
    })();
  }, []);
  return (
    <div className="min-h-[100vh] flex flex-col">
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:product_id" element={<ProductDetailsPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/edit-product/:product_id" element={<EditProductPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
