<script setup>
import Breadcrumb from "../Common/Breadcrumb.vue";
import { ref, watchEffect } from "vue";
import { onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useOrderStore } from "@/stores/orderStore";

const toast = useToast();
const orderStore = useOrderStore();

const activeName = ref("first");
const visibleDialog = ref(false);
const currentImgUrl = ref("");
const buyerOrderList = ref([]);
const sellerOrderList = ref([]);

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

const markComplete = async () => {
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
    const response = await orderStore.markComplete(payload);
    if (response.code === 200) {
      toast.success("Update Successfully!");
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const markOrderComplete = async () => {
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
    const response = await orderStore.markOrderComplete(payload);
    if (response.code === 200) {
      toast.success("Update Successfully!");
    }
    console.log(response);
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
                padding-top: 10px;
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
            <el-row
              style="width: 100%; margin-top: 10px; justify-content: right"
            >
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
              @click="redirectToWhatsApp(seller.sellerPhoneNo)"
              >Contact Seller</el-button
            >
            <el-button
              v-if="order.status !== 'Completed'"
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
          </el-row>
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
            v-if="order.status === 'Completed'"
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
            @click="markComplete"
            >Confirm Order</el-button
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
</template>
