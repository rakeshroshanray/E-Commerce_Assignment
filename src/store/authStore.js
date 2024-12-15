import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null, 
  isAuthenticated: false, 

  
  login: (userData) => {
    set({
      user: userData,
      isAuthenticated: true,
    });
    localStorage.setItem("user", JSON.stringify(userData)); // Persist user in localStorage
  },

 
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("user"); 
  },

  initializeAuth: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      });
    }
  },
}));

export default useAuthStore;
