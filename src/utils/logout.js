import { useSignalR } from "@/composables/useSignalR.js";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/authStore.js";

let isLoggingOut = false;

export async function logout() {
  if (isLoggingOut) return;

  isLoggingOut = true;

  const toast = useToast();
  const authStore = useAuthStore();

  try {
    if (authStore.accessToken !== null) {
      const resp = await authStore.logoutUser();

      if (resp.code === 200) {
        toast.success(resp.message);

        const { stopConnection } = useSignalR();
        await stopConnection();
      }
    }
  } catch (e) {
    toast.error("Logout failed", e);
  } finally {
    setTimeout(() => {
      window.location.href = "#/login";
    }, 1500);

    setTimeout(() => {
      isLoggingOut = false;
    }, 3000);
  }
}
