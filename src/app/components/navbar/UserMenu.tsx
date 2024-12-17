"use client";

import { BiGlobe } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem, { MenuItemProps } from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user?: Partial<User> | null;
}

const UserMenu = ({ user }: UserMenuProps) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const router = useRouter();

  const handleToggleMenu = useCallback(() => {
    setIsOpenMenu((value) => !value);
  }, []);

  const publicItems: MenuItemProps[] = [
    {
      label: "Sign up",
      onClick: () => {
        setIsOpenMenu(false);
        registerModal.onOpen();
      },
      bold: true,
    },
    {
      label: "Log in",
      onClick: () => {
        setIsOpenMenu(false);
        loginModal.onOpen();
      },
    },
  ];

  const privateItems: MenuItemProps[] = [
    {
      label: "Favorites",
      onClick: () => {
        router.push("/favorites");
        handleToggleMenu();
      },
    },

    {
      label: "My reservations",
      onClick: () => {
        router.push("/reservations");
        handleToggleMenu();
      },
    },
    {
      label: "Trips",
      onClick: () => {
        router.push("/trips");
        handleToggleMenu();
      },
    },
    {
      label: "Properties",
      onClick: () => {
        router.push("/properties");
        handleToggleMenu();
      },
    },
    {
      label: "Airbnb your home",
      onClick: () => {
        rentModal.onOpen();
        handleToggleMenu();
      },
      separator: true,
    },
    {
      label: "Log out",
      onClick: () => {
        setIsOpenMenu(false);
        signOut();
      },
    },
  ];

  const onRent = useCallback(() => {
    if (!user) return loginModal.onOpen();

    rentModal.onOpen();
  }, []);

  return (
    <div className="relative flex-1">
      <div className="flex flex-row items-center justify-end">
        <div
          className="hidden lg:block text-sm font-semibold p-3 hover:bg-neutral-100 rounded-full cursor-pointer transition"
          onClick={onRent}
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
            <Avatar src={user?.image} />
          </div>
        </div>
      </div>

      {isOpenMenu && (
        <div className="absolute py-2 shadow-md rounded-xl right-0 top-12 text-sm bg-white w-3/4 md:w-[240px]">
          {user
            ? privateItems.map((props, index) => (
                <MenuItem {...props} key={`menu_item_${index}`} />
              ))
            : publicItems.map((props, index) => (
                <MenuItem {...props} key={`menu_item_${index}`} />
              ))}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
