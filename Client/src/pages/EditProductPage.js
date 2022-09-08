import React, { useState, useEffect, useContext } from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import {
  allProductsApi,
  editProductApi,
  singleProductApi,
} from "../apis/productApis";
import { AppContext } from "../context/AppContext";
import showToast from "../components/Toast";
import { useNavigate, useParams } from "react-router-dom";

const EditProductPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "Category 1",
      price: "",
      stock: "",
      image: "",
    },
    mode: "all",
  });

  const image = watch("image");

  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const handleAddProduct = async (formData) => {
    const data = await editProductApi(
      params.product_id,
      formData,
      state.userData.token
    );
    if (!data.error) {
      dispatch({ type: "UPDATE_PRODUCT", payload: data });
      showToast("Product Updated", "success", 4000);
      navigate("/");
    } else {
      showToast(data.error, "error", 4000);
    }
    navigate("/");
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);
      const data = await singleProductApi(
        params.product_id,
        state.userData.Token
      );
      if (!data.error) {
        setValue("title", data.title);
        setValue("description", data.description);
        setValue("category", data.category);
        setValue("price", data.price);
        setValue("stock", data.stock);
        setValue("image", data.image);
      } else setError(data.error);
      setLoading(false);
    })();
  }, [params.product_id, setValue, state.userData]);

  useEffect(() => {
    if (state.userData?.isAdmin) {
      return;
    } else {
      navigate("/");
    }
  }, [navigate, state.userData]);

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
    <div className="bg-slate-100 h-full w-full flex-1 px-4">
      <div className="flex flex-col mx-auto max-w-5xl w-full">
        <div className="font-bold text-lg my-2">Add Product</div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-4 gap-y-2 w-full bg-white rounded-sm p-4">
          <div className="col-span-3 flex flex-col gap-2">
            <Input
              label="Product Title"
              type="text"
              {...register("title", {
                required: "Title is Required",
              })}
              error={errors.title?.message}
            />
            <Input
              label="Product Category"
              type="select"
              options={[
                { value: "Category 1", label: "Category 1" },
                { value: "Category 2", label: "Category 2" },
                { value: "Category 3", label: "Category 3" },
                { value: "Category 4", label: "Category 4" },
                { value: "Category 5", label: "Category 5" },
              ]}
              {...register("category", {
                required: "Category is Required",
              })}
              error={errors.category?.message}
            />
            <Input
              label="Product Description"
              type="textarea"
              className="h-16 min-h-[64px]"
              {...register("description", {
                required: "Description is Required",
              })}
              error={errors.description?.message}
            />
            <Input
              label="Product Price"
              type="number"
              {...register("price", {
                required: "Price is Required",
                min: {
                  value: 0.01,
                  message: "Price must be At least 0.01",
                },
              })}
              error={errors.price?.message}
            />

            <Input
              label="Stock"
              type="number"
              {...register("stock", {
                required: "Stock is Required",
                min: {
                  value: 1,
                  message: "Stock must be At least 1",
                },
              })}
              error={errors.stock?.message}
            />
          </div>

          <div className="col-span-3 flex flex-col gap-2">
            <Input
              label="Product Image Link"
              type="text"
              placeholder="https://"
              {...register("image", {
                required: "Image is Required",
              })}
              error={errors.image?.message}
            />

            <img
              className="h-64 object-contain w-64 bg-slate-300 rounded-sm p-2"
              src={image}
              alt="NO_IMAGE"
            />
          </div>
        </div>

        <div className="flex flex-row w-full justify-end py-2">
          <Button
            className="bg-[#10AEC2] hover:bg-[#158BB8]"
            onClick={handleSubmit(handleAddProduct)}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
