import React, { useContext } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { AppContext } from "../context/AppContext";

const Modal = ({ title, body, footer, className, show }) => {
  const { updateModal } = useContext(AppContext);
  if (!show) {
    return null;
  }
  return (
    // Modal Background Covering the entire page
    <div className="absolute h-screen w-screen top-0 left-0 bg-slate-800 bg-opacity-10 backdrop-blur-[1px] flex flex-col justify-center items-center z-40">
      {/* Modal Body */}
      <div
        className={`w-[90%] max-w-[400px] max-h-[90vh] overflow-y-hidden bg-white rounded-md shadow-md p-2 flex flex-col justify-between items-stretch z-50 ${className}`}
      >
        {/* Header */}
        <div className="flex flex-row py-2 px-2 w-full justify-between items-center border-b-[1px] border-b-slate-400">
          {/* Title */}
          <div className="font-bold text-slate-800 ">{title || " "}</div>

          {/* Close Button */}
          <div
            onClick={() => updateModal(null)}
            className="text-slate-800 cursor-pointer"
          >
            <IoCloseOutline size={24} />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 py-2 px-2 flex flex-col overflow-y-auto">
          {body}
        </div>

        {/* Footer */}
        <div>{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
