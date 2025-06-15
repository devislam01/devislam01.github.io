import { defineStore } from "pinia";
import axios from "@/utils/request.js";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    data: null,
  }),
  actions: {
    async getDashboard() {
      return await axios.get(`admin/Dashboard/dashboard`);
    },
  },
});
