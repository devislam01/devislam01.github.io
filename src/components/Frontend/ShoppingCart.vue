<script setup>
import Breadcrumb from "../Common/Breadcrumb.vue";
import { onMounted, ref } from "vue";
import { Close, Minus, Plus } from "@element-plus/icons-vue";
import { claimTypes } from "@/utils/constants.js";
import { useProductStore } from "@/stores/productStore";
import { useToast } from "vue-toastification";

const toast = useToast();
const productStore = useProductStore();
const cartItems = ref([]);
const cartItemUpdateRequest = ref([]);
const token = localStorage.getItem("accessToken") || "";
const userID = JSON.parse(atob(token.split(".")[1]))[claimTypes.userId];

const fetchshoppingCart = async () => {
  try {
    console.log("inside fecth shopping cart function");
    const response = await productStore.shoppingCart();
    cartItems.value = response;
    cartItemUpdateRequest.value = cartItems.value.map((item) => ({
      productID: item.productID,
      quantity: item.quantity,
    }));
    console.log("response: ", response);
    console.log("cartItmes: ", cartItems);
    console.log("cart Item Update Request:", cartItemUpdateRequest);
  } catch (error) {
    // toast.error(error);
  }
};

const updateCart = async (productID, quantity) => {
  console.log("inside function update cart");
  console.log("id and quantity pass into the fucntion:", productID, quantity);
  const updatedItem = cartItemUpdateRequest.value.find(
    (item) => item.productID == productID
  );
  if (updatedItem) {
    updatedItem.quantity = quantity;
  }
  console.log("the update item list request:", cartItemUpdateRequest);

  try {
    const payload = cartItemUpdateRequest.value;
    const response = await productStore.updateCart(payload);
  } catch (error) {
    console.log(error);
  }
};

const deleteFromCart = async (productID) => {
  console.log("inside function deleteFromCart");
  console.log("id pass into the fucntion:", productID);
  const indexItem = cartItems.value.findIndex(
    (item) => item.productID === productID
  );
  const indexItemRequest = cartItemUpdateRequest.value.findIndex(
    (item) => item.productID === productID
  );

  if (indexItem !== -1 && indexItemRequest !== -1) {
    cartItems.value.splice(indexItem, 1);
    cartItemUpdateRequest.value.splice(indexItemRequest, 1);
    console.log(`Item with productID ${productID} removed from cart.`);
    console.log("Item in shopping cart: ", cartItems);
    console.log("Item in request update item: ", cartItemUpdateRequest);
  } else {
    console.log(`Item with productID ${productID} not found.`);
  }
  console.log("the update item list request:", cartItemUpdateRequest);

  try {
    const payload = cartItemUpdateRequest.value;
    const response = await productStore.updateCart(payload);
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  console.log("inside ONMOUTED");
  await fetchshoppingCart();
});

// onMounted(() => {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   cartItems.value = cart[userID] || [];
// });

const getSubtotal = (item) => {
  return item.productPrice * item.quantity;
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
        <div
          style="
            width: 100%;
            text-align: left;
            color: #0f5841;
            font-size: 1.2rem;
            margin-left: 10px;
            margin-bottom: 5px;
          "
        >
          Seller Name: {{ item.seller }}
        </div>
        <el-col :span="8">
          <div style="display: flex; align-items: center; gap: 10px">
            <el-checkbox v-model="item.selected" />
            <img
              style="width: 150px; height: 120px; margin-right: 10px"
              :src="item.productImage"
              alt=""
            />
            <div style="color: #0f5841; font-size: 1.2rem">
              {{ item.productName }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" style="align-content: space-evenly">
          <div style="color: #0f5841; font-size: 1.2rem">
            RM {{ item.productPrice }}
          </div>
        </el-col>
        <el-col
          :span="5"
          style="align-content: space-evenly; justify-items: center"
        >
          <div style="display: flex; align-items: center; gap: 10px">
            <button
              @click="updateCart(item.productID, --item.quantity)"
              class="icon-button"
              :disabled="item.quantity <= 1"
            >
              <el-icon><Minus /></el-icon>
            </button>
            <div style="color: #0f5841; font-size: 1.2rem">
              {{ item.quantity }}
            </div>
            <button
              @click="updateCart(item.productID, ++item.quantity)"
              class="icon-button"
              :disabled="item.quantity == item.stockQty"
            >
              <el-icon><Plus /></el-icon>
            </button>
          </div>
        </el-col>
        <el-col :span="5" style="align-content: space-evenly">
          <div style="color: #0f5841; font-size: 1.2rem">
            RM {{ getSubtotal(item) }}
          </div>
        </el-col>
        <el-col :span="1" style="align-content: space-evenly">
          <button @click="deleteFromCart(item.productID)" class="icon-button">
            <el-icon><Close /></el-icon>
          </button>
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

<style scoped>
.icon-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>
