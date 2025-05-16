<script setup>
import { ShoppingCart, User } from "@element-plus/icons-vue";
import { ref } from "vue";
import { logout } from "@/utils/logout.js";
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();
const input = ref("");

const search = async () => {
  const payload = {
    search: input.value,
  };
  await productStore.getProductList(payload);
};
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <el-row style="width: 100%">
      <el-col :span="9">
        <el-menu-item index="0">
          <img
            style="width: 350px"
            src="/src/assets/SecondLifeUnimas.png"
            alt="Element logo"
          />
        </el-menu-item>
      </el-col>
      <el-col :span="15" style="display: flex; justify-content: right">
        <el-menu-item index="1">
          <RouterLink to="/"
            ><el-button type="success" round color="#0F5841"
              >Home</el-button
            ></RouterLink
          >
        </el-menu-item>
        <el-menu-item index="2">
          <RouterLink to="/seller"><el-text tag="b">Sell</el-text></RouterLink>
        </el-menu-item>
        <el-menu-item index="3">
          <el-input
            v-model="input"
            placeholder="Search for Products..."
            @change="search"
          >
            <template #prefix>
              <span style="display: flex; align-items: center">
                <el-icon><Search /></el-icon>
              </span>
            </template>
          </el-input>
        </el-menu-item>
        <el-menu-item index="4">
          <RouterLink to="/shoppingCart" style="color: #0f5841"
            ><el-icon><ShoppingCart /></el-icon
          ></RouterLink>
        </el-menu-item>
        <el-menu-item index="5">
          <el-dropdown>
            <el-icon><User /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  ><RouterLink to="/Profile" style="color: #0f5841"
                    >My Profile</RouterLink
                  ></el-dropdown-item
                >
                <el-dropdown-item
                  ><RouterLink to="/order" style="color: #0f5841"
                    >My Order</RouterLink
                  ></el-dropdown-item
                >
                <el-dropdown-item @click="logout" style="color: #0f5841; font-weight: 500;"
                  >Logout</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-menu-item>
      </el-col>
    </el-row>
  </el-menu>
</template>

<style>
.el-menu-item * {
  vertical-align: initial;
}
</style>
