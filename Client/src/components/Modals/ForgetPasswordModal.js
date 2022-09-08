import React, { useContext } from "react";
import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX_PATTERN } from "../../utils/constants";
import { AppContext } from "../../context/AppContext";
import { resetPasswordApi } from "../../apis/userApis";
import showToast from "../Toast";

const ForgetPasswordModal = ({ show }) => {
  const { updateModal } = useContext(AppContext);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "all",
  });

  const email = watch("email");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const data = await resetPasswordApi(email);
    if (!data.error) {
      updateModal("success");
    } else {
      showToast(data.error, "error", 3000);
    }
  };

  return (
    <Modal
      body={
        <div>
          <div className="text-center text-sm mb-10">
            Enter your Email. We will send you recovery link.
          </div>
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

            <Button
              className="bg-[#10AEC2] hover:bg-[#158BB8]"
              disabled={Object.keys(errors).length > 0 || email.trim("") === ""}
              onClick={handlePasswordReset}
            >
              Update Password
            </Button>

            <span
              onClick={() => updateModal("signin")}
              className="text-sky-600 cursor-pointer hover:underline mt-6 mx-auto w-fit"
            >
              Back
            </span>
          </form>
        </div>
      }
      show={show}
      title="Update Your Password"
    />
  );
};

export default ForgetPasswordModal;
