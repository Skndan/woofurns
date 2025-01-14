import { Product } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware"

interface useProductStore {
    product: Product | any;
    setProduct: (order: any) => void;
}

export const useProductStore = create(persist<useProductStore>((set, get) => ({
    product: {},
    setProduct: (product: Product) => set({ product: product }),
}), { name: 'order_tag' }))


