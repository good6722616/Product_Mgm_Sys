const AppReducer = (state, action) => {
  let cartItems;
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("userData", JSON.stringify(action.payload));
      return {
        ...state,
        userData: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("userData");
      return {
        ...state,
        userData: null,
      };

    case "SET_CART_ITEMS":
      cartItems = action.payload;
      return {
        ...state,
        cartItems,
      };

    case "ADD_TO_CART":
      const itemId = action.payload._id;
      const isExisting = state.cartItems.find((item) => item._id === itemId);
      if (isExisting) {
        cartItems = state.cartItems.map((item) =>
          item._id === itemId ? { ...action.payload, qty: item.qty + 1 } : item
        );
      } else {
        cartItems = [...state.cartItems, { ...action.payload, qty: 1 }];
      }
      if (state.userData)
        localStorage.setItem(
          `cartItems_${state.userData._id}`,
          JSON.stringify(cartItems)
        );
      return {
        ...state,
        cartItems,
      };

    case "REMOVE_ONE_FROM_CART":
      const itemIdToRemove = action.payload._id;
      const moreThanOne =
        state.cartItems.find((item) => item._id === itemIdToRemove)?.qty > 1;

      if (moreThanOne) {
        cartItems = state.cartItems.map((item) =>
          item._id === itemIdToRemove
            ? { ...action.payload, qty: item.qty - 1 }
            : item
        );
      } else {
        cartItems = state.cartItems.filter(
          (item) => item._id !== itemIdToRemove
        );
      }
      if (state.userData)
        localStorage.setItem(
          `cartItems_${state.userData._id}`,
          JSON.stringify(cartItems)
        );
      return {
        ...state,
        cartItems,
      };

    case "REMOVE_FROM_CART":
      cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      if (state.userData)
        localStorage.setItem(
          `cartItems_${state.userData._id}`,
          JSON.stringify(cartItems)
        );
      return {
        ...state,
        cartItems,
      };

    case "SET_ALL_PRODUCTS":
      return {
        ...state,
        allProducts: action.payload,
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          list: [action.payload, ...state.allProducts.list],
        },
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          list: state.allProducts.list.map((product) =>
            product._id === action.payload._id ? action.payload : product
          ),
        },
      };

    case "DELETE_PRODUCT":
      cartItems = state.cartItems.filter((item) => item._id !== action.payload);
      if (state.userData)
        localStorage.setItem(
          `cartItems_${state.userData._id}`,
          JSON.stringify(cartItems)
        );
      return {
        ...state,
        cartItems,
        allProducts: {
          ...state.allProducts,
          list: state.allProducts.list.filter(
            (product) => product._id !== action.payload
          ),
        },
      };

    case "SHOW_MODAL":
      return {
        ...state,
        modal: action.payload,
      };
    case "HIDE_MODAL":
      return {
        ...state,
        modal: null,
      };
    default:
      return state;
  }
};

export default AppReducer;
