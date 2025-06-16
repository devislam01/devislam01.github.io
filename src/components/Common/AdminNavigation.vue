<script setup>
import { RouterLink } from "vue-router";

import {
  Goods,
  House,
  SwitchButton,
  Tickets,
  User,
  Wallet,
} from "@element-plus/icons-vue";
import { logout } from "@/utils/logout.js";
</script>

<template>
  <el-row>
    <img
      style="width: 100%"
      src="/src/assets/PrelovedNoBack.png"
      alt="Element logo"
    />
    <el-col
      :span="24"
      style="display: flex; flex-direction: column; height: 91vh"
    >
      <el-menu default-active="2" style="flex-grow: 1">
        <RouterLink to="/admin">
          <el-menu-item index="1">
            <el-icon><House /></el-icon>
            <span>Dashboard</span>
          </el-menu-item>
        </RouterLink>
        <RouterLink to="/admin/manageAccount">
          <el-menu-item index="2">
            <el-icon><User /></el-icon>
            <span>User List</span>
          </el-menu-item>
        </RouterLink>
        <RouterLink to="/admin/manageProduct">
          <el-menu-item index="3">
            <el-icon><Goods /></el-icon>
            <span>Product List</span>
          </el-menu-item>
        </RouterLink>
        <RouterLink to="/admin/manageOrder">
          <el-menu-item index="4">
            <el-icon><Tickets /></el-icon>
            <span>Order List</span>
          </el-menu-item>
        </RouterLink>
        <RouterLink to="/admin/managePayment">
          <el-menu-item index="5">
            <el-icon><Wallet /></el-icon>
            <span>Payment List</span>
          </el-menu-item>
        </RouterLink>
        <el-menu-item index="6" @click="logout">
          <el-icon><SwitchButton /></el-icon>
          <span>Logout</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style scoped></style>
