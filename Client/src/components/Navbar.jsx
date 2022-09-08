import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Button from "./Button";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
// import { seachProductsApi } from "../apis/productApis";
// import showToast from "../components/Toast";
// import Input from "../components/Input";
// import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  // const handleSearch = async () => {
  //   const data = await seachProductsApi(searchQuery);
  //   if (!data.error) {
  //     dispatch({
  //       type: "SET_ALL_PRODUCTS",
  //       payload: { list: data, error: null, loading: false },
  //     });
  //   } else {
  //     showToast(data.error, "error", 3000);
  //   }
  // };
  // const [searchQuery, setSearchQuery] = useState("");

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="bg-slate-800 h-12 flex flex-col justify-center p-2 px-4">
      <div className="flex flex-row justify-between mx-auto w-full max-w-5xl items-center">
        <div
          onClick={() => navigate("/")}
          className="text-slate-50 font-semibold tracking-wider cursor-pointer"
        >
          <span onClick={() => navigate("/")} className="text-xl">
            Management{" "}
          </span>
          <span onClick={() => navigate("/")} className="text-xs">
            Chuwa
          </span>
        </div>
        {/* <div className="flex flex-row sm:flex-row">
          <Input
            className="focus:bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
          />
          <Button onClick={handleSearch}>
            <BiSearch />
          </Button>
        </div> */}
        <div className="flex flex-row gap-2">
          {state.userData ? (
            <Button
              className="bg-[#10AEC2] hover:bg-[#158BB8]"
              onClick={logout}
            >
              Log Out
            </Button>
          ) : (
            <Login />
          )}

          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
