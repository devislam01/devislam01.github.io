import { defineStore } from "pinia";
import axios from "@/utils/request.js";

export const useAdminStore = defineStore("admin", {
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
  },
});
