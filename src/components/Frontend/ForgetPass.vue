<script setup>
import { ArrowLeftBold } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore.js";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const toast = useToast();
const formRef = ref();
const formData = ref({
  email: "",
});

const submitForm = async () => {
  await formRef.value
    .validate()
    .then(async () => {
      const payload = {
        email: formData.value.email,
      };
      const response = await userStore.forgetPassword(payload);
      if (response.code === 200) {
        toast.success(response.message);
      }
    })
    .catch((error) => {
      toast.error(error.email[0].message);
    });
};

const rules = ref({
  email: [
    { required: true, message: "Please input Email Address", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Please enter a valid email address",
      trigger: "blur",
    },
  ],
});
</script>

<template>
  <el-form ref="formRef" :model="formData" :rules="rules">
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
        <div style="margin-top: 1.2rem">
          <el-form-item label="Email" prop="email" style="align-items: center">
            <el-input
              v-model="formData.email"
              placeholder="Please enter your Email"
              style="height: 40px"
              label="Email"
              prop="email"
            ></el-input>
          </el-form-item>
        </div>
        <div style="width: 100px; margin: 1.2rem auto 0 auto">
          <el-button
            plain
            round
            color="#0F5841"
            @click="submitForm"
            style="width: 100px"
            >Send</el-button
          >
        </div>
      </div>
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
