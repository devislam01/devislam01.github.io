import { defineStore } from "pinia";
import axios from "@/utils/request.js";

export const useProductStore = defineStore("product", {
  state: () => ({
    error: null,
    data: null,
  }),
  actions: {
    async getProducts(payload) {
      return await axios.post(`admin/product/productList`, payload);
    },
  },
});
