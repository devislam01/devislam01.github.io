import { useSignalR } from "@/composables/useSignalR.js";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/authStore.js";

export async function logout() {
  const toast = useToast();
  const authStore = useAuthStore();

  const resp = await authStore.logoutUser();
  if (resp.code === 200) {
    toast.success(resp.message);

    const { stopConnection } = useSignalR();
    await stopConnection();

    if (!window.location.pathname.includes("/login")) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    }
  }
}
