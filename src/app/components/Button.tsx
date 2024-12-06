import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  primary?: boolean;
  small?: boolean;
  icon?: IconType;
  iconColor?: string;
}

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  primary,
  icon: Icon,
  iconColor,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 w-full px-[23px] py-3 text-base font-bold
        border border-[bg-rose-500]
        ${primary ? "bg-rose-500 text-white" : ""}
        ${outline ? "bg-white text-black border border-black" : ""}
        ${small ? "py-1 text-sm font-light" : ""}
        `}
    >
      {Icon && (
        <Icon
          size={24}
          className="absolute left-3"
          color={iconColor ?? "black"}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
