"use client";

import { BiGlobe } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const UserMenu = () => {
  const registerModal = useRegisterModal();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleToggleMenu = useCallback(() => {
    setIsOpenMenu((value) => !value);
  }, []);

  const items = [
    {
      label: "Sign up",
      onClick: () => {
        registerModal.onOpen();
      },
      bold: true,
    },
    {
      label: "Log in",
      onClick: () => {},
      separator: true,
    },
    {
      label: "Gift cards",
      onClick: () => {},
    },
    {
      label: "Airbnb your home",
      onClick: () => {},
    },
    {
      label: "Hosts an experience",
      onClick: () => {},
    },
    {
      label: "Help center",
      onClick: () => {},
    },
  ];

  return (
    <div className="relative flex-1">
      <div className="flex flex-row items-center justify-end">
        <div
          className="hidden lg:block text-sm font-semibold p-3 hover:bg-neutral-100 rounded-full cursor-pointer transition"
          onClick={() => {}}
        >
          Airbnb your home
        </div>
        <div className="hidden lg:block p-3 hover:bg-neutral-100 rounded-full cursor-pointer transition">
          <BiGlobe size={18} />
        </div>
        <div
          className="flex flex-row items-center gap-3 rounded-full shadow-sm hover:shadow border p-2 sm:pl-[14px] ml-2 cursor-pointer"
          onClick={handleToggleMenu}
        >
          <AiOutlineMenu size={18} />
          <div className="hidden sm:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpenMenu && (
        <div className="absolute py-2 shadow-md rounded-xl right-0 top-12 text-sm bg-white w-3/4 md:w-[240px]">
          {items.map((props, index) => (
            <MenuItem {...props} key={`menu_item_${index}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
