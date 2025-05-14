<script setup>
import Breadcrumb from "../Common/Breadcrumb.vue";
import {ref} from "vue";
import {useUserStore} from "@/stores/userStore"
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();
const formRef = ref(null)
const form = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const rules = ref({
  email: [{ required: true, message: 'Please input Email Address', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input Password', trigger: 'blur' }],
})

const registerUser = async() => {
  try {
    await formRef.value.validate()

    const payload = {
      email: form.value.email,
      password: form.value.password,
    }
    const response = await userStore.registerUser(payload)

    console.log(response);
    toast.success('Register Success! Please Log In to Continue.')
    router.push('/login');
    
  } catch (error) {
    console.log(error);
    toast.error('Register Failed')
  }
}
</script>

<template>
    <Breadcrumb></Breadcrumb>
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-row style="box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4); border-radius: 15px; margin: 50px 0 0 0; width: 75%; justify-self: center;">
          <el-col :span="12" style="padding: 30px; align-content: center;">
              <div style="text-align: left;">
                <div style="float: left; font-weight: bold; color: #0F5841; font-size: 2rem; width: 100%;">Signup</div>
                <div style="float: left; margin: 30px 0 -20px 0;"><el-form-item label="Email" prop="email"></el-form-item></div>
              </div>
              <el-input v-model="form.email" placeholder="Please enter your Email" style="height: 40px;"></el-input>
              <div style="text-align: left;">
                <div style="float: left; margin: 30px 0 -20px 0;"><el-form-item label="Password" prop="password"></el-form-item></div>
              </div>
              <el-input v-model="form.password" placeholder="Please enter your Password" style="height: 40px;"></el-input>
              <div style="text-align: left;">
                <div style="float: left; margin: 30px 0 -20px 0;"><el-form-item label="Confirm Password" prop="password"></el-form-item></div>
              </div>
              <el-input v-model="form.confirmPassword" placeholder="Please enter your Confirm Password" style="height: 40px;"></el-input>
              <el-button round color="#0F5841" style="margin: 30px 0 20px 0; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 490px;" size="large" @click="registerUser">Register</el-button>
          </el-col>
          <el-col :span="12" style="background-image: linear-gradient(to right, #0F5841 , #87AB9F);border-end-end-radius: 13px; border-top-right-radius: 13px; align-content: center">
              <div> 
                <div style="font-weight: bold; color: white; font-size: 1.3rem; width: 100%; text-align: center;">Create Account</div>
                <div style="color: white; font-size: 1rem; margin-top: 20px; margin-left: 100px; margin-right: 100px;">Create an account to dive into the world of trading preloved items among the community of UNIMAS. As a member of SecondLife UNIMAS, you'll gain exclusive access to buy and sell preloved items within their community Don't miss out on the excitement – sign up now and start your adventure today!
              </div>
              <el-button round style="margin: 20px; border: none; background-color: rgba(255, 255, 255, 0.3); color: white; width: 350px;" size="large">
                <RouterLink to="/login" style="color: white; text-decoration: none; display: block; width: 100%; height: 100%;">Already have an account? Login here</RouterLink>
              </el-button>
              </div>
          </el-col>
      </el-row>
    </el-form>
</template>

<style scoped>
::v-deep(.el-form-item__label) {
    font-size: large !important;;
    color: #0F5841 !important;
    font-weight: 400;
}
</style>