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
    async getProductDetails(payload) {
      return await axios.post(`admin/product/productDetail`, payload);
    },
    async updateProductDetails(payload) {
      return await axios.post(`admin/product/updateProduct`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    async unPublishProduct(payload) {
      return await axios.post(`admin/product/unpublish-product`, payload);
    },
    async publishProduct(payload) {
      return await axios.post(`admin/product/publish-product`, payload);
    },
  },
});
