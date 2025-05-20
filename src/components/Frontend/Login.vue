<script setup>
import Breadcrumb from "../Common/Breadcrumb.vue";
import { ref } from "vue";
import TopNavigation from "../Common/TopNavigation.vue";
import { useUserStore } from "@/stores/userStore";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useLoadingStore } from "@/stores/loadingStore.js";

const userStore = useUserStore();
const loadingStore = useLoadingStore();
const toast = useToast();
const router = useRouter();
const formRef = ref(null);
const form = ref({
  email: "",
  password: "",
});

const input = ref("");

const rules = ref({
  email: [
    { required: true, message: "Please input Email Address", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input Password", trigger: "blur" },
  ],
});

const loginUser = async () => {
  await formRef.value.validate();

  const payload = {
    email: form.value.email,
    password: form.value.password,
  };

  await userStore.loginUser(payload);

  toast.success("Login Success");
  await router.push({ path: "/", query: { showMessageBox: "true" } });
};
</script>

<template>
  <TopNavigation></TopNavigation>
  <Breadcrumb style="margin: 20px"></Breadcrumb>
  <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
    <el-row
      style="
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        border-radius: 15px;
        margin: 50px 0 0 0;
        width: 1122px;
        justify-self: center;
      "
    >
      <el-col :span="12" style="padding: 30px">
        <div style="text-align: left">
          <div
            style="
              float: left;
              font-weight: bold;
              color: #0f5841;
              font-size: 2rem;
              width: 100%;
            "
          >
            Login
          </div>
        </div>
        <div
          style="float: left; margin: 30px 0 0 0; width: 100%; text-align: left"
        >
          <el-form-item label="Email" prop="email"
            ><el-input
              v-model="form.email"
              placeholder="Please enter your Email"
              style="height: 40px"
            ></el-input
          ></el-form-item>
        </div>
        <div style="margin: 160px 0 0 0; width: 100%; text-align: left">
          <el-form-item label="Password" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              show-password
              placeholder="Please enter your Password"
              style="height: 40px"
            ></el-input>
          </el-form-item>
        </div>
        <div style="text-align: right; margin: 5px 5px 0 0">
          <el-link type="success"
            ><RouterLink to="/forgetPassword" style="color: #0f5841"
              >Forget Password?</RouterLink
            ></el-link
          >
        </div>
        <el-button
          round
          color="#0F5841"
          style="
            margin: 30px 0 20px 0;
            background-image: linear-gradient(to right, #0f5841, #87ab9f);
            border: none;
            width: 490px;
          "
          size="large"
          @click="loginUser"
          :loading="loadingStore.loading"
          :disabled="loadingStore.loading"
          >Login</el-button
        >
      </el-col>
      <el-col
        :span="12"
        style="
          background-image: linear-gradient(to right, #0f5841, #87ab9f);
          border-end-end-radius: 13px;
          border-top-right-radius: 13px;
          align-content: center;
        "
      >
        <div>
          <div
            style="
              font-weight: bold;
              color: white;
              font-size: 1.3rem;
              width: 100%;
              text-align: center;
            "
          >
            Welcome back!
          </div>
          <div
            style="
              color: white;
              font-size: 1rem;
              margin-top: 20px;
              margin-left: 100px;
              margin-right: 100px;
            "
          >
            Welcome back! We're thrilled to see you again. Log in to SecondLife
            UNIMAS and resume your journey into the world of trading preloved
            items among the community of UNIMAS. Find your next desired items
            with just a click!
          </div>
          <el-button
            round
            color="#0F5841"
            style="
              margin: 20px;
              border: none;
              background-color: rgba(255, 255, 255, 0.3);
              color: white;
              width: 350px;
            "
            size="large"
            ><RouterLink to="/register" style="color: white"
              >Don’t have an account? Signup here</RouterLink
            ></el-button
          >
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped>
::v-deep(.el-form-item__label) {
  font-size: large !important;
  color: #0f5841 !important;
  font-weight: 400;
}
</style>
