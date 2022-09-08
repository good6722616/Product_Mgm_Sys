import React, { createContext, useEffect, useReducer } from "react";
import AppReducer from "./AppReducer";
const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || null,
  allProducts: { loading: true },
  cartItems: [],
  modal: null,
};

export const AppContext = createContext(initialState);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    // update cart items from local storage
    dispatch({
      type: "SET_CART_ITEMS",
      payload:
        JSON.parse(localStorage.getItem(`cartItems_${state.userData?._id}`)) ||
        [],
    });
  }, [state.userData]);

  const updateModal = (modalId) => {
    dispatch({
      type: "SHOW_MODAL",
      payload: modalId,
    });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, updateModal }}>
      {children}
    </AppContext.Provider>
  );
};
