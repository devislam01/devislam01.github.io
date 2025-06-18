<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useOrderStore } from "@/stores/orderStore";
import { useToast } from "vue-toastification";
import { useLoadingStore } from "@/stores/loadingStore.js";

const orderStore = useOrderStore();
const loadingStore = useLoadingStore();
const router = useRouter();
const toast = useToast();
const currentQRIndex = ref(0);

const pickupMethod = ref("self-pickup");
const paymentMethod = ref("1");
const showDialogCOD = ref(false);
const showDialogQR = ref(false);
const orderItems = ref([]);
const totalPrice = ref(0);
const orderSummaries = ref([]);
const proceedPaymentRequest = ref({
  orderID: "",
  receiptList: [
    {
      paymentID: null,
      receipt: [],
    },
  ],
});

const fetchOrderSummaries = async (productIDs) => {
  const response = await orderStore.getOrderSummaries(productIDs);
  orderItems.value = response.shoppingCartObjs;
  totalPrice.value = response.total;
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

  const payload = {
    orderSummaries: orderSummaries.value,
    ShippingWay: "Self-Pickup/Meet-Up",
    PaymentMethod: paymentMethod.value,
  };

  const response = await orderStore.checkout(payload);

  if (response.code === 200) {
    proceedPaymentRequest.value.orderID =
      response.data.proceedToPayments[0]?.orderID || "";

    proceedPaymentRequest.value.receiptList =
      response.data.proceedToPayments.map((item) => ({
        paymentID: item.paymentID,
        qrCodeUrl: item.qrCode,
        productName: item.productName,
        price: item.price,
        receipt: [],
      }));

    if (paymentMethod.value == 1) {
      showDialogCOD.value = true;
    } else if (paymentMethod.value == 2) {
      showDialogQR.value = true;
    }
  }
};

const confirmOrder = async (paymentMethodID) => {
  const formData = new FormData();

  formData.append("OrderID", proceedPaymentRequest.value.orderID);

  for (const [
    index,
    item,
  ] of proceedPaymentRequest.value.receiptList.entries()) {
    const isQR = paymentMethodID === 2;

    if (isQR) {
      if (!item.receipt || item.receipt.length === 0) {
        toast.info("Please upload your receipts");
        return;
      }
      formData.append(`ReceiptList[${index}].Receipt`, item.receipt[0].raw);
    }

    formData.append(`ReceiptList[${index}].PaymentID`, item.paymentID);
  }

  try {
    const response = await orderStore.confirmOrder(formData);

    if (response.code === 200) {
      await router.push("/");
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  const productIDs = router.currentRoute.value.query;
  await fetchOrderSummaries(productIDs);
});
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
          <el-button
            type="primary"
            :loading="loadingStore.loading"
            :disabled="loadingStore.loading"
            @click="confirmOrder(1)"
            >Confirm</el-button
          >
        </template>
      </el-dialog>
      <el-dialog
        v-model="showDialogQR"
        title="QR Payment Confirmation"
        width="22vw"
        align-center
      >
        <div style="text-align: justify">
          Please scan the QR code below and transfer the exact total amount of
          your order to complete the payment. After the transfer, kindly upload
          a screenshot of the payment receipt as proof.
        </div>
        <div
          style="
            width: 100%;
            text-align: left;
            font-weight: 700;
            margin-top: 10px;
            margin-bottom: 10px;
          "
        >
          Price Need to Transfer: RM
          {{ proceedPaymentRequest.receiptList[currentQRIndex].price }}
        </div>
        <div v-if="proceedPaymentRequest.receiptList.length > 0">
          <div style="margin-bottom: 20px; text-align: left">
            <img
              :src="proceedPaymentRequest.receiptList[currentQRIndex].qrCodeUrl"
              alt="QR Code"
              style="width: 100%"
            />

            <el-upload
              v-model:file-list="
                proceedPaymentRequest.receiptList[currentQRIndex].receipt
              "
              class="upload-demo"
              style="width: 100%; margin-top: 10px"
              action="#"
              :limit="1"
              :auto-upload="false"
            >
              <template #trigger>
                <el-button type="primary">Upload Payment Receipt</el-button>
              </template>
              <template #tip>
                <div class="el-upload__tip text-red">
                  Limit 1 file, new file will replace the old one.
                </div>
              </template>
            </el-upload>
          </div>
        </div>
        <template #footer>
          <div
            style="
              width: 100%;
              display: flex;
              justify-content: flex-end;
              gap: 8px;
            "
          >
            <el-button v-if="currentQRIndex > 0" @click="currentQRIndex--">
              Previous
            </el-button>

            <el-button
              v-if="
                currentQRIndex < proceedPaymentRequest.receiptList.length - 1
              "
              @click="currentQRIndex++"
            >
              Next
            </el-button>

            <el-button
              v-if="
                currentQRIndex === proceedPaymentRequest.receiptList.length - 1
              "
              type="primary"
              :loading="loadingStore.loading"
              :disabled="loadingStore.loading"
              @click="confirmOrder(2)"
            >
              Confirm Order
            </el-button>
          </div>
        </template>
      </el-dialog>
    </el-col>
  </el-row>
</template>
