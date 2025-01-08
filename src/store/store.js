import { create } from "zustand";

const useStore = create((set) => ({
  items: [],
  fetchItems: async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    set({ items: data });
  },
}));

export default useStore;
