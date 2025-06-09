<script setup>
import Breadcrumb from "../Common/Breadcrumb.vue";
import { ref, watchEffect } from "vue";
import { onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useOrderStore } from "@/stores/orderStore";
import { useLoadingStore } from "@/stores/loadingStore.js";

const toast = useToast();
const orderStore = useOrderStore();
const loadingStore = useLoadingStore();

const activeName = ref("first");
const visibleDialog = ref(false);
const currentImgUrl = ref("");
const buyerOrderList = ref([]);
const sellerOrderList = ref([]);
const showDialogQR = ref(false);
const showDialogCOD = ref(false);
const currentQRIndex = ref(0);

const proceedPaymentRequest = ref({
  orderID: "",
  receiptList: [
    {
      paymentID: "",
      receipt: [],
    },
  ],
});

const openReceiptDialog = (imgUrl) => {
  visibleDialog.value = true;
  currentImgUrl.value = imgUrl;
};

const closeReceiptDialog = () => {
  visibleDialog.value = false;
  currentImgUrl.value = "";
};

const requestToCancelOrder = async () => {
  try {
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
    const response = await orderStore.requestToCancelOrder(payload);
    if (response.code === 200) {
      toast.success("Update Successfully!");
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const confirmCancel = async () => {
  try {
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
    const response = await orderStore.confirmCancel(payload);
    if (response.code === 200) {
      toast.success("Update Successfully!");
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const rejectCancel = async () => {
  try {
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
    const response = await orderStore.rejectCancel(payload);
    if (response.code === 200) {
      toast.success("Update Successfully!");
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const checkout = async (order) => {
  try {
    console.log("order pass into checkout: ", order);
    proceedPaymentRequest.value.orderID = order.orderID;
    proceedPaymentRequest.value.receiptList = order.orderItems.map(
      (seller) => ({
        paymentID: seller.paymentID,
        qrCodeUrl: seller.paymentQRCode,
        price: seller.totalAmtForSeller,
        receipt: [],
      })
    );

    if (order.paymentMethodID == 1) {
      showDialogCOD.value = true;
    } else if (order.paymentMethodID == 2) {
      showDialogQR.value = true;
    }
  } catch (error) {
    console.error(error);
  }
};

const confirmOrder = async () => {
  const formData = new FormData();

  formData.append("OrderID", proceedPaymentRequest.value.orderID);

  proceedPaymentRequest.value.receiptList.forEach((item, index) => {
    formData.append(`ReceiptList[${index}].PaymentID`, item.paymentID);

    if (item.receipt && item.receipt.length > 0) {
      console.log(item.receipt[0].raw);
      formData.append(`ReceiptList[${index}].Receipt`, item.receipt[0].raw);
    }
  });

  try {
    const response = await orderStore.confirmOrder(formData);

    if (response.code === 200) {
      showDialogQR.value = false;
      showDialogCOD.value = false;
      fetchBuyerOrder();
    }
  } catch (error) {
    console.error(error);
  }
};

const markComplete = async () => {
  try {
    const payload = {};
    const response = await orderStore.markComplete(payload);
    if (response.code === 200) {
      toast.success("Update Successfully!");
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const markOrderComplete = async (orderID) => {
  try {
    const payload = {
      orderID: orderID,
    };
    const response = await orderStore.markOrderComplete(payload);
    if (response.code === 200) {
      toast.success(response.message);
      fetchSellerOrder();
    }
  } catch (error) {
    console.log(error);
  }
};

const redirectToWhatsApp = (phoneNo) => {
  const formattedNumber = phoneNo.startsWith("60")
    ? phoneNo
    : "60" + phoneNo.replace(/^0+/, "");

  const whatsappUrl = `https://wa.me/${formattedNumber}`;

  window.open(whatsappUrl, "_blank");
};

const fetchBuyerOrder = async () => {
  try {
    buyerOrderList.value = await orderStore.getBuyerOrder();
  } catch (error) {
    toast.error(error);
  }
};

const fetchSellerOrder = async () => {
  try {
    sellerOrderList.value = await orderStore.getSellerOrder();
  } catch (error) {
    toast.error(error);
  }
};

watchEffect(async () => {
  if (activeName.value === "first") {
    await fetchBuyerOrder();
  } else {
    await fetchSellerOrder();
  }
});

onMounted(async () => {
  await fetchBuyerOrder();
});
</script>

<template>
  <Breadcrumb></Breadcrumb>
  <el-tabs type="border-card" v-model="activeName">
    <el-tab-pane label="Purchase List" name="first">
      <el-row
        v-for="(order, index) in buyerOrderList"
        :key="index"
        style="
          border-style: solid;
          border-color: #0f5841;
          border-radius: 15px;
          margin: 0 20px 20px 20px;
        "
      >
        <el-col :span="24" style="padding: 20px">
          <el-row style="width: 100%; padding-bottom: 10px">
            <el-col :span="12" style="text-align: left">
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1.1rem">
                  Order ID: {{ order.orderID }}
                </div>
              </div>
            </el-col>
            <el-col
              :span="12"
              style="align-content: center; justify-items: right"
            >
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1rem">
                  Order Status: {{ order.status }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row
            v-for="(seller, indexSeller) in order.orderItems"
            :key="indexSeller"
            style="width: 100%"
          >
            <div
              style="
                display: block;
                width: 100%;
                text-align: left;
                padding-top: 5px;
                padding-bottom: 5px;
                border-top: 2px solid #0f5841;
              "
            >
              Seller Name: {{ seller.sellerName }}
            </div>
            <el-row
              v-for="(item, indexItem) in seller.items"
              :key="indexItem"
              style="width: 100%"
            >
              <el-col :span="12">
                <div style="display: flex; align-items: center; gap: 10px">
                  <div
                    style="
                      max-width: 9vw;
                      height: 9vw;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      border-radius: 8px;
                      overflow: hidden;
                    "
                  >
                    <img
                      :src="item.productImage"
                      alt=""
                      style="
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                      "
                    />
                  </div>
                  <div style="color: #0f5841; font-size: 1.2rem">
                    {{ item.productName }}
                  </div>
                  <div style="color: #0f5841; font-size: 1.2rem">
                    x {{ item.quantity }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" style="align-content: center">
                <div
                  style="color: #0f5841; font-size: 1.2rem; text-align: right"
                >
                  RM {{ (item.quantity * item.price).toFixed(2) }}
                </div>
              </el-col>
            </el-row>
            <div style="display: flex; justify-content: flex-end; width: 100%">
              <el-button
                round
                color="#0F5841"
                style="
                  float: right;
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                  margin-bottom: 10px;
                "
                size="large"
                @click="redirectToWhatsApp(seller.sellerPhoneNo)"
                >Contact Seller</el-button
              >
            </div>
            <el-button
              v-if="order.status !== 'Completed' && order.status !== 'Pending'"
              round
              color="#0F5841"
              style="
                float: right;
                background-image: linear-gradient(to right, #0f5841, #87ab9f);
                border: none;
                width: 250px;
                margin-top: 20px;
              "
              size="large"
              @click="requestToCancelOrder"
              >Request To Cancel</el-button
            >
            <el-button
              v-if="order.status !== 'Pending' && order.paymentMethodID === 2"
              round
              color="#0F5841"
              style="
                float: right;
                background-image: linear-gradient(to right, #0f5841, #87ab9f);
                border: none;
                width: 250px;
                margin-top: 20px;
                margin-right: 10px;
              "
              size="large"
              @click="openReceiptDialog(seller.receipt)"
              >Check Payment Receipt</el-button
            >
          </el-row>
          <el-row
            style="
              width: 100%;
              justify-content: right;
              border-top: 2px solid #0f5841;
            "
          >
            <div style="color: #0f5841; font-size: 1.2rem; margin-top: 10px">
              Order Total: RM {{ order.totalAmt }}
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method:
              {{ order.paymentMethodID === 1 ? "COD" : "QR PAYMENT" }}
            </div>
          </el-row>
          <el-button
            v-if="order.status === 'Pending'"
            round
            color="#0F5841"
            style="
              float: right;
              background-image: linear-gradient(to right, #0f5841, #87ab9f);
              border: none;
              width: 250px;
              margin-top: 20px;
            "
            size="large"
            @click="checkout(order)"
            >Confirm Order</el-button
          >
        </el-col>
      </el-row>
    </el-tab-pane>

    <!-- SELLER-->
    <el-tab-pane label="Sales List" name="second">
      <el-row
        v-for="(order, index) in sellerOrderList"
        :key="index"
        style="
          border-style: solid;
          border-color: #0f5841;
          border-radius: 15px;
          margin: 0 20px 20px 20px;
        "
      >
        <el-col :span="24" style="padding: 20px">
          <el-row
            style="
              width: 100%;
              padding-bottom: 10px;
              border-bottom: 2px solid #0f5841;
            "
          >
            <el-col :span="12" style="text-align: left">
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1.1rem">
                  Order ID: {{ order.orderID }}
                </div>
                <div>Buyer Name: {{ order.buyerName }}</div>
              </div>
            </el-col>
            <el-col
              :span="12"
              style="align-content: center; justify-items: right"
            >
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1rem">
                  Order Status: {{ order.status }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row
            v-for="(item, indexItem) in order.orderItems"
            :key="indexItem"
            style="width: 100%; border-bottom: 2px solid #0f5841"
          >
            <el-col :span="12">
              <div style="display: flex; align-items: center; gap: 10px">
                <div
                  style="
                    max-width: 9vw;
                    height: 9vw;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    overflow: hidden;
                  "
                >
                  <img
                    :src="item.productImage"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">
                  {{ item.productName }}
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">
                  x {{ item.quantity }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM {{ (item.quantity * item.price).toFixed(2) }}
              </div>
            </el-col>
          </el-row>
          <el-row style="width: 100%; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem; margin-top: 10px">
              Order Total: RM {{ order.totalAmt }}
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method:
              {{ order.paymentMethodID === 1 ? "COD" : "QR PAYMENT" }}
            </div>
          </el-row>
          <el-button
            round
            color="#0F5841"
            style="
              float: right;
              background-image: linear-gradient(to right, #0f5841, #87ab9f);
              border: none;
              width: 250px;
              margin-top: 20px;
            "
            size="large"
            @click="redirectToWhatsApp(order.buyerPhoneNo)"
            >Contact Buyer</el-button
          >
          <el-button
            v-if="order.status !== 'Pending' && order.paymentMethodID === 2"
            round
            color="#0F5841"
            style="
              float: right;
              background-image: linear-gradient(to right, #0f5841, #87ab9f);
              border: none;
              width: 250px;
              margin-top: 20px;
              margin-right: 10px;
            "
            size="large"
            @click="openReceiptDialog(order.receipt)"
            >Check Payment Receipt</el-button
          >
          <el-button
            v-if="order.status === 'Processing'"
            round
            color="#0F5841"
            style="
              float: right;
              background-image: linear-gradient(to right, #0f5841, #87ab9f);
              border: none;
              width: 250px;
              margin-top: 20px;
              margin-right: 20px;
            "
            size="large"
            @click="markOrderComplete(order.orderID)"
            >Mark All Completed</el-button
          >
          <el-button
            v-if="order.status === 'RequestCancel'"
            round
            color="#0F5841"
            style="
              float: right;
              background-image: linear-gradient(to right, #0f5841, #87ab9f);
              border: none;
              width: 250px;
              margin-top: 20px;
            "
            size="large"
            @click="confirmCancel"
            >Approve Request</el-button
          >
          <el-button
            v-if="order.status === 'RequestCancel'"
            round
            color="#0F5841"
            style="
              float: right;
              background-image: linear-gradient(to right, #0f5841, #87ab9f);
              border: none;
              width: 250px;
              margin-top: 20px;
            "
            size="large"
            @click="rejectCancel"
          >
            Reject Request
          </el-button>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>

  <el-dialog v-model="visibleDialog" title="Payment Receipt" width="30%">
    <img
      style="width: 15vw; object-fit: cover"
      :src="currentImgUrl"
      alt="404 Not Found"
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="closeReceiptDialog">OK</el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="showDialogQR"
    title="QR Payment Confirmation"
    width="22vw"
    align-center
  >
    <div style="text-align: justify">
      Please scan the QR code below and transfer the exact total amount of your
      order to complete the payment. After the transfer, kindly upload a
      screenshot of the payment receipt as proof.
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
        style="width: 100%; display: flex; justify-content: flex-end; gap: 8px"
      >
        <el-button v-if="currentQRIndex > 0" @click="currentQRIndex--">
          Previous
        </el-button>

        <el-button
          v-if="currentQRIndex < proceedPaymentRequest.receiptList.length - 1"
          @click="currentQRIndex++"
        >
          Next
        </el-button>

        <el-button
          v-if="currentQRIndex === proceedPaymentRequest.receiptList.length - 1"
          type="primary"
          :loading="loadingStore.loading"
          :disabled="loadingStore.loading"
          @click="confirmOrder"
        >
          Confirm Order
        </el-button>
      </div>
    </template>
  </el-dialog>
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
        @click="confirmOrder"
        >Confirm</el-button
      >
    </template>
  </el-dialog>
</template>
