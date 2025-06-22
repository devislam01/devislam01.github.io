import { defineStore } from "pinia";
import axios from "@/utils/request.js";

export const useProductStore = defineStore("products", {
  state: () => ({
    productList: [],
    error: null,
    data: null,
    filters: {
      search: "",
      categoryID: null,
    },
    pagination: {
      pageNumber: 1,
      pageSize: 9,
      totalRecord: 0,
    },
    cartCount: 0,
  }),
  persist: {
    pick: ["filters", "pagination"],
  },
  actions: {
    async getProductList(payload = {}) {
      if (typeof payload.search !== "undefined") {
        this.filters.search = payload.search;
      } else if (this.filters.search) {
        payload.search = this.filters.search;
      }

      if (typeof payload.categoryID !== "undefined") {
        this.filters.categoryID = payload.categoryID;
      } else if (this.filters.categoryID) {
        payload.categoryID = this.filters.categoryID;
      }

      const response = await axios.post(`product/getProductList`, payload);

      this.productList = response.data.data;
      this.pagination = response.data.pagination;

      return response.data;
    },
    async getSpecificProductList() {
      const response = await axios.get(`product/getFilteredProductList`);
      this.data = response.data;
      return response.data;
    },
    async getProductDetail(productID) {
      const response = await axios.post(`product/getProductDetail`, productID);
      this.data = response.data;
      return response.data;
    },
    async updateProduct(payload) {
      return await axios.post(`product/updateProduct`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    async deleteProduct(payload) {
      return await axios.post(`product/deleteProduct`, payload);
    },
    async addProduct(payload) {
      return await axios.post("/product/addProduct", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    async shoppingCart() {
      const response = await axios.get(`cart/shoppingCart`);

      this.cartCount = response.data.length;
      return response.data;
    },
    async addtoCart(payload) {
      return await axios.post(`/cart/addtoCart`, payload);
    },
    async updateCart(payload) {
      return await axios.post(`/cart/updateCart`, payload);
    },
    async getFeedbackList(payload) {
      var response = await axios.post(`order/feedback`, payload);
      return response.data;
    },
  },
});
