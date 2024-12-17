import { create } from "zustand";

interface ISearchModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSearchModal = create<ISearchModal>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export default useSearchModal;
