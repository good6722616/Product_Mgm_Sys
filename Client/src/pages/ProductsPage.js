import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showPagingIndex } from "../utils/functions";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { AppContext } from "../context/AppContext";
import Button from "../components/Button";
import DeleteProductModal from "../components/Modals/DeleteProductModal";
import {
  allProductsApi,
  deleteProductApi,
  seachProductsApi,
} from "../apis/productApis";
import showToast from "../components/Toast";
import Input from "../components/Input";

const sort = (products, sortBy) => {
  let sortedProducts = [...products];
  switch (sortBy) {
    case "price_low_high":
      return sortedProducts.sort((a, b) => a.price - b.price);
    case "price_high_low":
      return sortedProducts.sort((a, b) => b.price - a.price);
    case "name_a_z":
      return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    case "name_z_a":
      return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return products;
  }
};

const sortArray = [
  {
    label: "Price low to high",
    value: "price_low_high",
  },
  {
    label: "Price high to low",
    value: "price_high_low",
  },
  {
    label: "Name (A-Z)",
    value: "name_a_z",
  },
  {
    label: "Name (Z-A)",
    value: "name_z_a",
  },
  {
    label: "Default",
    value: "default",
  },
];

const ProductsPage = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  const [itemToDelete, setItemToDelete] = useState(null);

  const navigate = useNavigate();

  const { state, dispatch, updateModal } = useContext(AppContext);
  const { list, error, loading } = state.allProducts;

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const handleRemoveFromCart = (product) => {
    dispatch({ type: "REMOVE_ONE_FROM_CART", payload: product });
  };

  const handleSearch = async () => {
    const data = await seachProductsApi(searchQuery);
    if (!data.error) {
      dispatch({
        type: "SET_ALL_PRODUCTS",
        payload: { list: data, error: null, loading: false },
      });
    } else {
      showToast(data.error, "error", 3000);
    }
  };

  const handleDelete = async () => {
    const data = await deleteProductApi(itemToDelete, state.userData.token);
    if (!data.error) {
      dispatch({ type: "DELETE_PRODUCT", payload: itemToDelete });
      updateModal(null);

      navigate("/");
      showToast("Product deleted successfully", "success", 3000);
    } else {
      showToast("Error deleting product", "error", 3000);
    }
  };

  useEffect(() => {
    setPage(searchParams.get("page") || 1);
  }, [searchParams]);

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
    <div className="bg-slate-100 h-full w-full flex-1 px-4">
      <div className="flex flex-col mx-auto max-w-5xl w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center my-2">
          <div className="font-bold text-lg">All Products</div>
          <div className="flex flex-col sm:flex-row items-end gap-2">
            <div className="flex flex-row">
              <Input
                className="focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
              />
              <Button
                className="bg-[#10AEC2] hover:bg-[#158BB8]"
                onClick={handleSearch}
              >
                <BiSearch />
              </Button>
            </div>

            <Input
              className="focus:bg-white py-[7px] hover:cursor-pointer"
              label="Sort by"
              type="select"
              options={sortArray}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            />
            {state.userData?.isAdmin && (
              <Button
                className="py-2 bg-[#10AEC2] hover:bg-[#158BB8]"
                onClick={() => navigate("/add-product")}
              >
                Add Product
              </Button>
            )}
          </div>
        </div>

        {error ? (
          <div className="flex-1 flex flex-col w-full justify-center items-center">
            {error}
          </div>
        ) : loading ? (
          <div className="flex-1 flex flex-col w-full justify-center items-center">
            Loading...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 py-2">
              {sort(list, sortBy)
                .slice((page - 1) * 10, page * 10)
                .map((product, key) => (
                  <div
                    key={key}
                    className="flex flex-col border-[1px] border-slate-300 p-2 bg-white"
                  >
                    <div
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="flex flex-row justify-center items-center relative overflow-hidden border-[1px] border-slate-300 hover:cursor-pointer"
                    >
                      <img
                        className="w-full aspect-square object-cover  z-0 blur-sm scale-105 "
                        src={product.image}
                        alt={product.title}
                      />

                      <img
                        className="object-contain z-10 absolute h-fit w-fit shadow-xl"
                        src={product.image}
                        alt={product.title}
                      />
                    </div>
                    <div className="py-1">
                      <div className="truncate font-semibold text-sm">
                        {product.title}
                      </div>
                      <div className="text-xs">${product.price}</div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      {state.cartItems.find(
                        (item) => item._id === product._id
                      ) ? (
                        <div className="flex-1 flex-row flex bg-sky-300 rounded-sm">
                          <Button
                            onClick={() => {
                              handleRemoveFromCart(product);
                            }}
                          >
                            -
                          </Button>
                          <div className="flex-1 flex justify-center items-center text-center h-full text-black">
                            {
                              state.cartItems.find(
                                (item) => item._id === product._id
                              ).qty
                            }
                          </div>
                          <Button
                            onClick={() => {
                              handleAddToCart(product);
                            }}
                          >
                            +
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-[#10AEC2] hover:bg-[#158BB8]"
                        >
                          ADD
                        </Button>
                      )}
                      {state.userData?.isAdmin && (
                        <>
                          <Button
                            className="flex-1 bg-[#10AEC2] hover:bg-[#158BB8]"
                            onClick={() =>
                              navigate(`/edit-product/${product._id}`)
                            }
                          >
                            EDIT
                          </Button>
                          <Button
                            onClick={() => {
                              updateModal("deleteProduct");
                              setItemToDelete(product._id);
                            }}
                            className="bg-[#10AEC2] hover:bg-[#158BB8]"
                          >
                            Delete
                          </Button>
                          <DeleteProductModal onDelete={handleDelete} />
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex flex-row justify-center sm:justify-end items-center my-4">
              <button
                disabled={+page === 1}
                onClick={() => setSearchParams({ page: +page - 1 })}
                className="px-2 mr-1 bg-neutral-500 text-white h-[24px] flex justify-center items-center disabled:cursor-not-allowed disabled:bg-neutral-500 cursor-pointer"
              >
                <BsChevronDoubleLeft size={16} />
              </button>

              {showPagingIndex(page, Math.ceil(list.length / 10), 5).map(
                (p) => (
                  <div
                    onClick={() => setSearchParams({ page: p })}
                    key={p}
                    className={`mx-1 ${
                      +page === +p
                        ? "bg-slate-900 text-white"
                        : "hover:bg-slate-900 hover:text-white text-slate-900"
                    } cursor-pointer text-xs w-[24px] h-[24px] flex justify-center items-center rounded-ful`}
                  >
                    {p}
                  </div>
                )
              )}

              <button
                disabled={+page === Math.ceil(list.length / 10)}
                onClick={() => setSearchParams({ page: +page + 1 })}
                className="px-2 ml-1 bg-neutral-500 text-white h-[24px] flex justify-center items-center disabled:cursor-not-allowed disabled:bg-neutral-500 cursor-pointer"
              >
                <BsChevronDoubleRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
