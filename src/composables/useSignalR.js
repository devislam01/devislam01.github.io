import * as signalR from "@microsoft/signalr";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useSignalRStore } from "@/stores/signalrStore.js";

const connection = ref(null);

export function useSignalR() {
  const userStore = useUserStore();

  const startConnection = async () => {
    if (!userStore.token) return;

    if (connection.value && connection.value.state !== "Disconnected") {
      return;
    }

    connection.value = new signalR.HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_BACKEND + "orderHub", {
        accessTokenFactory: () => userStore.token,
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
