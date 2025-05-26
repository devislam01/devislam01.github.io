import { defineStore } from "pinia";
import axios from "@/utils/request.js";

export const useOrderStore = defineStore("orders", {
  state: () => {
    error: null;
    data: null;
  },
  actions: {
    async getOrderSummaries() {
      const response = await axios.get(`order/orderSummaries`);
      this.data = response.data;
      return response.data;
    },
    async checkout(payload) {
      const response = await axios.post(`order/checkout`, payload);
      this.data = response.data;
      return response.data;
    },
    async confirmOrder(payload) {
      const response = await axios.post(`order/confirmOrder`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  },
});
