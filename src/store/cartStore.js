import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [], 
  totalAmount: 0, 

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      return {
        items: [...state.items],
        totalAmount: state.totalAmount + item.price * item.quantity,
      };
    }),

  removeItem: (id) =>
    set((state) => {
      const filteredItems = state.items.filter((item) => item.id !== id);
      const removedItem = state.items.find((item) => item.id === id);
      const newTotal = removedItem
        ? state.totalAmount - removedItem.price * removedItem.quantity
        : state.totalAmount;

      return { items: filteredItems, totalAmount: newTotal };
    }),

  // Update item quantity
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

      return { items: updatedItems, totalAmount: state.totalAmount };
    }),
}));

export default useCartStore;
