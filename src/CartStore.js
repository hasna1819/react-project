// cartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      // Add product to cart
      addToCart: (product, quantity = 1) => {
        const existingItem = get().cart.find(item => item.id === product.id);
        if (existingItem) {
          set({
            cart: get().cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...product, quantity }],
          });
        }
      },

      // Remove product from cart
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id !== productId) });
      },

      // Get total items
      getTotalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),

      // Get total price
      getTotalPrice: () => get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage', // key for localStorage
      getStorage: () => localStorage, // optional, defaults to localStorage
    }
  )
);

export default useCartStore;
