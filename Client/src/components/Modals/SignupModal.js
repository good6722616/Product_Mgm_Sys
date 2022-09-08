import React, { useContext } from "react";
import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX_PATTERN } from "../../utils/constants";
import { signUpApi } from "../../apis/userApis";
import { AppContext } from "../../context/AppContext";
import showToast from "../Toast";

const SignupModal = ({ show }) => {
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

  const handleSignup = async ({ email, password }) => {
    const data = await signUpApi(email, password);
    if (!data.error) {
      updateModal(false);
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
              type="email"
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
              onClick={handleSubmit(handleSignup)}
              disabled={
                Object.keys(errors).length > 0 ||
                email.trim("") === "" ||
                password.trim("") === ""
              }
            >
              Sign Up
            </Button>
          </form>

          <div className="flex flex-col mt-4 items-center">
            <div className="text-sm my-1">
              Already have an Account?{" "}
              <span
                onClick={() => updateModal("signin")}
                className="text-sky-600 cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </div>
          </div>
        </div>
      }
      show={show}
      title="Sign Up An Account"
    />
  );
};

export default SignupModal;
