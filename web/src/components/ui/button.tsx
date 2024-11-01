import React from "react";
import cn from "classnames";

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};
const Button: React.FC<Props> = ({ children, className, onClick, type }) => {
  return (
    <button
      type={type || "button"}
      className={cn(
        " bg-blue-500 text-white w-full py-2 rounded-lg  hover:bg-opacity-90",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
