<script setup>
import { onMounted, ref } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useUserStore } from "@/stores/userStore";
import { category } from "@/utils/constants";
import { useToast } from "vue-toastification";
import router from "@/router";
import { Delete, Edit, Plus, ZoomIn } from "@element-plus/icons-vue";
import { useAuthStore } from "@/stores/authStore.js";

const toast = useToast();
const productStore = useProductStore();
const userStore = useUserStore();
const authStore = useAuthStore();

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
const formRef = ref(null);
const form = ref({
  productImage: [],
  productName: "",
  productDescription: "",
  categoryID: 1,
  productCondition: "",
  productPrice: 1,
  stockQty: 1,
});
const productList = ref([]);
const uploadRef = ref();
const header = ref({
  Authorization: "Bearer " + authStore.accessToken,
});

const checkQRCode = async () => {
  const response = await userStore.getUserProfile();
  if (
    response.paymentQRCode === "https://localhost:7047/" ||
    response.paymentQRCode === ""
  ) {
    toast.info("Please upload the QR Code before add product!");
    setTimeout(() => {
      if (router.currentRoute.value.path !== "/Profile") {
        router.push("/Profile");
      } else {
        router.go(0);
      }
    }, 2000);
  }
};

const handleRemove = (file) => {
  // Remove the file manually from form.productImage
  form.value.productImage = form.value.productImage.filter(
    (f) => f.uid !== file.uid
  );
  console.log("After remove:", form.value.productImage);
};

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url || URL.createObjectURL(file.raw);
  dialogVisible.value = true;
};

const addProduct = async () => {
  await formRef.value.validate();

  if (!form.value.productImage || form.value.productImage.length === 0) {
    toast.warning("No file selected");
    return;
  }

  const payload = {
    ProductImage: form.value.productImage[0].raw,
    ProductName: form.value.productName,
    ProductDescription: form.value.productDescription,
    CategoryID: form.value.categoryID,
    ProductCondition: form.value.productCondition,
    ProductPrice: parseFloat(form.value.productPrice),
    StockQty: parseInt(form.value.stockQty),
  };
  const response = await productStore.addProduct(payload);
  if (response.code === 200) {
    toast.success("Add Successfully!");
  }
  setTimeout(() => {
    router.go(0);
  }, 2000);
};

const deleteProduct = async (productID) => {
  const payload = {
    productID: productID,
  };
  const response = await productStore.deleteProduct(payload);
  if (response.code === 200) {
    toast.success("Delete Successfully!");
  }
  setTimeout(() => {
    router.go(0);
  }, 2000);
};

const fetchSpecificProductList = async () => {
  productList.value = await productStore.getSpecificProductList();
};

onMounted(async () => {
  await fetchSpecificProductList();
});
</script>

<template>
  <el-tabs type="border-card">
    <el-tab-pane label="Selling List">
      <el-col
        :span="12"
        style="
          border-style: solid;
          border-color: #0f5841;
          border-width: 2px;
          border-radius: 15px;
          padding: 20px;
          margin: 10px;
          height: fit-content;
        "
      >
        <el-row>
          <div
            style="
              float: left;
              font-weight: 700;
              color: #0f5841;
              font-size: 1.8rem;
              width: 100%;
              text-align: left;
              margin-bottom: 20px;
            "
          >
            My Selling List
          </div>
        </el-row>
        <el-row style="border-bottom: 2px solid #0f5841; padding-bottom: 10px">
          <el-col :span="12">
            <div
              style="
                color: #0f5841;
                font-size: 1.2rem;
                text-align: center;
                font-weight: 500;
              "
            >
              Product
            </div>
          </el-col>
          <el-col :span="6">
            <div style="color: #0f5841; font-size: 1.2rem; font-weight: 500">
              Stock
            </div>
          </el-col>
          <el-col :span="6"> </el-col>
        </el-row>
        <el-row
          v-if="productList.length > 0"
          v-for="item in productList"
          :key="item.productID"
          style="
            border-bottom: 2px solid #0f5841;
            padding-bottom: 10px;
            margin-top: 10px;
            margin-bottom: 10px;
          "
        >
          <el-col :span="12">
            <div
              style="
                display: flex;
                align-items: center;
                gap: 40px;
                margin: 0 0 0 30px;
                justify-content: center;
              "
            >
              <img
                style="width: 150px; height: 150px; object-fit: contain"
                :src="item.productImage"
                alt=""
              />
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  color: #0f5841;
                  font-size: 1.2rem;
                  margin: 0 0 0 40px;
                "
              >
                <div>{{ item.productName }}</div>
                <div>RM {{ item.productPrice }}</div>
              </div>
            </div>
          </el-col>
          <el-col
            :span="6"
            style="align-content: space-evenly; justify-items: center"
          >
            <div style="display: flex; align-items: center; gap: 10px">
              <div style="color: #0f5841; font-size: 1.2rem">
                {{ item.stockQty }}
              </div>
            </div>
          </el-col>
          <el-col :span="6" style="align-content: space-evenly">
            <RouterLink
              :to="{
                name: 'EditSpecificProduct',
                query: { id: item.productID },
              }"
              style="color: white"
              ><el-button
                round
                color="#0F5841"
                style="
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  margin: 10px 10px 0 0;
                  width: 120px;
                "
                size="large"
                ><el-icon style="margin-right: 8px"><Edit /></el-icon
                >Edit</el-button
              ></RouterLink
            >
            <el-button
              round
              color="#0F5841"
              style="
                background-image: linear-gradient(to right, #0f5841, #87ab9f);
                border: none;
                margin-top: 10px;
                width: 120px;
              "
              size="large"
              @click="deleteProduct(item.productID)"
              ><el-icon style="margin-right: 8px"><Delete /></el-icon
              >Delete</el-button
            >
          </el-col>
        </el-row>
        <el-row v-else>
          <el-empty description="Nothing to Sell Now!" />
        </el-row>
      </el-col>
    </el-tab-pane>
    <el-tab-pane label="Add Product" @click="checkQRCode">
      <el-form ref="formRef" :model="form">
        <el-col
          :span="24"
          style="
            border-style: solid;
            border-color: #0f5841;
            border-width: 2px;
            border-radius: 15px;
            padding: 20px;
            margin: 10px;
          "
        >
          <el-row>
            <div
              style="
                float: left;
                font-weight: 700;
                color: #0f5841;
                font-size: 1.8rem;
                width: 100%;
                text-align: left;
                margin-bottom: 20px;
              "
            >
              Add Product
            </div>
          </el-row>
          <el-upload
            v-model:file-list="form.productImage"
            list-type="picture-card"
            ref="uploadRef"
            :limit="1"
            :auto-upload="false"
            :show-file-list="true"
            action="https://localhost:7047/api/common/upload"
            :headers="header"
            name="ProductImage"
            style="justify-content: center"
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
            <template #tip>
              <div class="el-upload__tip text-red">
                limit 1 file, new file will cover the old file
              </div>
            </template>
          </el-upload>
          <el-dialog
            v-model="dialogVisible"
            style="width: 700px; height: 500px; align-content: center"
          >
            <div style="text-align: center">
              <img
                :src="dialogImageUrl"
                alt="Preview Image"
                style="max-height: 400px; width: auto; max-width: 500%"
              />
            </div>
          </el-dialog>
          <div style="text-align: left">
            <div
              style="
                float: left;
                color: #0f5841;
                font-size: 1.2rem;
                margin-top: 20px;
                font-weight: 500;
              "
            >
              Product Name
            </div>
          </div>
          <el-input
            v-model="form.productName"
            placeholder="Please Enter your Product Name"
            style="height: 40px"
          ></el-input>
          <div style="text-align: left">
            <div
              style="
                float: left;
                color: #0f5841;
                font-size: 1.2rem;
                margin-top: 20px;
                font-weight: 500;
              "
            >
              Product Description
            </div>
          </div>
          <el-input
            v-model="form.productDescription"
            type="textarea"
            :rows="4"
            placeholder="Write your Product Description here..."
          />
          <div style="text-align: left">
            <div
              style="
                float: left;
                color: #0f5841;
                font-size: 1.2rem;
                margin-top: 20px;
                font-weight: 500;
              "
            >
              Product Category
            </div>
          </div>
          <el-select
            v-model="form.categoryID"
            placeholder="Select your Item Category"
            size="large"
            style="
              border-radius: 6px;
              width: 100%;
              height: 30px;
              align-items: center;
            "
          >
            <el-option
              v-for="item in category"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div
            style="
              display: flex;
              flex-direction: column;
              text-align: left;
              width: 100%;
            "
          >
            <div
              style="
                color: #0f5841;
                font-size: 1.2rem;
                margin-top: 20px;
                font-weight: 500;
              "
            >
              Product Condition
            </div>
            <div style="width: 100%">
              <el-radio-group
                v-model="form.productCondition"
                size="large"
                style="width: 100%; display: flex; flex-wrap: wrap"
              >
                <el-radio-button label="Brand New" value="Brand New" />
                <el-radio-button label="Like New" value="Like New" />
                <el-radio-button label="Gently Used" value="Gently Used" />
                <el-radio-button
                  label="Moderately Used"
                  value="Moderately Used"
                />
                <el-radio-button label="Heavily Used" value="Heavily Used" />
              </el-radio-group>
            </div>
          </div>
          <div style="text-align: left">
            <div
              style="
                float: left;
                color: #0f5841;
                font-size: 1.2rem;
                margin-top: 20px;
                font-weight: 500;
              "
            >
              Product Price
            </div>
          </div>
          <el-input
            v-model="form.productPrice"
            placeholder="Please Enter your Product Price (RM)"
            style="height: 40px"
          ></el-input>
          <div style="text-align: left">
            <div
              style="
                float: left;
                color: #0f5841;
                font-size: 1.2rem;
                margin-top: 20px;
                font-weight: 500;
              "
            >
              Product Stock
            </div>
          </div>
          <el-input
            v-model="form.stockQty"
            placeholder="Please Enter your Product Stock Quantity"
            style="height: 40px"
          ></el-input>
          <el-button
            round
            color="#0F5841"
            style="
              background-image: linear-gradient(to right, #0f5841, #87ab9f);
              border: none;
              margin-top: 30px;
              width: 100%;
            "
            size="large"
            @click="addProduct"
            >Upload Product</el-button
          >
        </el-col>
      </el-form>
    </el-tab-pane>
  </el-tabs>
  <el-row :span="24" style="justify-content: space-around"> </el-row>
</template>

<style scoped>
.el-button + .el-button {
  margin-left: 0 !important;
}

.el-col-12 {
  max-width: 100% !important;
}

::v-deep(.el-upload-list__item) {
  justify-content: center !important;
}
</style>
