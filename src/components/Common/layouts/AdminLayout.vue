<script setup>
import AdminNavigation from "../AdminNavigation.vue";
</script>

<template>
  <div class="admin-layout">
    <div class="sidebar">
      <AdminNavigation></AdminNavigation>
    </div>
    <div class="container">
      <main class="content">
        <RouterView></RouterView>
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
}
.sidebar {
  width: 20%;
}
.container {
  width: 100%;
}
</style>
