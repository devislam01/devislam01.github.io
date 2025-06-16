import { defineStore } from "pinia";
import axios from "@/utils/request.js";

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    data: null,
  }),
  actions: {
    async getPayments(payload) {
      return await axios.post(`admin/payment/paymentList`, payload);
    },
    async getPaymentDetail(payload) {
      return await axios.post(`admin/payment/paymentDetail`, payload);
    },
    async updatePayment(payload) {
      return await axios.post(`admin/payment/updatePayment`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  },
});
