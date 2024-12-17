/* eslint-disable react/display-name */
"use client";
import React, { ChangeEvent, forwardRef, useState } from "react";
import cn from "classnames";
import { Lucide } from "../common";

type Props = {
  type?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  error?: string;
  // onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any; // Allows for any additional props
};

export const Input = forwardRef(
  (
    {
      type = "text",
      label,
      name,
      placeholder,
      value,
      error,
      className = "",
      labelClassName = "",
      inputClassName = "",
      onChange,
      ...rest
    }: Props,
    ref: any
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const renderEyeButton = () => {
      return (
        type === "password" && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 [&_svg]:text-[#84818a]"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <Lucide name={!showPassword ? "EyeClosed" : "Eye"} size={16} />
          </button>
        )
      );
    };

    return (
      <div className={cn(className)}>
        {label && (
          <label
            htmlFor={name}
            className={cn(
              `block mb-1 ml-1 text-xs text-dash_black`,
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? "text" : type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={cn(
              `w-full text-xs font-medium py-2 px-2 rounded-md border outline-none focus:border-dash_red `,
              inputClassName,
              {
                "border-dash_red": !!error,
              }
            )}
            {...rest}
          />
          {renderEyeButton()}
        </div>
        {error && <small className="text-dash_red ml-1">{error}</small>}
      </div>
    );
  }
);
