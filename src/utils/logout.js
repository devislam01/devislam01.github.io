import { useSignalR } from "@/composables/useSignalR.js";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/userStore.js";

export async function logout() {
  const toast = useToast();
  const userStore = useUserStore();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  userStore.token = "";
  toast.success("Logout successfully");

  const { stopConnection } = useSignalR();
  await stopConnection();

  if (!window.location.pathname.includes("/login")) {
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  }
}
