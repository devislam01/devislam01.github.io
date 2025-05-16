<script setup>
import Breadcrumb from "../Common/Breadcrumb.vue";
import { onMounted, ref } from "vue";
import { Close, Minus, Plus } from "@element-plus/icons-vue";
import { claimTypes } from "@/utils/constants.js";

const cartItems = ref([]);
const token = localStorage.getItem("accessToken") || "";
const userID = JSON.parse(atob(token.split(".")[1]))[claimTypes.userId];

onMounted(() => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.value = cart[userID] || [];
});

const getSubtotal = (item) => {
  return item.price * item.quantity;
};

const getTotal = () => {
  return cartItems.value.reduce((sum, item) => sum + getSubtotal(item), 0);
};
</script>

<template>
  <Breadcrumb></Breadcrumb>
  <el-row>
    <div
      style="
        float: left;
        font-weight: bold;
        color: #0f5841;
        font-size: 1.8rem;
        width: 100%;
        text-align: left;
        margin-left: 50px;
        margin-bottom: 20px;
      "
    >
      My Shopping Cart
    </div>
  </el-row>
  <el-row style="align-items: flex-start">
    <el-col
      :span="16"
      style="
        padding: 30px;
        border-style: solid;
        border-color: #0f5841;
        border-width: 2px;
        border-radius: 10px;
        margin-left: 20px;
      "
    >
      <el-row
        :gutter="20"
        style="border-bottom: 2px solid #0f5841; padding-bottom: 10px"
      >
        <el-col :span="8">
          <div
            style="
              color: #0f5841;
              font-size: 1.2rem;
              text-align: left;
              font-weight: 500;
            "
          >
            Product
          </div>
        </el-col>
        <el-col :span="5">
          <div style="color: #0f5841; font-size: 1.2rem; font-weight: 500">
            Unit Price
          </div>
        </el-col>
        <el-col :span="5">
          <div style="color: #0f5841; font-size: 1.2rem; font-weight: 500">
            Quantity
          </div>
        </el-col>
        <el-col :span="5">
          <div style="color: #0f5841; font-size: 1.2rem; font-weight: 500">
            Subtotal
          </div>
        </el-col>
        <el-col :span="1"> </el-col>
      </el-row>
      <el-row
        v-for="(item, index) in cartItems"
        :key="index"
        :gutter="20"
        style="
          border-bottom: 2px solid #0f5841;
          padding-bottom: 10px;
          margin-top: 10px;
          margin-bottom: 10px;
        "
      >
        <el-col :span="8">
          <div style="display: flex; align-items: center; gap: 10px">
            <img style="width: 150px" :src="item.image" alt="" />
            <div style="color: #0f5841; font-size: 1.2rem">{{ item.name }}</div>
          </div>
        </el-col>
        <el-col :span="5" style="align-content: space-evenly">
          <div style="color: #0f5841; font-size: 1.2rem">
            RM {{ item.price }}
          </div>
        </el-col>
        <el-col
          :span="5"
          style="align-content: space-evenly; justify-items: center"
        >
          <div style="display: flex; align-items: center; gap: 10px">
            <el-icon style="margin-right: 10px"><Minus /></el-icon>
            <div style="color: #0f5841; font-size: 1.2rem">
              {{ item.quantity }}
            </div>
            <el-icon style="margin-left: 10px"><Plus /></el-icon>
          </div>
        </el-col>
        <el-col :span="5" style="align-content: space-evenly">
          <div style="color: #0f5841; font-size: 1.2rem">
            RM {{ getSubtotal(item) }}
          </div>
        </el-col>
        <el-col :span="1" style="align-content: space-evenly">
          <el-icon><Close /></el-icon>
        </el-col>
      </el-row>
    </el-col>
    <el-col
      :span="7"
      style="
        padding: 30px;
        border-style: solid;
        border-color: #0f5841;
        border-width: 2px;
        border-radius: 10px;
        margin-left: auto;
        margin-right: 20px;
        max-height: fit-content;
      "
    >
      <div style="text-align: left">
        <div
          style="
            float: left;
            color: #0f5841;
            font-size: 1.2rem;
            font-weight: 500;
            margin-bottom: 20px;
          "
        >
          Cart Total
        </div>
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          width: 100%;
          text-align: left;
          margin-top: 20px;
        "
      >
        <div style="color: #0f5841; font-size: 1.2rem">Subtotal:</div>
        <div style="color: #0f5841; font-size: 1.2rem">RM {{ getTotal() }}</div>
      </div>
      <hr
        style="
          border: 0;
          height: 2px;
          background-color: #0f5841;
          margin: 10px 0;
          width: 100%;
        "
      />
      <div
        style="
          display: flex;
          justify-content: space-between;
          width: 100%;
          text-align: left;
          margin-top: 10px;
        "
      >
        <div style="color: #0f5841; font-size: 1.2rem">Shipping:</div>
        <div style="color: #0f5841; font-size: 1.2rem">Free</div>
      </div>
      <hr
        style="
          border: 0;
          height: 1.5px;
          background-color: #0f5841;
          margin: 10px 0;
          width: 100%;
        "
      />
      <div
        style="
          display: flex;
          justify-content: space-between;
          width: 100%;
          text-align: left;
          margin-top: 10px;
        "
      >
        <div style="color: #0f5841; font-size: 1.2rem">Total:</div>
        <div style="color: #0f5841; font-size: 1.2rem">RM {{ getTotal() }}</div>
      </div>
      <el-button
        round
        color="#0F5841"
        style="
          margin: 30px 0 10px 0;
          background-image: linear-gradient(to right, #0f5841, #87ab9f);
          border: none;
        "
        size="large"
        ><RouterLink to="/checkout" style="color: #ffffff"
          >Proceed to Checkout</RouterLink
        ></el-button
      >
    </el-col>
  </el-row>
</template>
