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
    <div className="flex flex-row justify-center gap-2 my-3">
      <label htmlFor={name} className="capitalize my-auto ">
        {label}
      </label>
      <input
        id={name}
        className={`rounded-xl border-2 p-3 border-[#7928d2] focus:outline-none focus:ring-[#c37fe0] focus:ring-1`}
        type={type}
        min={1}
        placeholder={placeholder}
        name={name}
        defaultValue={!value && type === Number ? 1 : value}
        onChange={(e) => onChange(e)}
        required={required}
      />
    </div>
  );
};
