import { defineStore } from "pinia";
import axios from "@/utils/request.js";

export const useOrderStore = defineStore("orders", {
  state: () => ({
    error: null,
    data: null,
  }),
  actions: {
    async getOrderSummaries(productIDs) {
      const response = await axios.get(`order/orderSummaries`, {
        params: {
          productID: productIDs,
        },
        paramsSerializer: (params) => {
          const ids = params.productID?.productID;

          if (Array.isArray(ids)) {
            return ids.map((id) => `productID=${id}`).join("&");
          }

          return "";
        },
      });
      this.data = response.data;
      return response.data;
    },
    async checkout(payload) {
      return await axios.post(`order/checkout`, payload);
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
    async requestToCancelOrder(payload) {
      return await axios.post(`order/request_cancelOrderItem`, payload);
    },
    async requestToCancelWholeOrder(payload) {
      return await axios.post(`order/request_cancelOrder`, payload);
    },
    async confirmCancel(payload) {
      return await axios.post(`order/confirm-cancel`, payload);
    },
    async rejectCancel(payload) {
      return await axios.post(`order/reject-cancel`, payload);
    },
    async markComplete(payload) {
      return await axios.post(`order/mark-complete`, payload);
    },
    async markOrderComplete(payload) {
      return await axios.post(`order/mark-order-complete`, payload);
    },
    async rateProduct(payload) {
      return await axios.post(`order/rate-product`, payload);
    },
    async feedback(payload) {
      return await axios.post(`order/feedback`, payload);
    },
  },
});
