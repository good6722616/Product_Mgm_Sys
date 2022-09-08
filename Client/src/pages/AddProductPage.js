import React, { useEffect, useContext } from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { addProductApi, allProductsApi } from "../apis/productApis";
import { AppContext } from "../context/AppContext";
import showToast from "../components/Toast";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "Category 1",
      price: 100,
      stock: 10,
      image: "",
    },
    mode: "all",
  });

  const image = watch("image");

  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const handleAddProduct = async (formData) => {
    const data = await addProductApi(formData, state.userData.token);
    if (!data.error) {
      dispatch({ type: "ADD_PRODUCT", payload: data });
      showToast("Product Added", "success", 4000);
      reset();
      navigate("/");
    } else {
      showToast(data.error, "error", 4000);
    }
  };

  useEffect(() => {
    if (state.userData?.isAdmin) {
      return;
    } else {
      navigate("/");
    }
  }, [navigate, state.userData]);
  return (
    <div className="bg-slate-50 h-full w-full flex-1 px-4">
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
            className="bg-[#8ABCD1] hover:bg-[#158BB8]"
            onClick={handleSubmit(handleAddProduct)}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
