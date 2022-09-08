import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import RatingStars from "../components/RatingStars";
import { deleteProductApi, singleProductApi } from "../apis/productApis";
import Button from "../components/Button";
import { AppContext } from "../context/AppContext";
import showToast from "../components/Toast";
import DeleteProductModal from "../components/Modals/DeleteProductModal";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { state, dispatch, updateModal } = useContext(AppContext);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };
  const handleRemoveFromCart = () => {
    dispatch({
      type: "REMOVE_ONE_FROM_CART",
      payload: product,
    });
  };

  const handleDelete = async () => {
    const data = await deleteProductApi(product._id, state.userData.token);
    if (!data.error) {
      dispatch({ type: "DELETE_PRODUCT", payload: product._id });
      navigate("/");
      updateModal(null);
      showToast("Product deleted successfully", "success", 3000);
    } else {
      showToast("Error deleting product", "error", 3000);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);
      const data = await singleProductApi(params.product_id, state.authToken);
      if (!data.error) setProduct(data);
      else setError(data.error);
      setLoading(false);
    })();
  }, [state.authToken, params.product_id]);

  if (error) {
    return (
      <div className="flex-1 flex flex-col w-full justify-center items-center">
        {error}
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex-1 flex flex-col w-full justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white h-full w-full flex-1 px-4">
      <div className="flex flex-col mx-auto max-w-5xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="border-[1px] border-slate-800 sm:aspect-square p-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-sm italic mb-1">
              {product.category.toUpperCase()}
            </div>
            <div className="font-bold text-lg mb-1">{product.title}</div>
            <div className="text-lg mb-1">
              Price:{" "}
              <span className="italic font-semibold">${product.price}</span>
            </div>
            {/* <div className="py-1 flex flex-row items-center gap-2">
              <div>Rating: </div>
              <RatingStars rating={product.rating} color="#d80" size={13} />
            </div> */}
            <div className="border-y-[1px] py-2 border-slate-800 text-sm">
              {product.description}
            </div>
            <div className="flex flex-row gap-2 my-4">
              {state.cartItems.find(
                (item) => item._id === params.product_id
              ) ? (
                <div className="flex-row flex bg-sky-600 rounded-sm">
                  <Button onClick={handleRemoveFromCart}>-</Button>
                  <div className="flex-1 px-4 flex justify-center items-center text-center h-full text-black">
                    {
                      state.cartItems.find(
                        (item) => item._id === params.product_id
                      ).qty
                    }
                  </div>
                  <Button onClick={handleAddToCart}>+</Button>
                </div>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  className="bg-[#10AEC2] hover:bg-[#158BB8] py-2"
                >
                  Add to cart
                </Button>
              )}

              {state.userData?.isAdmin && (
                <>
                  <Button
                    onClick={() =>
                      navigate(`/edit-product/${params.product_id}`)
                    }
                    className="bg-[#10AEC2] hover:bg-[#158BB8] py-2"
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() => updateModal("deleteProduct")}
                    className="bg-[#10AEC2] hover:bg-[#158BB8] py-2"
                  >
                    Delete
                  </Button>
                  <DeleteProductModal onDelete={handleDelete} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
