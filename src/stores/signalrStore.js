import { defineStore } from "pinia";

export const useSignalRStore = defineStore("signalr", {
  state: () => ({
    signalrMessages: [],
  }),
  persist: true,
  actions: {
    addSignalRMessage(newMessage) {
      const exists = this.signalrMessages.some((m) => m.id === newMessage.id);
      if (!exists) {
        this.signalrMessages.push(newMessage);
      }
    },
    markMessageAsRead(id) {
      const msg = this.signalrMessages.find((m) => m.id === id);
      if (msg) {
        msg.read = true;
      }
    },
    getUnreadMessages() {
      return this.signalrMessages.filter((m) => !m.read);
    },
    clearReadMessages() {
      this.signalrMessages = this.signalrMessages.filter((m) => !m.read);
    },
  },
});
