<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { ArrowLeftBold } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore.js";

const userStore = useUserStore();
const input = ref("");

const open = () => {
  ElMessageBox.confirm(
    "A temporary password will be sent to your email address shortly.",
    "Success",
    {
      confirmButtonText: "OK",
      type: "success",
    }
  )
    .then(async () => {
      const payload = {
        Email: input.value,
      };
      const response = await userStore.forgetPassword(payload);

      ElMessage({
        type: "success",
        message: response.message,
      });
    })
    .catch(() => {
      ElMessage({
        type: "error",
        message: "Send email canceled",
      });
    });
};
const rules = ref({
  email: [
    { required: true, message: "Please input Email Address", trigger: "blur" },
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
      trigger: "blur",
    },
  ],
});
</script>

<template>
  <el-form :rules="rules">
    <div
      style="
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        border-radius: 15px;
        margin: 50px 0 0 0;
        width: 30%;
        justify-self: center;
        padding: 30px;
      "
    >
      <el-row
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        "
      >
        <div style="margin-right: 4px">
          <RouterLink to="/login" style="color: #0f5841">
            <el-icon><ArrowLeftBold /></el-icon>
          </RouterLink>
        </div>
        <div
          style="
            font-weight: bold;
            color: #0f5841;
            font-size: 1.4rem;
            margin-bottom: 5px;
            flex-grow: 1;
            text-align: center;
          "
        >
          Reset Password
        </div>
      </el-row>
      <div style="text-align: left">
        <div
          style="
            font-weight: 400;
            color: #0f5841;
            font-size: 1rem;
            margin-top: 10px;
          "
        >
          Enter the email associated with your account and we will send you a
          temporary password.
        </div>
        <div style="float: left; margin: 30px 0 -20px 0">
          <el-form-item label="Email" prop="email"></el-form-item>
        </div>
      </div>
      <el-input
        v-model="input"
        placeholder="Please enter your Email"
        style="height: 40px"
      ></el-input>
      <el-button
        plain
        round
        color="#0F5841"
        @click="open"
        style="margin-top: 30px; width: 100px"
        >Send</el-button
      >
    </div>
  </el-form>
</template>

<style scoped>
::v-deep(.el-form-item__label) {
  font-size: large !important;
  color: #0f5841 !important;
  font-weight: 400;
}
</style>
