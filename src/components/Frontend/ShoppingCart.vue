<script setup>
import { onMounted, ref } from "vue";
import { Close, Minus, Plus } from "@element-plus/icons-vue";
import { useProductStore } from "@/stores/productStore";
import { useToast } from "vue-toastification";
import router from "@/router/index.js";

const productStore = useProductStore();
const toast = useToast();

const cartItems = ref([]);
const cartItemUpdateRequest = ref([]);
const selectedItems = ref([]);

const fetchShoppingCart = async () => {
  cartItems.value = await productStore.shoppingCart();
  cartItemUpdateRequest.value = cartItems.value.map((item) => ({
    productID: item.productID,
    quantity: item.quantity,
  }));
};

const updateCart = async (productID, quantity) => {
  const updatedItem = cartItemUpdateRequest.value.find(
    (item) => item.productID === productID
  );
  if (updatedItem) {
    updatedItem.quantity = quantity;
  }

  await productStore.updateCart(cartItemUpdateRequest.value);
  await productStore.shoppingCart();
};

const deleteFromCart = async (productID) => {
  const indexItem = cartItems.value.findIndex(
    (item) => item.productID === productID
  );
  const indexItemRequest = cartItemUpdateRequest.value.findIndex(
    (item) => item.productID === productID
  );

  if (indexItem !== -1 && indexItemRequest !== -1) {
    cartItems.value.splice(indexItem, 1);
    cartItemUpdateRequest.value.splice(indexItemRequest, 1);
  }
  await productStore.updateCart(cartItemUpdateRequest.value);
};

const proceedPayment = () => {
  if (selectedItems.value.length === 0) {
    toast.info("You have to select at least 1 item.");
  } else {
    router.push({
      path: "checkout",
      query: { productID: selectedItems.value },
    });
  }
};

onMounted(async () => {
  await fetchShoppingCart();
});

const getSubtotal = (item) => {
  return item.productPrice * item.quantity;
};

const getTotal = () => {
  return cartItems.value.reduce((sum, item) => sum + getSubtotal(item), 0);
};
</script>

<template>
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
        v-if="cartItems.length > 0"
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
          Seller Name: {{ item.sellerName }}
        </div>
        <el-col :span="8">
          <div style="display: flex; align-items: center; gap: 10px">
            <el-checkbox-group v-model="selectedItems">
              <el-checkbox :value="item.productID"></el-checkbox>
            </el-checkbox-group>
            <img
              style="
                width: 150px;
                height: 120px;
                margin-right: 10px;
                object-fit: contain;
              "
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
              :disabled="item.quantity === item.stockQty"
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
      <el-row :gutter="20" v-else style="justify-content: center">
        <el-empty description="Shop And Get Your Favourites Now!" />
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
        @click="proceedPayment"
        >Proceed to Checkout</el-button
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
