"use client";

import { IconType } from "react-icons";

export interface CategoryInputProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (label: string) => void;
}

const CategoryInput = ({
  icon: Icon,
  label,
  onClick,
  selected,
}: CategoryInputProps) => {
  return (
    <div
      className={`rounded border-2 p-4 flex flex-col gap-3 transition cursor-pointer group ${
        selected ? "border-black" : "border-neutral-300 hover:border-black"
      }`}
      onClick={() => onClick(label)}
    >
      {Icon && (
        <Icon
          size={24}
          className={` 
            ${
              selected
                ? "text-black"
                : "text-neutral-500 group-hover:text-black"
            }`}
        />
      )}
      <div
        className={`font-bold text-sm ${
          selected
            ? "text-black"
            : "text-neutral-600 group-hover:text-black group-hover:text-black"
        } `}
      >
        {label}
      </div>
    </div>
  );
};

export default CategoryInput;
