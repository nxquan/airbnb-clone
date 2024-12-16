import { User } from "@prisma/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: Partial<User> | null;
}

const HeartButton = ({ currentUser, listingId }: HeartButtonProps) => {
  const { hasFavorite, toggleFavorite } = useFavorite({
    currentUser,
    listingId,
  });

  return (
    <div onClick={toggleFavorite} className="relative cursor-pointer">
      <AiOutlineHeart size={28} className="absolute  fill-white" />
      <AiFillHeart
        size={28}
        className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
