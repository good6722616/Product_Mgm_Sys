import React from "react";
import { toast } from "react-hot-toast";

const showToast = (text, type, duration) => {
  let Id = Math.random() * 9999999999999;
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "top-0 bg-opacity-100" : "-top-32 bg-opacity-0"
        } absolute transition-all duration-1000 p-4 ${
          type === "error"
            ? "bg-red-600"
            : type === "success"
            ? "bg-lime-600"
            : "bg-zinc-800"
        } rounded-md`}
      >
        <div className={"text-white"}>{text}</div>
      </div>
    ),
    {
      id: Id,
      position: "top-center",
      duration: duration + 20,
    }
  );

  setTimeout(() => {
    toast.remove(Id);
  }, duration);
};

export default showToast;
