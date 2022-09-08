import React from "react";

const Button = (props) => {
  return (
    <button
      {...props}
      className={`border-[1px] px-3 py-1 outline-none border-none text-sm text-slate-100 bg-blue-400 rounded-sm disabled:bg-gray-500 disabled:cursor-not-allowed text-ellipsis whitespace-nowrap ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
