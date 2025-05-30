import { defineStore } from "pinia";
import axios from "@/utils/request.js";

export const useOrderStore = defineStore("orders", {
  state: () => ({
    error: null,
    data: null,
  }),
  actions: {
    async getOrderSummaries() {
      const response = await axios.get(`order/orderSummaries`);
      this.data = response.data;
      return response.data;
    },
    async checkout(payload) {
      const response = await axios.post(`order/checkout`, payload);
    //   this.data = response.data;
    //   return response.data;
      return response;
    },
    async confirmOrder(payload) {
      return await axios.post(`order/confirmOrder`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    async getBuyerOrder() {
      const response = await axios.get(`order/as-buyer`);
      this.data = response.data;
      return response.data;
    },
    async getSellerOrder() {
      const response = await axios.get(`order/as-seller`);
      this.data = response.data;
      return response.data;
    },
  },
});
