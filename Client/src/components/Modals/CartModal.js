import React, { useState, useContext, useEffect, useCallback } from "react";
import { AppContext } from "../../context/AppContext";
import Button from "../Button";
import Modal from "../Modal";
import Input from "../Input";
import showToast from "../Toast";

const promos = [
  {
    code: "10OFF",
    discount: 0.1,
    type: "percentage",
  },
  {
    code: "20OFF",
    discount: 0.2,
    type: "percentage",
  },
  {
    code: "SUPER12",
    discount: 0.12,
    type: "percentage",
  },
  {
    code: "TENFLAT",
    discount: 10,
    type: "flat",
  },
];

const CartModal = ({ show }) => {
  const { state, dispatch, updateModal } = useContext(AppContext);
  const [promoCode, setPromoCode] = useState("");
  const [promo, setPromo] = useState(null);
  const [discount, setDiscount] = useState(0);

  const addToCart = (payload) => {
    dispatch({ type: "ADD_TO_CART", payload });
  };
  const removeFromCart = (payload) => {
    dispatch({ type: "REMOVE_ONE_FROM_CART", payload });
  };
  const removeAllFromCart = (payload) => {
    dispatch({ type: "REMOVE_FROM_CART", payload });
  };

  const getCartTotalPrice = useCallback(() => {
    return state.cartItems.reduce((total, product) => {
      return total + product.price * product.qty;
    }, 0);
  }, [state.cartItems]);

  const updatePromo = () => {
    const promo = promos.find((promo) => promo.code === promoCode);
    setPromo(promo || null);
  };

  const handleCheckout = () => {
    showToast("Checkout Successful", "success", 3000);
  };

  useEffect(() => {
    if (!promo) {
      setDiscount(0);
    } else if (promo.type === "percentage") {
      setDiscount(promo.discount * getCartTotalPrice());
    } else if (promo.type === "flat") {
      setDiscount(promo.discount);
    } else {
      setDiscount(0);
    }
  }, [promo, getCartTotalPrice]);

  return (
    <Modal
      title="Cart"
      show={show}
      className="absolute top-2 right-2 z-[2]"
      body={
        state.cartItems.length > 0 ? (
          <div className="w-full">
            <div className="border-b-[1px] border-slate-400">
              {state.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="py-2 flex flex-row justify-between items-center select-none"
                >
                  <div>
                    <div className="flex flex-row items-center justify-start">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-8 w-8 mr-4"
                      />
                      <div>
                        <div>{item.title}</div>
                        <div className="flex flex-row items-center">
                          <div
                            className="cursor-pointer"
                            onClick={() => removeFromCart(item)}
                          >
                            -
                          </div>
                          <div className="px-2">{item.qty}</div>
                          <div
                            className="cursor-pointer"
                            onClick={() => addToCart(item)}
                          >
                            +
                          </div>
                          <div
                            className="cursor-pointer text-red-500 text-xs ml-2 underline"
                            onClick={() => removeAllFromCart(item)}
                          >
                            Remove
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>${item.price}</div>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <label className="text-xs">Apply Promo Code</label>
              <div className="w-full flex flex-row">
                <Input
                  className="mr-1"
                  placeholder="Enter Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button onClick={updatePromo}>Apply</Button>
              </div>
            </div>

            <div className="mt-2 w-full flex flex-col ">
              <div className="flex flex-row justify-between py-1">
                <div>Subtotal</div>
                <div>${getCartTotalPrice().toFixed(2)}</div>
              </div>
              <div className="flex flex-row justify-between py-1">
                <div>Tax</div>
                <div>${(getCartTotalPrice() * 0.1).toFixed(2)}</div>
              </div>
              <div className="flex flex-row justify-between py-1">
                <div>Discount</div>
                <div>${discount.toFixed(2)}</div>
              </div>
              <div className="flex flex-row justify-between border-t-[1px] border-t-slate-400 py-2">
                <div>Total</div>
                <div>
                  $
                  {(
                    getCartTotalPrice() +
                    getCartTotalPrice() * 0.1 -
                    discount
                  ).toFixed(2)}
                </div>
              </div>
            </div>

            <Button
              onClick={
                state.userData ? handleCheckout : () => updateModal("signin")
              }
              className="w-full py-2"
            >
              {state.userData ? "CHECKOUT" : "LOGIN TO CHECKOUT"}
            </Button>
          </div>
        ) : (
          <div className="text-center py-3">
            <div className="text-2xl font-bold text-amber-600">
              Your cart is empty
            </div>
            <div className="text-lg">Add items to your cart to checkout</div>
          </div>
        )
      }
    />
  );
};

export default CartModal;
