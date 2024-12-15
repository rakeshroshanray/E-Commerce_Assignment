import { create } from "zustand";
import { persistStore, saveToStorage } from "../utils/persistStore";

const useAuthStore = create((set) => ({
  user: persistStore("user", null), 
  isAuthenticated: persistStore("isAuthenticated", false),

  login: (userData) => {
    set({
      user: userData,
      isAuthenticated: true,
    });
    saveToStorage("user", userData);
    saveToStorage("isAuthenticated", true);
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  },

  initializeAuth: () => {
    const storedUser = persistStore("user", null);
    const isAuthenticated = persistStore("isAuthenticated", false);

    set({
      user: storedUser,
      isAuthenticated: isAuthenticated,
    });
  },
}));

export default useAuthStore;
