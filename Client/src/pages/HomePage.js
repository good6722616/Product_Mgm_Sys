import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const { state } = useContext(AppContext);
  useEffect(() => {
    if (state.isLoggedIn) {
      navigate("/products");
    }
  }, [state.isLoggedIn, navigate]);
  return (
    <div className="bg-white flex-1 h-full flex flex-col justify-center p-2">
      <div className="mx-auto max-w-5xl w-full h-full flex flex-col justify-center items-center">
        <div className="font-bold text-xl text-slate-800 uppercase">
          Home Page
        </div>
        <div className="max-w-2xl text-justify">Product List</div>
      </div>
    </div>
  );
};

export default HomePage;
