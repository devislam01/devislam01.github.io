import * as signalR from "@microsoft/signalr";
import { ref } from "vue";
import { useSignalRStore } from "@/stores/signalrStore.js";
import { useAuthStore } from "@/stores/authStore.js";

const connection = ref(null);

export function useSignalR() {
  const authStore = useAuthStore();

  const startConnection = async () => {
    if (!authStore.accessToken) return;

    if (connection.value && connection.value.state !== "Disconnected") {
      return;
    }

    connection.value = new signalR.HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_BACKEND + "orderHub", {
        accessTokenFactory: () => authStore.accessToken,
      })
      .withAutomaticReconnect()
      .build();

    try {
      await connection.value.start();
      console.log("✅ SignalR connected");
    } catch (err) {
      console.error("❌ SignalR connected failed", err);
    }

    connection.value.on("ReceiveOrderNotification", (message) => {
      const id = Date.now().toString();
      useSignalRStore().addSignalRMessage({
        id,
        content: message,
        read: false,
      });
    });
  };

  const stopConnection = async () => {
    if (
      connection.value &&
      connection.value.state === signalR.HubConnectionState.Connected
    ) {
      await connection.value.stop();
    }
  };

  return {
    connection,
    startConnection,
    stopConnection,
  };
}
