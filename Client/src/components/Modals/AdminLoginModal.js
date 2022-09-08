import React, { useContext } from "react";
import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX_PATTERN } from "../../utils/constants";
import { adminLoginApi } from "../../apis/userApis";
import { AppContext } from "../../context/AppContext";
import showToast from "../Toast";

const SigninModal = ({ show }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const email = watch("email");
  const password = watch("password");

  const { dispatch, updateModal } = useContext(AppContext);

  const handleSignin = async ({ email, password }) => {
    const data = await adminLoginApi(email, password);
    if (!data.error) {
      updateModal(null);
      dispatch({ type: "LOGIN", payload: data });
    } else {
      showToast(data.error, "error", 3000);
    }
  };

  return (
    <Modal
      body={
        <div>
          <form className="flex flex-col gap-2">
            <Input
              label="Email"
              {...register("email", {
                required: "Email is Required",
                pattern: {
                  value: EMAIL_REGEX_PATTERN,
                  message: "Please enter a valid email",
                },
              })}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              error={errors.password?.message}
            />
            <Button
              className="bg-[#10AEC2] hover:bg-[#158BB8]"
              onClick={handleSubmit(handleSignin)}
              disabled={
                Object.keys(errors).length > 0 ||
                email.trim("") === "" ||
                password.trim("") === ""
              }
            >
              Sign In
            </Button>
          </form>

          <div className="flex flex-col mt-4 items-center">
            <div className="text-sm my-1">
              Don't have an account?{" "}
              <span
                onClick={() => updateModal("signup")}
                className="text-sky-600 cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </div>
            <div className="text-sm my-1">
              Forgot your password?{" "}
              <span
                onClick={() => updateModal("forget")}
                className="text-sky-600 cursor-pointer hover:underline"
              >
                Reset
              </span>
            </div>
          </div>
        </div>
      }
      show={show}
      title="Sign In To Your Account (Admin)"
    />
  );
};

export default SigninModal;
