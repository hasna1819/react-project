import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useOrderStore = create(
  persist(
    (set, get) => ({
      orderDetails: [],

      // Add an order (normalize _id to id)
      addOrder: (order) =>
        set((state) => ({
          orderDetails: [
            ...state.orderDetails,
            { ...order, id: order.id || order._id },
          ],
        })),

      removeOrder: (orderId) =>
        set((state) => ({
          orderDetails: state.orderDetails.filter((o) => o.id !== orderId),
        })),

      updateOrder: (orderId, updatedData) =>
        set((state) => ({
          orderDetails: state.orderDetails.map((o) =>
            o.id === orderId ? { ...o, ...updatedData } : o
          ),
        })),

      clearOrders: () => set({ orderDetails: [] }),
    }),
    {
      name: 'order-storage', // localStorage key
      getStorage: () => localStorage,
    }
  )
);

export default useOrderStore;
