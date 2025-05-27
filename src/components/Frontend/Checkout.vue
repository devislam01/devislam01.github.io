<script setup>
import Breadcrumb from "../Common/Breadcrumb.vue";
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useOrderStore } from "@/stores/orderStore";
import { useToast } from "vue-toastification";

const orderStore = useOrderStore();
const router = useRouter();
const pickupMethod = ref("self-pickup");
const paymentMethod = ref("1");
const showDialogCOD = ref(false);
const showDialogQR = ref(false);
const toast = useToast();
const orderItems = ref([]);
const totalPrice = ref(0);
const orderSummaries = ref([]);
// const orderID = ref(0);
// const paymentID = ref(0);
const qrCodeImg = ref("");
const proceedPaymentRequest = ref({
  orderID: "",
  paymentID: "",
  receipt: [],
});

const fetchOrderSummaries = async () => {
  try {
    const response = await orderStore.getOrderSummaries();
    orderItems.value = response.shoppingCartObjs;
    totalPrice.value = response.total;
    console.log("orderItems in order summaries: ", orderItems.value);
    console.log("total price: ", totalPrice);
  } catch (error) {
    toast.error(error);
  }
};

const getSubtotal = (item) => {
  return item.productPrice * item.quantity;
};

const checkout = async () => {
  orderSummaries.value = orderItems.value.map((item) => ({
    ProductID: item.productID,
    Qty: item.quantity,
    UnitPrice: item.productPrice,
  }));
  if (paymentMethod.value == 1) {
    showDialogCOD.value = true;
  } else if (paymentMethod.value == 2) {
    showDialogQR.value = true;
  }
  const payload = {
    orderSummaries: orderSummaries.value,
    ShippingWay: "Self-Pickup/Meet-Up",
    PaymentMethod: paymentMethod.value,
  };
  try {
    console.log("payload in checkout Function: ", payload);
    const response = await orderStore.checkout(payload);
    proceedPaymentRequest.value.orderID = response.orderID;
    proceedPaymentRequest.value.paymentID = response.paymentID;

    // orderID.value = response.orderID;
    // paymentID.value = response.paymentID;
    qrCodeImg.value = response.qrCode;

    console.log("response:", response);
    return;
  } catch (error) {
    console.error(error);
  }
};

const confirmOrder = async () => {
  const payload = {
    PaymentID: proceedPaymentRequest.value.paymentID,
    OrderID: proceedPaymentRequest.value.orderID,
    Receipt: proceedPaymentRequest.value.receipt[0].raw,
  };
  try {
    console.log("payload in confirmOrder Function: ", payload);
    const response = await orderStore.confirmOrder(payload);
  } catch (error) {
    console.error(error);
  }
};

const open = () => {};

onMounted(async () => {
  await fetchOrderSummaries();
});
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
      Order Summary
    </div>
  </el-row>
  <el-row style="justify-content: center">
    <el-col
      :span="23"
      style="
        padding: 20px 30px 30px 30px;
        border-style: solid;
        border-color: #0f5841;
        border-width: 2px;
        border-radius: 15px;
      "
    >
      <el-row
        :gutter="20"
        style="border-bottom: 2px solid #0f5841; padding-bottom: 10px"
      >
        <el-col :span="9">
          <div
            style="
              color: #0f5841;
              font-size: 1.2rem;
              text-align: left;
              font-weight: 500;
            "
          >
            Product Ordered
          </div>
        </el-col>
        <el-col :span="5">
          <div
            style="
              color: #0f5841;
              font-size: 1.2rem;
              text-align: right;
              font-weight: 500;
            "
          >
            Unit Price
          </div>
        </el-col>
        <el-col :span="5">
          <div
            style="
              color: #0f5841;
              font-size: 1.2rem;
              text-align: right;
              font-weight: 500;
            "
          >
            Quantity
          </div>
        </el-col>
        <el-col :span="5">
          <div
            style="
              color: #0f5841;
              font-size: 1.2rem;
              text-align: right;
              font-weight: 500;
            "
          >
            Subtotal
          </div>
        </el-col>
      </el-row>
      <el-row
        :gutter="20"
        style="padding-bottom: 10px; margin-top: 10px; margin-bottom: 10px"
        v-for="(item, index) in orderItems"
        :key="index"
      >
        <el-col :span="9">
          <div style="display: flex; align-items: center; gap: 10px">
            <img style="width: 150px" :src="item.productImage" alt="" />
            <div style="color: #0f5841; font-size: 1.2rem">
              {{ item.productName }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" style="align-content: space-evenly">
          <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
            RM {{ item.productPrice }}
          </div>
        </el-col>
        <el-col
          :span="5"
          style="align-content: space-evenly; justify-items: right"
        >
          <div style="display: flex; align-items: center; gap: 10px">
            <div style="color: #0f5841; font-size: 1.2rem">
              {{ item.quantity }}
            </div>
          </div>
        </el-col>
        <el-col :span="5" style="align-content: space-evenly">
          <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
            RM {{ getSubtotal(item) }}
          </div>
        </el-col>
      </el-row>
      <hr
        style="border: 0; height: 1px; background-color: #0f5841; width: 100%"
      />
      <div
        style="
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-weight: 500;
          text-align: left;
        "
      >
        <div style="color: #0f5841; font-size: 1.2rem">Subtotal:</div>
        <div style="color: #0f5841; font-size: 1.2rem">RM {{ totalPrice }}</div>
      </div>
      <hr
        style="
          border: 0;
          height: 1px;
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
          font-weight: 500;
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
          height: 1px;
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
          font-weight: 500;
          text-align: left;
          margin-top: 10px;
        "
      >
        <div style="color: #0f5841; font-size: 1.2rem">Total:</div>
        <div style="color: #0f5841; font-size: 1.2rem">RM {{ totalPrice }}</div>
      </div>
      <div
        style="
          float: left;
          font-weight: 700;
          color: #0f5841;
          font-size: 1.3rem;
          width: 100%;
          text-align: left;
          margin-top: 20px;
          margin-bottom: 20px;
        "
      >
        Shipping Option
      </div>
      <div style="justify-self: left">
        <el-radio-group v-model="pickupMethod">
          <el-radio value="self-pickup">Self-Pickup / Meet-Up</el-radio>
        </el-radio-group>
      </div>
      <div
        style="
          float: left;
          font-weight: 700;
          color: #0f5841;
          font-size: 1.3rem;
          width: 100%;
          text-align: left;
          margin-top: 20px;
          margin-bottom: 20px;
        "
      >
        Payment Method
      </div>
      <div style="justify-self: left">
        <el-radio-group v-model="paymentMethod">
          <el-radio value="1">Cash on Delivery (COD)</el-radio>
          <el-radio value="2">QR Code</el-radio>
        </el-radio-group>
      </div>
      <el-button
        round
        color="#0F5841"
        @click="checkout"
        style="
          margin: 30px 0 0 0;
          background-image: linear-gradient(to right, #0f5841, #87ab9f);
          border: none;
          width: -webkit-fill-available;
        "
        size="large"
        >Place Order</el-button
      >
      <el-dialog
        v-model="showDialogCOD"
        title="Order Confirmation"
        width="30%"
        align-center
      >
        <span
          >Are you sure you want to place this order using Cash on
          Delivery(COD)?</span
        >
        <template #footer>
          <el-button @click="showDialogCOD = false">Close</el-button>
          <el-button type="primary" @click="confirmOrder">Confirm</el-button>
        </template>
      </el-dialog>
      <el-dialog
        v-model="showDialogQR"
        title="QR Payment Confirmation"
        width="30%"
        align-center
      >
        <div style="text-align: justify">
          Please scan the QR code below and transfer the exact total amount of
          your order to complete the payment. After the transfer, kindly upload
          a screenshot of the payment receipt as proof.
        </div>
        <img style="width: 100%" :src="qrCodeImg" alt="" />
        <div style="text-align: left">
          <el-upload
            v-model:file-list="proceedPaymentRequest.receipt"
            class="upload-demo"
            style="width: 100%"
            action="#"
            :limit="1"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button type="primary">Upload Payment Receipt</el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip text-red">
                limit 1 file, new file will cover the old file
              </div>
            </template>
          </el-upload>
        </div>
        <template #footer>
          <el-button @click="showDialogQR = false">Close</el-button>
          <el-button type="primary" @click="confirmOrder"
            >Confirm Order</el-button
          >
        </template>
      </el-dialog>
    </el-col>
  </el-row>
</template>
