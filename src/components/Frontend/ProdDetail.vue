<script setup>
import { onMounted, ref } from "vue";
import Breadcrumb from "../Common/Breadcrumb.vue";
import { ShoppingCart } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useProductStore } from "@/stores/productStore";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import router from "@/router";

const productStore = useProductStore();
const toast = useToast();
const route = useRoute();

const info = ref({
  productID: "",
  productImage: [],
  productName: "",
  productDescription: "",
  productCondition: "",
  productPrice: "",
  categoryName: "",
});
const sellerInfo = ref({
  sellerName: "",
  ratingMark: 0,
  completedOrders: 0,
  joinTime: "",
});

const addToCart = () => {
  const product = {
    id: info.value.productID,
    name: info.value.productName,
    price: info.value.productPrice,
    condition: info.value.productCondition,
    category: info.value.categoryName,
    quantity: num.value,
    image: info.value.productImage,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // if (Array.isArray(cart)) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      cart.push(product);
    }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
  ElMessage({
    message: "Item successfully added to your cart!",
    type: "success",
  });
};

const num = ref(1);
const handleChange = (value) => {
  console.log(value);
};

const fetchProductDetail = async () => {
  try {
    const response = await productStore.getProductDetail({
      productID: Number(route.query.id),
    });

    info.value = response.productDetail;
    info.value.productID = Number(route.query.id);
    sellerInfo.value = response.sellerDetail;
  } catch (error) {
    toast.error(error);
  }
};

onMounted(async () => {
  await fetchProductDetail();
});
</script>

<template>
  <Breadcrumb></Breadcrumb>
  <el-row style="margin-top: 1.5rem; padding: 30px" :gutter="20">
    <el-col :span="12" style="padding: 20px; border: solid">
      <el-carousel trigger="click" height="350px">
        <!--                <el-carousel-item v-for="(image, index) in info.productImage" :key="index">
                    <img :src="image" alt="Product Image" style="max-width: 100%; max-height: 100%; object-fit: contain; display: block; margin: auto;" />
                </el-carousel-item>-->
        <img
          :src="info.productImage"
          alt="Product Image"
          style="
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            display: block;
            margin: auto;
          "
        />
      </el-carousel>
    </el-col>
    <el-col :span="12">
      <div style="text-align: left; margin-left: 20px">
        <div
          style="
            font-weight: 400;
            color: #0f5841;
            font-size: 1.1rem;
            margin-bottom: -5px;
          "
        >
          Name
        </div>
        <div
          style="
            font-weight: 700;
            color: #0f5841;
            font-size: 2rem;
            margin-bottom: 20px;
          "
        >
          {{ info.productName }}
        </div>
        <div
          style="
            font-weight: 400;
            color: #0f5841;
            font-size: 1.1rem;
            margin-bottom: -5px;
          "
        >
          Price
        </div>
        <div
          style="
            font-weight: 700;
            color: #0f5841;
            font-size: 1.6rem;
            margin-bottom: 20px;
          "
        >
          RM {{ info.productPrice }}
        </div>
        <div
          style="
            font-weight: 400;
            color: #0f5841;
            font-size: 1.1rem;
            margin-bottom: -5px;
          "
        >
          Condition
        </div>
        <div
          style="
            font-weight: 400;
            color: #0f5841;
            font-size: 1.4rem;
            margin-bottom: 20px;
          "
        >
          {{ info.productCondition }}
        </div>
        <div
          style="
            font-weight: 400;
            color: #0f5841;
            font-size: 1.1rem;
            margin-bottom: -5px;
          "
        >
          Category
        </div>
        <div
          style="
            font-weight: 400;
            color: #0f5841;
            font-size: 1.4rem;
            margin-bottom: 20px;
          "
        >
          {{ info.categoryName }}
        </div>
        <div style="font-weight: 400; color: #0f5841; font-size: 1.6rem">
          Quantity:
          <el-input-number
            v-model="num"
            :min="1"
            :max="100"
            @change="handleChange"
            style="color: #0f5841"
          />
        </div>
        <el-button
          round
          color="#0F5841"
          style="
            background-image: linear-gradient(to right, #0f5841, #87ab9f);
            border: none;
            margin-top: 20px;
            width: 150px;
          "
          size="large"
          >Buy Now</el-button
        >
        <el-button
          round
          color="#0F5841"
          @click="addToCart"
          style="
            background-image: linear-gradient(to right, #0f5841, #87ab9f);
            border: none;
            margin-top: 20px;
            width: 150px;
          "
          size="large"
          ><el-icon style="margin-right: 8px"><ShoppingCart /></el-icon>Add to
          Cart</el-button
        >
      </div>
    </el-col>
  </el-row>
  <el-row style="margin: 20px; border: solid" :gutter="20">
    <div style="text-align: left; padding: 10px; margin-left: 10px">
      <div style="font-weight: bold; color: #0f5841; font-size: 1.3rem">
        Product Description
      </div>
      <div style="font-weight: bold; color: #0f5841; font-size: 1rem">
        {{ info.productDescription }}
      </div>
    </div>
  </el-row>
  <el-row style="margin: 20px; border: solid" :gutter="20">
    <div
      style="text-align: left; padding: 10px; margin-left: 10px; width: 100%"
    >
      <div
        style="
          font-weight: bold;
          color: #0f5841;
          font-size: 1.3rem;
          margin-bottom: 10px;
        "
      >
        Seller Information
      </div>
      <div style="display: flex; align-items: center">
        <img
          style="
            width: 50px;
            border-radius: 50%;
            border: 2px solid #0f5841;
            display: block;
            max-inline-size: inherit;
          "
          src="/src/assets/ProfilePic.jpg"
          alt=""
        />
        <div
          style="
            font-weight: bold;
            color: #0f5841;
            font-size: 1rem;
            margin-left: 10px;
            min-width: 200px;
            border-right: 2px solid #0f5841;
            height: 50px;
            align-content: space-evenly;
          "
        >
          {{ sellerInfo.sellerName }}
        </div>
        <div style="justify-content: space-around; display: flex; width: 100%">
          <div style="margin-left: 10px; text-align: center">
            <div style="font-weight: bold; color: #0f5841; font-size: 1rem">
              Ratings
            </div>
            <el-rate
              v-model="sellerInfo.ratingMark"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value} points"
              style="font-weight: 500; flex-shrink: 0"
            />
          </div>
          <div style="margin-left: 10px; text-align: center">
            <div style="font-weight: bold; color: #0f5841; font-size: 1rem">
              Completed Orders
            </div>
            <div style="color: #0f5841; font-size: 0.95rem">
              {{ sellerInfo.completedOrders }}
            </div>
          </div>
          <div style="margin-left: 10px; text-align: center">
            <div style="font-weight: bold; color: #0f5841; font-size: 1rem">
              Joined
            </div>
            <div style="color: #0f5841; font-size: 0.95rem">
              {{ sellerInfo.joinTime }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-row>
</template>

<style scoped></style>
