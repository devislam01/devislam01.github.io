<script setup>
import { ShoppingCart, User, Warning } from "@element-plus/icons-vue";
import { ref } from "vue";
import { logout } from "@/utils/logout.js";
import { useProductStore } from "@/stores/productStore";
import { useUserStore } from "@/stores/userStore.js";
import { useToast } from "vue-toastification";

const productStore = useProductStore();
const userStore = useUserStore();
const toast = useToast();

const input = ref("");
const resetPasswordDialogVisible = ref(false);
const resetPassword = ref("");

const search = async () => {
  const payload = {
    search: input.value ?? "",
    categoryID: productStore.filters.categoryID,
  };
  await productStore.getProductList(payload);
};

const submitResetPassword = async () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/;
  if (!passwordRegex.test(resetPassword.value)) {
    toast.info(
      "Password must be include uppercase, lowercase, number, and special character."
    );
    return;
  }
  resetPasswordDialogVisible.value = false;

  const payload = {
    password: resetPassword.value,
  };

  const resp = await userStore.resetPassword(payload);

  if (resp.code === 200) {
    toast.success(resp.message);
  }
};
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <el-row style="width: 100%">
      <el-col :span="9">
        <el-menu-item index="0">
          <img
            style="width: 275px; margin-top: 10px"
            src="/src/assets/PrelovedNoBack.png"
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
            @keyup="search"
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
                <el-dropdown-item
                  @click="resetPasswordDialogVisible = true"
                  style="color: #0f5841; font-weight: 500"
                >
                  Reset Password
                </el-dropdown-item>
                <el-dropdown-item
                  @click="logout"
                  style="color: #0f5841; font-weight: 500"
                  >Logout</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-menu-item>
      </el-col>
    </el-row>
  </el-menu>

  <el-dialog
    v-model="resetPasswordDialogVisible"
    width="600"
    style="text-align: center"
  >
    <p style="font-size: 1.5rem; font-weight: 600">Reset account password</p>
    <p style="font-size: 1rem">Enter a new password</p>
    <el-input
      v-model="resetPassword"
      type="password"
      show-password
      label="New Password"
      placeholder="Enter new password..."
      clearable
      style="width: 400px; height: 40px"
    >
      <template #suffix>
        <el-tooltip
          content="This action is irreversible. Please proceed with caution."
          placement="top"
        >
          <el-icon><Warning /></el-icon>
        </el-tooltip>
      </template>
    </el-input>
    <template #footer>
      <div style="margin: 16px 0 16px 0; text-align: center">
        <el-button type="primary" @click="submitResetPassword">Save</el-button>
        <el-button @click="resetPasswordDialogVisible = false"
          >Cancel</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<style>
.el-menu-item * {
  vertical-align: initial;
}
</style>
