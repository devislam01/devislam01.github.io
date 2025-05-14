<script setup>
import Breadcrumb from "../Common/Breadcrumb.vue";
import {ref} from "vue";
import { genFileId } from 'element-plus'
import {onMounted} from "vue";
import {useUserStore} from "@/stores/userStore"
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const userStore = useUserStore();
const route = useRoute();
const upload = ref()
const formRef = ref(null)
const form = ref({
    productImage: [],
    productName: '',
    productDescription: '',
    categoryID: 1,
    productCondition: '',
    productPrice: '',
    stockQty: '',
})

const updateUserProfile = async() => {
  try {
    await formRef.value.validate()
    const payload = {
        userID: Number(route.query.id),
        productImage: 'Hello',
        userName: form.value.userName,
        email: form.value.email,
        phoneNumber: form.value.phoneNumber,
        userGender: form.value.userGender,
        address: form.value.address,
        //userImage: 'Hello',
    }
    const response = await userStore.updateUserProfile(payload)
    if (response.code == 200){
      toast.success('Update Successfully!')
    }

    console.log(response);
    
  } catch (error) {
    console.log(error);
  }
}

const fetchUserDetail= async() => {
  try {
    const response = await userStore.getUserProfile()
    console.log(response);
    form.value.userName = response.userName
    form.value.email = response.email
    form.value.phoneNumber = response.phoneNumber
    form.value.userGender = response.userGender
    form.value.address = response.address
    // form.value.userImage = response.userImage

  } catch (error) {
    console.log(error);
  }
}

const handleExceed = (files) => {
  // upload.value!.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  // upload.value!.handleStart(file)
}

// const submitUpload = () => {
//   upload.value!.submit()
// }

const radio2 = ref('1');
const input = ref('');

onMounted(async() => {
    await fetchUserDetail()
})
</script>

<template>
    <Breadcrumb></Breadcrumb>
    <el-form ref="formRef" :model="form">
    <el-row style="box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); border-radius: 15px; margin: 20px; width: 75%; justify-self: center;">
        <el-col :span="16" style="padding: 30px;">
            <div style="text-align: left;">
                <div style="float: left; font-weight: bold; color: #0F5841; font-size: 1.8rem; width: 100%; text-align: left;">My Profile</div>
                <div style="float: left; color: #0F5841; font-size: 1.2rem; margin-top: 20px;">Name</div>
            </div>
            <el-input v-model="form.userName" placeholder="Chin Khai Yang" style="height: 40px;"></el-input>
            <div style="text-align: left;">
              <div style="float: left; color: #0F5841; font-size: 1.2rem; margin-top: 20px;">Email</div>
            </div>
            <el-input v-model="form.email" placeholder="abc123@gmail.com" style="height: 40px;"></el-input>
            <div style="text-align: left;">
              <div style="float: left; color: #0F5841; font-size: 1.2rem; margin-top: 20px;">Phone Number</div>
            </div>
            <el-input v-model="form.phoneNumber" placeholder="016-1234567" style="height: 40px;"></el-input>
            <div style="text-align: left;">
              <div style="float: left; color: #0F5841; font-size: 1.2rem; margin-top: 20px;">Gender</div>
            </div>
            <div style="justify-self: left;">
                <el-radio-group v-model="form.userGender">
                    <el-radio value="1">Male</el-radio>
                    <el-radio value="2">Female</el-radio>
                </el-radio-group>
            </div>
            <div style="text-align: left;">
              <div style="float: left; color: #0F5841; font-size: 1.2rem; margin-top: 20px;">Address</div>
            </div>
            <el-input v-model="form.address" placeholder="NO.100, Taman ABC, Sarawak" style="height: 40px;"></el-input>
        </el-col>
        <el-col :span="8" style="padding: 30px;">
            <img
                style="width: 250px; border-radius: 50%; border: 2px solid #0F5841; margin-top: 80px; max-inline-size: -webkit-fill-available;"
                src="/src/assets/ProfilePic.jpg"
                alt=""
            />
            <div style="margin-top: 20px;">
                <el-upload v-model="form.userImage" ref="upload" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1" :on-exceed="handleExceed" :auto-upload="false">
                    <el-button type="primary" round style="width: 200px;background-image: linear-gradient(to right, #0F5841 , #87AB9F);" size="large">Select Image</el-button>
                </el-upload>
            </div>
        </el-col>
        <el-button round color="#0F5841" style="margin: 30px; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: -webkit-fill-available;" size="large" @click="updateUserProfile">Save Changes</el-button>
    </el-row>
  </el-form>
</template>

<style scoped>

</style>