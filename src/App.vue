<template>
  <div class="app">
    <div><RouterView></RouterView></div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { useSignalR } from "@/composables/useSignalR";
import { useUserStore } from "@/stores/userStore.js";

const userStore = useUserStore();
const { startConnection } = useSignalR();

watch(
  () => userStore.token,
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
