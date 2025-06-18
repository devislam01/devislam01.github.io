<template>
  <div class="app">
    <div><RouterView></RouterView></div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { useSignalR } from "@/composables/useSignalR";
import { useAuthStore } from "@/stores/authStore.js";

const authStore = useAuthStore();
const { startConnection } = useSignalR();

watch(
  () => authStore.accessToken,
  (newToken) => {
    if (newToken) {
      startConnection();
    }
  },
  { immediate: true }
);
</script>

<style>
#app {
  padding: 0 !important;
}
</style>
