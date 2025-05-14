<script setup>
// import {ref} from "vue";
import { RouterView,RouterLink } from 'vue-router'

// const input = ref('');

import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<template>
    <!-- <el-row style="border-bottom: 1px solid var(--el-menu-border-color); align-items: center; width: 100%;">
        <el-col :span="12" style="border-right: 1px solid var(--el-menu-border-color); display: flex; align-items: center;">
            <img
                style="width: 350px; margin: 10px;"
                src="/src/assets/SecondLifeUnimas.png"
                alt="Element logo"
            />
        </el-col>
    </el-row> -->
    <el-row>
        <img
                style="width: 100%; "
                src="/src/assets/SecondLifeUnimas.png"
                alt="Element logo"
            />
        <el-col :span="24" style="display: flex; flex-direction: column; height: 91vh;">
            <el-menu
                default-active="2"
                @open="handleOpen"
                @close="handleClose"
                style="flex-grow: 1;"
            >
                <RouterLink to="/admin">
                    <el-menu-item index="1">
                    <el-icon><icon-menu /></el-icon>
                    <span>Dashboard</span>
                    </el-menu-item>
                </RouterLink>
                <RouterLink to="/admin/manageAccount">
                    <el-menu-item index="2">
                    <el-icon><icon-menu /></el-icon>
                    <span>User List</span>
                    </el-menu-item>
                </RouterLink>
                <RouterLink to="/admin/manageProduct">
                    <el-menu-item index="3">
                    <el-icon><icon-menu /></el-icon>
                    <span>Product List</span>
                    </el-menu-item>
                </RouterLink>
                <RouterLink to="/admin/manageOrder">
                    <el-menu-item index="4">
                    <el-icon><icon-menu /></el-icon>
                    <span>Order List</span>
                    </el-menu-item>
                </RouterLink>
                <RouterLink to="/login">
                    <el-menu-item index="5">
                    <span>Logout</span>
                    </el-menu-item>
                </RouterLink>
            </el-menu>
        </el-col>
    </el-row>
</template>

<style scoped>

</style>

