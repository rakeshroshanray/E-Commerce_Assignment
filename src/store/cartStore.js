import { create } from "zustand";
import { persistStore, saveToStorage } from "../utils/persistStore";

const useCartStore = create((set) => ({
  items: persistStore("cartItems", []),
  totalAmount: persistStore("cartTotal", 0),

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      const updatedState = {
        items: [...state.items],
        totalAmount: Math.ceil(state.totalAmount + item.price * item.quantity),
      };
      saveToStorage("cartItems", updatedState.items);
      saveToStorage("cartTotal", updatedState.totalAmount);
      return updatedState;
    }),

  removeItem: (id) =>
    set((state) => {
      const filteredItems = state.items.filter((item) => item.id !== id);
      const removedItem = state.items.find((item) => item.id === id);
      const newTotal = removedItem
        ? state.totalAmount - removedItem.price * removedItem.quantity
        : state.totalAmount;

      const updatedState = { items: filteredItems, totalAmount: newTotal };
      saveToStorage("cartItems", updatedState.items);
      saveToStorage("cartTotal", updatedState.totalAmount);
      return updatedState;
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === id) {
          const quantityDiff = quantity - item.quantity;
          item.quantity = quantity;
          state.totalAmount += item.price * quantityDiff;
        }
        return item;
      });

      const updatedState = { items: updatedItems, totalAmount: state.totalAmount };
      saveToStorage("cartItems", updatedState.items);
      saveToStorage("cartTotal", updatedState.totalAmount);
      return updatedState;
    }),
}));

export default useCartStore;
