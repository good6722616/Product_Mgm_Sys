import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const inputClassName = `p-2 outline-none text-sm text-slate-800 rounded-sm bg-slate-200 ${
    props.error ? "bg-red-100" : " focus:bg-slate-300"
  } ${props.className}`;

  const errorClassName = "text-red-500 text-xs italic";

  return (
    <div className="w-full flex flex-col">
      {props.label && <label>{props.label}</label>}
      {props.type === "textarea" ? (
        <textarea ref={ref} {...props} className={inputClassName} />
      ) : props.type === "select" ? (
        <select ref={ref} {...props} className={inputClassName}>
          {props.options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input ref={ref} {...props} className={inputClassName} />
      )}
      {props.error && <p className={errorClassName}>{props.error}</p>}
    </div>
  );
});

export default Input;
