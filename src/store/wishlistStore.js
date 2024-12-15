import { create } from "zustand";
import { persistStore, saveToStorage } from "../utils/persistStore"; 

const useWishlistStore = create((set, get) => ({

  wishlistItems: persistStore("wishlistItems", []),

  
  addToWishlist: (product) =>
    set((state) => {
      const updatedWishlist = [...state.wishlistItems, product];
      saveToStorage("wishlistItems", updatedWishlist); 
      return { wishlistItems: updatedWishlist };
    }),

  
  removeFromWishlist: (id) =>
    set((state) => {
      const updatedWishlist = state.wishlistItems.filter((item) => item.id !== id);
      saveToStorage("wishlistItems", updatedWishlist); 
      return { wishlistItems: updatedWishlist };
    }),

  isInWishlist: (id) => {
    const { wishlistItems } = get();
    return wishlistItems.some((item) => item.id === id);
  },
}));

export default useWishlistStore;
