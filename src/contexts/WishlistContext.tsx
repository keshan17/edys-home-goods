import { createContext, useContext, useState, ReactNode } from "react";

export interface WishlistItem {
  name: string;
  price: string;
  image: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  toggleItem: (item: WishlistItem) => void;
  isInWishlist: (name: string) => boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = (item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.name === item.name);
      if (exists) return prev.filter((i) => i.name !== item.name);
      return [...prev, item];
    });
  };

  const isInWishlist = (name: string) => items.some((i) => i.name === name);

  return (
    <WishlistContext.Provider value={{ items, toggleItem, isInWishlist, isOpen, setIsOpen }}>
      {children}
    </WishlistContext.Provider>
  );
};
