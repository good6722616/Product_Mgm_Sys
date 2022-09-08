import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { RiShoppingCartFill } from "react-icons/ri";
import CartModal from "./Modals/CartModal";

const Cart = () => {
  const { state, updateModal } = useContext(AppContext);
  const getCartTotalPrice = (cart) => {
    return cart.reduce((total, product) => {
      return total + product.price * product.qty;
    }, 0);
  };

  return (
    <>
      <div
        className="flex flex-row items-center"
        onClick={() => updateModal("cart")}
      >
        <div className="w-fit h-fit relative mx-2">
          {state.cartItems.reduce((acc, item) => acc + item.qty, 0) > 0 && (
            <div className="absolute bg-red-500 bg-opacity-85 top-[-10%] translate-y-[0%] translate-x-[75%] right-0 h-4 w-4 rounded-md text-[10px] flex justify-center items-center text-white shadow-sm">
              {state.cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </div>
          )}

          <RiShoppingCartFill
            color="white"
            className="hover:cursor-pointer"
            size={24}
          />
        </div>

        {state.cartItems.reduce((acc, item) => acc + item.qty, 0) > 0 && (
          <div className="mx-3 text-white">
            ${getCartTotalPrice(state.cartItems)}
          </div>
        )}
      </div>
      <CartModal show={state.modal === "cart"} />
    </>
  );
};

export default Cart;
