import { defineStore } from "pinia";
import axios from "@/utils/request.js";

export const useOrderStore = defineStore("order", {
  state: () => ({
    data: null,
  }),
  actions: {
    async getOrders(payload) {
      return axios.post(`admin/order/orderList`, payload);
    },
  },
});
