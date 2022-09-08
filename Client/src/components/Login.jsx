import React, { useState } from "react";
import Button from "./Button";
import ForgetPasswordModal from "./Modals/ForgetPasswordModal";
import SigninModal from "./Modals/SigninModal";
import SignupModal from "./Modals/SignupModal";
import AdminLoginModal from "./Modals/AdminLoginModal";
import UpdatePasswordSuccessModal from "./Modals/UpdatePasswordSuccessModal";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Login = () => {
  // const [modal, setModal] = useState(null);
  const { updateModal, state } = useContext(AppContext);

  return (
    <>
      <Button
        className="bg-[#10AEC2] hover:bg-[#158BB8]"
        onClick={() => updateModal("signin")}
      >
        Login
      </Button>

      <SigninModal show={state.modal === "signin"} />
      <SignupModal show={state.modal === "signup"} />
      <ForgetPasswordModal show={state.modal === "forget"} />
      <AdminLoginModal show={state.modal === "admin"} />
      <UpdatePasswordSuccessModal show={state.modal === "success"} />
    </>
  );
};

export default Login;
