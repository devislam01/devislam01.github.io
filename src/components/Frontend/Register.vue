<script setup>
import Breadcrumb from "../Common/Breadcrumb.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useLoadingStore } from "@/stores/loadingStore.js";

const userStore = useUserStore();
const loadingStore = useLoadingStore();
const toast = useToast();
const router = useRouter();
const formRef = ref(null);
const active = ref(0);

const next = async () => {
  // await formRef.value.validate();
  if (active.value++ > 2) active.value = 0;
};

const form = ref({
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
  phoneNumber: "",
  gender: "",
  address: "",
  userGender: "",
  college: "",
  paymentQRCode: "",
});

const handleFileChange = async (file) => {
  // Simulate uploading to server or use your own upload logic
  // replace with actual upload logic
  form.value.paymentQRCode = await uploadToYourServer(file);
  return false;
};

const rules = ref({
  email: [
    { required: true, message: "Please input Email Address", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input Password", trigger: "blur" },
  ],
  username: [
    { required: true, message: "Please input Username", trigger: "blur" },
  ],
  phoneNumber: [
    { required: true, message: "Please input Phone Number", trigger: "blur" },
  ],
  address: [
    { required: true, message: "Please input Address", trigger: "blur" },
  ],
  userGender: [
    { required: true, message: "Please select your gender", trigger: "change" },
  ],
  college: [
    {
      required: true,
      message: "Please choose your Residential College",
      trigger: "change",
    },
  ],
});

const registerUser = async () => {
  try {
    await formRef.value.validate();

    if (!form.value.paymentQRCode || form.value.paymentQRCode.length === 0) {
      toast.warning("No file selected");
      return;
    }

    const payload = {
      Email: form.value.email,
      Password: form.value.password,
      Username: form.value.username,
      PhoneNumber: form.value.phoneNumber,
      Address: form.value.address,
      UserGender: form.value.userGender,
      ResidentialCollege: form.value.college,
      QRCode: form.value.paymentQRCode[0].raw,
    };
    const response = await userStore.registerUser(payload);

    console.log(response);
    toast.success("Register Success! Please Log In to Continue.");
    router.push("/login");
  } catch (error) {
    console.log(error);
    toast.error("Register Failed");
  }
};
</script>

<template>
  <Breadcrumb></Breadcrumb>
  <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
    <el-row
      style="
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        border-radius: 15px;
        margin: 30px 0 0 0;
        width: 75%;
        justify-self: center;
      "
    >
      <el-col :span="12" style="padding: 30px">
        <div style="text-align: left; width: 100%">
          <div
            style="
              font-weight: bold;
              color: #0f5841;
              font-size: 2rem;
              margin-bottom: 20px;
            "
          >
            Signup
          </div>
          <el-steps
            :active="active"
            finish-status="success"
            style="width: 50%; justify-self: center"
          >
            <el-step title="Step 1" />
            <el-step title="Step 2" />
          </el-steps>
        </div>
        <div v-if="active === 0">
          <div
            style="
              float: left;
              margin: 10px 0 0 0;
              width: 100%;
              text-align: left;
            "
          >
            <el-form-item label="Email" prop="email"
              ><el-input
                v-model="form.email"
                placeholder="Please enter your Email"
                style="height: 40px"
              ></el-input
            ></el-form-item>
          </div>
          <div style="width: 100%; text-align: left">
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
          <div style="width: 100%; text-align: left">
            <el-form-item label="Confirm Password" prop="password">
              <el-input
                v-model="form.confirmPassword"
                type="password"
                show-password
                placeholder="Please enter your Confirm Password"
                style="height: 40px"
              ></el-input>
            </el-form-item>
          </div>
          <el-button
            round
            color="#0F5841"
            style="
              margin: 30px 0 20px 0;
              background-image: linear-gradient(to right, #0f5841, #87ab9f);
              border: none;
              width: 100%;
            "
            size="large"
            @click="next"
            >Next step</el-button
          >
        </div>
        <div v-if="active === 1">
          <div style="margin: 10px 0 0 0; width: 100%; text-align: left">
            <el-form-item label="Username" prop="username">
              <el-input
                v-model="form.username"
                type="username"
                placeholder="Please enter your Username"
                style="height: 40px"
              ></el-input>
            </el-form-item>
          </div>
          <div style="width: 100%; text-align: left">
            <el-form-item label="Phone Number" prop="phoneNumber">
              <el-input
                v-model="form.phoneNumber"
                type="phoneNumber"
                placeholder="Please enter your Phone Number"
                style="height: 40px"
              ></el-input>
            </el-form-item>
          </div>
          <div style="margin: 10px 0 0 0; width: 100%; text-align: left">
            <el-form-item label="Gender" prop="userGender">
              <el-radio-group v-model="form.userGender">
                <el-radio value="1">Male</el-radio>
                <el-radio value="2">Female</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div style="width: 100%; text-align: left">
            <el-form-item label="Address" prop="address">
              <el-input
                v-model="form.address"
                type="address"
                placeholder="Please enter your Address"
                style="height: 40px"
              ></el-input>
            </el-form-item>
          </div>
          <div style="width: 100%; text-align: left">
            <el-form-item label="Residential College" prop="college">
              <el-select
                v-model="form.college"
                placeholder="Please choose your Residential College"
                style="width: 100%; height: 40px"
              >
                <el-option label="Dahlia College" value="Dahlia College" />
                <el-option
                  label="Allamanda College"
                  value="Allamanda College"
                />
                <el-option label="Cempaka College" value="Cempaka College" />
                <el-option
                  label="Tun Ahmad Zaidi College"
                  value="Tun Ahmad Zaidi College"
                />
                <el-option
                  label="Rafflesia College"
                  value="Rafflesia College"
                />
                <el-option label="Kasturi College" value="Kasturi College" />
                <el-option label="Kenanga College" value="Kenanga College" />
                <el-option label="Seroja College" value="Seroja College" />
                <el-option label="Sakura College" value="Sakura College" />
              </el-select>
            </el-form-item>
          </div>
          <div style="text-align: left">
            <el-form-item label="QR Code" prop="paymentQRCode">
              <el-upload
                v-model:file-list="form.paymentQRCode"
                class="upload-demo"
                style="width: 100%"
                action="#"
                :limit="1"
                :auto-upload="false"
              >
                <template #trigger>
                  <el-button type="primary">Select Receiving QR Code</el-button>
                </template>
                <template #tip>
                  <div class="el-upload__tip text-red">
                    limit 1 file, new file will cover the old file
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              margin: 30px 0 20px 0;
            "
          >
            <el-button
              @click="active--"
              round
              color="white"
              style="border: 2px solid #0f5841; width: 48%"
              size="large"
            >
              Previous
            </el-button>

            <el-button
              round
              color="#0F5841"
              style="
                background-image: linear-gradient(to right, #0f5841, #87ab9f);
                border: none;
                width: 48%;
              "
              size="large"
              @click="registerUser"
              :loading="loadingStore.loading"
              :disabled="loadingStore.loading"
            >
              Register
            </el-button>
          </div>
        </div>
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
            Create Account
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
            Create an account to dive into the world of trading preloved items
            among the community of UNIMAS. As a member of SecondLife UNIMAS,
            you'll gain exclusive access to buy and sell preloved items within
            their community Don't miss out on the excitement – sign up now and
            start your adventure today!
          </div>
          <el-button
            round
            style="
              margin: 20px;
              border: none;
              background-color: rgba(255, 255, 255, 0.3);
              color: white;
              width: 350px;
            "
            size="large"
          >
            <RouterLink
              to="/login"
              style="
                color: white;
                text-decoration: none;
                display: block;
                width: 100%;
                height: 100%;
              "
              >Already have an account? Login here</RouterLink
            >
          </el-button>
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
