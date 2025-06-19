<script setup>
import { ref } from "vue";
import { genFileId } from "element-plus";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { useLoadingStore } from "@/stores/loadingStore.js";

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove = (file) => {
  form.value.paymentQRCode = form.value.paymentQRCode.filter(
    (f) => f.uid !== file.uid
  );
};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};

const toast = useToast();
const userStore = useUserStore();
const loadingStore = useLoadingStore();
const upload = ref();
const formRef = ref(null);
const form = ref({
  productImage: [],
  productName: "",
  productDescription: "",
  categoryID: 1,
  productCondition: "",
  productPrice: "",
  stockQty: "",
});

const updateUserProfile = async () => {
  try {
    await formRef.value.validate();
    const payload = {
      productImage: "Hello",
      userName: form.value.userName,
      email: form.value.email,
      phoneNumber: form.value.phoneNumber,
      userGender: form.value.userGender,
      address: form.value.address,
      ResidentialCollege: form.value.college,
      QRCode: form.value.paymentQRCode[0].raw,
    };
    const response = await userStore.updateUserProfile(payload);
    if (response.code === 200) {
      toast.success("Update Successfully!");
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchUserDetail = async () => {
  const response = await userStore.getUserProfile();

  form.value.userName = response.userName;
  form.value.email = response.email;
  form.value.phoneNumber = response.phoneNumber;
  form.value.userGender = response.userGender;
  form.value.address = response.address;
  form.value.college = response.residentialCollege;
  if (
    response.paymentQRCode !==
      "https://fyp-production-a7ce.up.railway.app/api" &&
    response.paymentQRCode !== ""
  ) {
    form.value.paymentQRCode = [
      {
        name: "QR Code.jpg",
        url: `${response.paymentQRCode}`, // full URL for preview
        status: "finished",
      },
    ];
  }
};

const handleExceed = (files) => {
  const file = files[0];
  file.uid = genFileId();
  toast.warning("You can only upload one QR code.");
};

onMounted(async () => {
  await fetchUserDetail();
});
</script>

<template>
  <el-form ref="formRef" :model="form">
    <el-row
      style="
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        border-radius: 15px;
        margin: 20px;
        width: 75%;
        justify-self: center;
      "
    >
      <el-col :span="16" style="padding: 30px">
        <div style="text-align: left">
          <div
            style="
              float: left;
              font-weight: bold;
              color: #0f5841;
              font-size: 1.8rem;
              width: 100%;
              text-align: left;
            "
          >
            My Profile
          </div>
          <div
            style="
              float: left;
              color: #0f5841;
              font-size: 1.2rem;
              margin-top: 20px;
            "
          >
            Name
          </div>
        </div>
        <el-input
          v-model="form.userName"
          placeholder="Please enter your Username"
          style="height: 40px"
        ></el-input>
        <div style="text-align: left">
          <div
            style="
              float: left;
              color: #0f5841;
              font-size: 1.2rem;
              margin-top: 20px;
            "
          >
            Email
          </div>
        </div>
        <el-input
          v-model="form.email"
          placeholder="Please enter your Email"
          style="height: 40px"
        ></el-input>
        <div style="text-align: left">
          <div
            style="
              float: left;
              color: #0f5841;
              font-size: 1.2rem;
              margin-top: 20px;
            "
          >
            Phone Number
          </div>
        </div>
        <el-input
          v-model="form.phoneNumber"
          placeholder="Please enter your Phone Number"
          style="height: 40px"
        ></el-input>
        <div style="text-align: left">
          <div
            style="
              float: left;
              color: #0f5841;
              font-size: 1.2rem;
              margin-top: 20px;
            "
          >
            Gender
          </div>
        </div>
        <div style="justify-self: left">
          <el-radio-group v-model="form.userGender">
            <el-radio value="1">Male</el-radio>
            <el-radio value="2">Female</el-radio>
          </el-radio-group>
        </div>
        <div style="text-align: left">
          <div
            style="
              float: left;
              color: #0f5841;
              font-size: 1.2rem;
              margin-top: 20px;
            "
          >
            Address
          </div>
        </div>
        <el-input
          v-model="form.address"
          placeholder="Please enter your Address"
          style="height: 40px"
        ></el-input>
        <div style="text-align: left">
          <div
            style="
              float: left;
              color: #0f5841;
              font-size: 1.2rem;
              margin-top: 20px;
            "
          >
            Residential College
          </div>
        </div>
        <el-select
          v-model="form.college"
          placeholder="Please choose your Residential College"
          style="height: 40px"
        >
          <el-option label="Dahlia College" value="Dahlia College" />
          <el-option label="Allamanda College" value="Allamanda College" />
          <el-option label="Cempaka College" value="Cempaka College" />
          <el-option
            label="Tun Ahmad Zaidi College"
            value="Tun Ahmad Zaidi College"
          />
          <el-option label="Rafflesia College" value="Rafflesia College" />
          <el-option label="Kasturi College" value="Kasturi College" />
          <el-option label="Kenanga College" value="Kenanga College" />
          <el-option label="Seroja College" value="Seroja College" />
          <el-option label="Sakura College" value="Sakura College" />
        </el-select>
      </el-col>
      <el-col :span="8" style="padding: 30px; align-content: center">
        <el-upload
          v-model:file-list="form.paymentQRCode"
          list-type="picture-card"
          ref="uploadRef"
          :auto-upload="false"
          :show-file-list="true"
          action="https://fyp-production-a7ce.up.railway.app/api/common/upload"
          :headers="header"
          name="PaymentQRCode"
          style="justify-content: center"
          :limit="1"
          :on-exceed="handleExceed"
        >
          <el-icon><Plus /></el-icon>

          <template #file="{ file }">
            <div>
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
        <el-dialog v-model="dialogVisible" style="align-content: center">
          <div style="text-align: center">
            <img
              :src="dialogImageUrl"
              alt="Preview Image"
              style="width: 100%; max-width: 500%"
            />
          </div>
        </el-dialog>
        <div style="margin-top: 20px">
          <el-upload
            v-model="form.userImage"
            ref="upload"
            action="#"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
          >
            <el-button
              type="primary"
              round
              style="
                width: 100%;
                background-image: linear-gradient(to right, #0f5841, #87ab9f);
              "
              size="large"
              >Select Receiving QR Code</el-button
            >
          </el-upload>
        </div>
      </el-col>
      <el-button
        round
        color="#0F5841"
        style="
          margin: 30px;
          background-image: linear-gradient(to right, #0f5841, #87ab9f);
          border: none;
        "
        size="large"
        @click="updateUserProfile"
        :loading="loadingStore.loading"
        :disabled="loadingStore.loading"
        >Save Changes</el-button
      >
    </el-row>
  </el-form>
</template>

<style scoped>
::v-deep(.el-upload-list__item) {
  justify-content: center !important;
}
</style>
