<script setup>
import Breadcrumb from "../Common/Breadcrumb.vue";
import { ref, watchEffect } from "vue";
import { useToast } from "vue-toastification";
import { useOrderStore } from "@/stores/orderStore";
import { useLoadingStore } from "@/stores/loadingStore.js";
import router from "@/router/index.js";
import { getTagColor } from "@/utils/constants.js";

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
const showDialogCancel = ref(false);
const cancelPayload = ref({
  orderItemID: null,
  cancelReason: "",
});
const showDialogCancelWholeOrder = ref(false);
const cancelWholeOrderPayload = ref({
  orderID: null,
  cancelReason: "",
});
const proceedPaymentRequest = ref({
  orderID: "",
  receiptList: [
    {
      paymentID: "",
      receipt: [],
    },
  ],
});
const dialogProceedPaymentInfo = ref({
  orderID: null,
  QRList: [
    {
      paymentID: null,
      price: null,
      QRCode: [],
    },
  ],
});
const showDialogApproveCancelRequest = ref(false);
const approveCancelPayload = ref({
  orderItemID: null,
});
const showDialogRejectCancelRequest = ref(false);
const rejectCancelPayload = ref({
  orderItemID: null,
  Reason: "",
});
const showDialogRateProduct = ref(false);
const ratingPayload = ref({
  orderItemID: null,
  rating: 0,
  feedback: "",
});
const currentItem = ref({
  sellerName: "",
  orderItemID: null,
  productImage: "",
});

const openReceiptDialog = (imgUrl) => {
  visibleDialog.value = true;
  currentImgUrl.value = imgUrl;
};

const closeReceiptDialog = () => {
  visibleDialog.value = false;
  currentImgUrl.value = "";
};

const openDialogQR = (order, paymentMethodID) => {
  proceedPaymentRequest.value = {
    orderID: order.orderID,
    receiptList: order.orderItems.map((item) => ({
      paymentID: item.paymentID,
      receipt: [],
    })),
  };

  if (paymentMethodID === 1) {
    showDialogCOD.value = true;
  } else if (paymentMethodID === 2) {
    dialogProceedPaymentInfo.value = {
      orderID: order.orderID,
      QRList: order.orderItems.map((item) => ({
        paymentID: item.paymentID,
        price: item.totalAmtForSeller,
        QRCode: item.paymentQRCode,
      })),
    };

    showDialogQR.value = true;
  }
};

const openDialogCancel = (orderItemID) => {
  cancelPayload.value = {
    orderItemID: orderItemID,
  };
  showDialogCancel.value = true;
};

const openDialogCancelWholeOrder = (orderID) => {
  cancelWholeOrderPayload.value = {
    orderID: orderID,
  };
  showDialogCancelWholeOrder.value = true;
};

const openDialogApproveCancel = (orderItemID) => {
  approveCancelPayload.value = {
    orderItemID: orderItemID,
  };
  showDialogApproveCancelRequest.value = true;
};

const openDialogRejectCancel = (orderItemID) => {
  rejectCancelPayload.value = {
    orderItemID: orderItemID,
  };
  showDialogRejectCancelRequest.value = true;
};

const openDialogRateProduct = (orderItem, item) => {
  ratingPayload.value = {
    orderItemID: item.orderItemID,
  };

  currentItem.value = {
    sellerName: orderItem.sellerName,
    orderItemID: item.orderItemID,
    productImage: item.productImage,
  };

  showDialogRateProduct.value = true;
};

const requestToCancelOrder = async () => {
  const response = await orderStore.requestToCancelOrder(cancelPayload.value);
  if (response.code === 200) {
    toast.success(response.message);
    showDialogCancel.value = false;
    await fetchBuyerOrder();
  } else {
    toast.error(resp.message);
  }
};

const requestToCancelWholeOrder = async () => {
  const resp = await orderStore.requestToCancelWholeOrder(
    cancelWholeOrderPayload.value
  );
  if (resp.code === 200) {
    toast.success(resp.message);
    showDialogCancelWholeOrder.value = false;
    await fetchBuyerOrder();
  } else {
    toast.error(resp.message);
  }
};

const confirmCancel = async () => {
  const response = await orderStore.confirmCancel(approveCancelPayload.value);
  if (response.code === 200) {
    toast.success(response.message);
    showDialogApproveCancelRequest.value = false;
    await fetchSellerOrder();
  } else {
    toast.error(resp.message);
  }
};

const rejectCancel = async () => {
  const response = await orderStore.rejectCancel(rejectCancelPayload.value);
  if (response.code === 200) {
    toast.success(response.message);
    showDialogRejectCancelRequest.value = false;
    await fetchSellerOrder();
  } else {
    toast.error(resp.message);
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
      showDialogQR.value = false;
      showDialogCOD.value = false;
      await fetchBuyerOrder();
    }
  } catch (error) {
    console.error(error);
  }
};

const markOrderComplete = async (orderID) => {
  const payload = {
    orderID: orderID,
  };
  const resp = await orderStore.markOrderComplete(payload);
  if (resp.code === 200) {
    toast.success(resp.message);
    await fetchSellerOrder();
  } else {
    toast.error(resp.message);
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

const rateProduct = async () => {
  const response = await orderStore.rateProduct(ratingPayload.value);
  if (response.code === 200) {
    toast.success(response.message);
    showDialogRateProduct.value = false;
    await fetchBuyerOrder();
  }
};

watchEffect(async () => {
  if (activeName.value === "first") {
    await fetchBuyerOrder();
  } else {
    await fetchSellerOrder();
  }
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
                  Order Status:
                  <el-tag
                    :type="getTagColor[order.status]"
                    size="large"
                    effect="dark"
                    round
                    >{{ order.status }}</el-tag
                  >
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row
            v-for="(seller, indexSeller) in order.orderItems"
            :key="indexSeller"
            style="width: 100%"
          >
            <el-divider />
            <div
              style="
                display: block;
                width: 100%;
                text-align: left;
                padding-top: 5px;
                padding-bottom: 5px;
                color: black;
              "
            >
              Sold By: {{ seller.sellerName }}
            </div>
            <el-row
              v-for="(item, indexItem) in seller.items"
              :key="indexItem"
              style="width: 100%"
            >
              <el-divider />
              <el-col
                :span="24"
                style="display: flex; justify-content: left; margin-top: 5px"
              >
                <div style="color: #000000">
                  Status:
                  <el-tag
                    :type="getTagColor[item.status]"
                    size="large"
                    effect="dark"
                    round
                    >{{ item.status }}</el-tag
                  >
                </div>
              </el-col>
              <el-col
                :span="24"
                style="display: flex; justify-content: left; margin-top: 5px"
                v-if="item.reason !== null && item.reason !== ''"
              >
                <div style="color: #000000">
                  Reject Reason:
                  <el-text>{{ item.reason }}</el-text>
                </div>
              </el-col>
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
              <el-button
                v-if="
                  (order.status === 'Processing' ||
                    order.status === 'PartiallyRequestCancel') &&
                  item.status !== 'RequestCancel' &&
                  item.status !== 'Cancelled' &&
                  item.status !== 'Completed' &&
                  (order.orderItems.length > 1 || seller.items.length > 1)
                "
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
                @click="openDialogCancel(item.orderItemID)"
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
              <el-button
                v-if="item.status === 'Completed' && !item.hasRating"
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
                @click="openDialogRateProduct(seller, item)"
                >Rate Product</el-button
              >
              <el-button
                v-if="order.orderItems.length > 1"
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
                @click="redirectToWhatsApp(seller.sellerPhoneNo)"
                >Contact Seller</el-button
              >
            </el-row>
          </el-row>
          <el-divider />
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
            v-if="order.status === 'Processing'"
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
            @click="openDialogCancelWholeOrder(order.orderID)"
            >Request To Cancel All</el-button
          >
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
            @click="openDialogQR(order, order.paymentMethodID)"
            >Confirm Order</el-button
          >
          <el-button
            v-if="order.orderItems.length === 1"
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
            @click="redirectToWhatsApp(order.orderItems[0].sellerPhoneNo)"
            >Contact Seller</el-button
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
          <el-row style="width: 100%; padding-bottom: 10px">
            <el-col :span="12" style="text-align: left">
              <div
                style="
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  font-size: 1.1rem;
                "
              >
                <div style="color: #0f5841">Order ID: {{ order.orderID }}</div>
                <el-divider
                  direction="vertical"
                  style="border-left-width: 2px; border-color: black"
                />
                <div style="color: black">Bought By: {{ order.buyerName }}</div>
              </div>
            </el-col>
          </el-row>
          <el-divider />
          <el-row
            v-for="(item, indexItem) in order.orderItems"
            :key="indexItem"
            style="width: 100%"
          >
            <el-col
              :span="24"
              style="display: flex; justify-content: left; margin-top: 5px"
            >
              <div style="color: #000000">
                Status:
                <el-tag
                  :type="getTagColor[item.status]"
                  size="large"
                  effect="dark"
                  round
                  >{{ item.status }}</el-tag
                >
              </div>
            </el-col>
            <el-col
              :span="24"
              style="display: flex; justify-content: left; margin-top: 5px"
              v-if="item.reason !== null && item.reason !== ''"
            >
              <div style="color: #000000">
                Cancel Reason:
                <el-text>{{ item.reason }}</el-text>
              </div>
            </el-col>
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
            <el-button
              v-if="item.status === 'RequestCancel'"
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
              @click="openDialogApproveCancel(item.orderItemID)"
              >Approve Request</el-button
            >
            <el-button
              v-if="item.status === 'RequestCancel'"
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
              @click="openDialogRejectCancel(item.orderItemID)"
            >
              Reject Request
            </el-button>
            <el-divider />
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
            v-if="order.orderItems.some((item) => item.status === 'Processing')"
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
            :loading="loadingStore.loading"
            :disabled="loadingStore.loading"
            >Complete Order</el-button
          >
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
      {{ dialogProceedPaymentInfo.QRList[currentQRIndex].price }}
    </div>
    <div v-if="dialogProceedPaymentInfo.QRList.length > 0">
      <div style="margin-bottom: 20px; text-align: left">
        <img
          :src="dialogProceedPaymentInfo.QRList[currentQRIndex].QRCode"
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
          v-if="currentQRIndex < dialogProceedPaymentInfo.QRList.length - 1"
          @click="currentQRIndex++"
        >
          Next
        </el-button>

        <el-button
          v-if="currentQRIndex === dialogProceedPaymentInfo.QRList.length - 1"
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
    v-model="showDialogCancel"
    title="Cancel Confirmation"
    width="30%"
    align-center
  >
    <span>Are you sure you want to cancel this order?</span>
    <el-input
      type="textarea"
      v-model="cancelPayload.cancelReason"
      placeholder="Why cancel this order?"
    ></el-input>
    <template #footer>
      <el-button @click="showDialogCancel = false">Close</el-button>
      <el-button
        type="primary"
        :loading="loadingStore.loading"
        :disabled="loadingStore.loading"
        @click="requestToCancelOrder"
        >Cancel Anyway</el-button
      >
    </template>
  </el-dialog>

  <el-dialog
    v-model="showDialogCancelWholeOrder"
    title="Cancel Order Confirmation"
    width="30%"
    align-center
  >
    <span>Are you sure you want to cancel the whole order?</span>
    <el-input
      type="textarea"
      v-model="cancelWholeOrderPayload.cancelReason"
      placeholder="Why cancel this order?"
    ></el-input>
    <template #footer>
      <el-button @click="showDialogCancelWholeOrder = false">Close</el-button>
      <el-button
        type="primary"
        :loading="loadingStore.loading"
        :disabled="loadingStore.loading"
        @click="requestToCancelWholeOrder"
        >Cancel Anyway</el-button
      >
    </template>
  </el-dialog>

  <el-dialog
    v-model="showDialogApproveCancelRequest"
    title="Cancellation Request"
    width="30%"
    align-center
  >
    <span>Are you sure you want to accept the cancellation request?</span>
    <template #footer>
      <el-button @click="showDialogApproveCancelRequest = false"
        >Close</el-button
      >
      <el-button
        type="primary"
        :loading="loadingStore.loading"
        :disabled="loadingStore.loading"
        @click="confirmCancel"
        >Yes, Cancel It</el-button
      >
    </template>
  </el-dialog>

  <el-dialog
    v-model="showDialogRejectCancelRequest"
    title="Cancellation Request"
    width="30%"
    align-center
  >
    <span>Are you sure you want to reject the cancel request?</span>
    <el-input
      type="textarea"
      placeholder="Why reject the cancellation request"
      v-model="rejectCancelPayload.Reason"
    ></el-input>
    <template #footer>
      <el-button @click="showDialogRejectCancelRequest = false"
        >Close</el-button
      >
      <el-button
        type="primary"
        :loading="loadingStore.loading"
        :disabled="loadingStore.loading"
        @click="rejectCancel"
        >Yes, Reject It</el-button
      >
    </template>
  </el-dialog>

  <!-- Rate Product Dialog -->
  <el-dialog
    v-model="showDialogRateProduct"
    title="Rate Product"
    width="600"
    style="text-align: center"
  >
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      "
    >
      <div>
        <div
          style="
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
          "
        >
          <div style="color: #0f5841; font-size: 1.1rem">Seller:</div>
          <div style="color: #0f5841; font-size: 1.1rem">
            {{ currentItem.sellerName }}
          </div>
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
          "
        >
          <div style="color: #0f5841; font-size: 1.1rem">Product Sold:</div>
          <img
            style="width: 100px; border-radius: 10px; border: 2px solid #0f5841"
            :src="currentItem.productImage"
            alt=""
          />
          <div style="color: #0f5841; font-size: 1.1rem">
            {{ currentItem.productName }}
          </div>
        </div>
      </div>
      <el-rate v-model="ratingPayload.rating" allow-half />
    </div>
    <div style="margin-top: 10px">
      <div
        style="
          color: #0f5841;
          font-size: 1.1rem;
          margin-bottom: 5px;
          text-align: left;
        "
      >
        Leave Your Feedback:
      </div>
      <el-input
        v-model="ratingPayload.feedback"
        type="textarea"
        :rows="4"
        placeholder="Write your feedback here..."
      />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showDialogRateProduct = false">Cancel</el-button>
        <el-button type="primary" @click="rateProduct">Submit Rating</el-button>
      </div>
    </template>
  </el-dialog>
</template>
