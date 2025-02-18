import React from "react";

export const Input = ({
  type,
  name,
  label,
  value,
  required,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col my-3">
      <label htmlFor={name} className="capitalize text-lightBlack">
        {label}
      </label>
      <input
        id={name}
        className={`rounded-xl border-2 p-3 border-s-gray-300
        focus:outline-0 focus:border-s-gray-300 focus:ring-1 focus:ring-s-gray-300 focus:bg-white
         ${value ? 'invalid:text-red-400 invalid:border-red-400' : '' } focus:invalid:ring-red-400 focus:invalid:border-red-400 ease-in duration-200`}
        type={type}
        placeholder={placeholder}
        name={name}
        defaultValue={value}
        onChange={(e) => onChange(e)}
        required={required}
      />
    </div>
  );
};
