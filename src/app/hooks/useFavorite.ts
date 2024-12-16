import React, { useCallback, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User } from "@prisma/client";

import useLoginModal from "./useLoginModal";

interface IUseFavoriteProps {
  listingId: string;
  currentUser?: Partial<User> | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavoriteProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Update favorite success!");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, loginModal, hasFavorite, router, listingId]
  );

  return {
    hasFavorite,
    toggleFavorite,
  };
};

export default useFavorite;
