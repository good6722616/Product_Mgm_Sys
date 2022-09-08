import React from "react";
import Modal from "../Modal";
import { MdMarkEmailRead } from "react-icons/md";

const UpdatePasswordSuccessModal = ({ show }) => {
  return (
    <Modal
      body={
        <div>
          <div className="text-sky-600 text-center w-full flex justify-center">
            <MdMarkEmailRead size={44} />
          </div>
          <div className="text-center text-sm mb-10 max-w-[300px] mx-auto">
            We have sent the update password link to your email, please check
            that!
          </div>
        </div>
      }
      show={show}
      title="Link Sent"
    />
  );
};

export default UpdatePasswordSuccessModal;
