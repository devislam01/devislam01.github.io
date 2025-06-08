<script setup>
import Breadcrumb from "../Common/Breadcrumb.vue";
import { ref } from "vue";
import { onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useOrderStore } from "@/stores/orderStore";
import { ITEM_RENDER_EVT } from "element-plus/es/components/virtual-list/src/defaults";

const currentIndex = ref(0);

const nextProduct = () => {
  if (currentIndex.value < products.value.length - 1) {
    currentIndex.value++;
  }
};

const prevProduct = () => {
  // Save current before going back
  products.value[currentIndex.value].rating = value.value;
  products.value[currentIndex.value].feedback = textarea.value;

  if (currentIndex.value > 0) {
    currentIndex.value--;
    // Load previous feedback
    value.value = products.value[currentIndex.value].rating;
    textarea.value = products.value[currentIndex.value].feedback;
  }
};

const products = ref([
  {
    seller: "Khai",
    productName: "Stove",
    image: "/src/assets/eStove.png",
  },
  {
    seller: "Ali",
    productName: "Rice Cooker",
    image: "/src/assets/eFan.jpg",
  },
]);

const showDialogCOD = ref(false);
const showDialogQR = ref(false);

// const input = ref('');
const toast = useToast();
const orderStore = useOrderStore();
const textarea = ref("");
const handleClose = ref("");
const dialogReceipt = ref(false);
const dialogVisible = ref(false);


const dialogSellerMap = ref({});
function openReceiptDialogSeller(orderId) {
  dialogSellerMap.value[orderId] = true;
}
function closeReceiptDialogSeller(orderId) {
  dialogSellerMap.value[orderId] = false;
}

const dialogBuyerMap = ref({});
function openReceiptDialogBuyer(orderId, sellerId) {
    const id = `${orderId}-${sellerId}`;
    dialogSellerMap.value[id] = true;
}
function closeReceiptDialogBuyer(orderId, sellerId) {
    const id = `${orderId}-${sellerId}`;
    dialogSellerMap.value[id] = false;
}





const value = ref();
const buyerPendingOrderList = ref([]);
const buyerProcessingOrderList = ref([]);
const buyerCompletedOrderList = ref([]);
const sellerPendingOrderList = ref([]);
const sellerProcessingOrderList = ref([]);
const sellerRequestCancelOrderList = ref([]);
const sellerCancelledOrderList = ref([]);
const sellerCompletedOrderList = ref([]);



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

const fetchBuyerOrder = async () => {
  try {
    console.log("Inside fetch Buyer Order");
    const response = await orderStore.getBuyerOrder();
    buyerPendingOrderList.value = [];
    buyerProcessingOrderList.value = [];
    buyerCompletedOrderList.value = [];

    buyerPendingOrderList.value = response.filter(
      (order) => order.status === "Pending"
    );
    buyerProcessingOrderList.value = response.filter(
      (order) => order.status === "Processing"
    );
    buyerCompletedOrderList.value = response.filter(
      (order) => order.status === "Completed"
    );

    console.log("Pending List: ", buyerPendingOrderList);
    console.log("Process List: ", buyerProcessingOrderList);
    console.log("Completed List: ", buyerCompletedOrderList);
  } catch (error) {
    toast.error(error);
  }
};

const fetchSellerOrder = async () => {
  try {
    console.log("Inside fetch Buyer Order");
    const response = await orderStore.getSellerOrder();
    sellerPendingOrderList.value = [];
    sellerProcessingOrderList.value = [];
    sellerRequestCancelOrderList.value = [];
    sellerCancelledOrderList.value = [];
    sellerCompletedOrderList.value = [];

    sellerPendingOrderList.value = response.filter(
      (order) => order.status === "Pending"
    );
    sellerProcessingOrderList.value = response.filter(
      (order) => order.status === "Processing"
    );
    sellerRequestCancelOrderList.value = response.filter(
      (order) => order.status === "RequestCancel"
    );
    sellerCancelledOrderList.value = response.filter(
      (order) => order.status === "Cancelled"
    );
    sellerCompletedOrderList.value = response.filter(
      (order) => order.status === "Completed"
    );

    console.log("Pending List: ", sellerPendingOrderList);
    console.log("Process List: ", sellerProcessingOrderList);
    console.log("Completed List: ", sellerCompletedOrderList);
  } catch (error) {
    toast.error(error);
  }
};

onMounted(async () => {
  await fetchBuyerOrder();
  await fetchSellerOrder();
});
</script>

<template>
  <Breadcrumb></Breadcrumb>
  <el-tabs type="border-card">
    <!-- <el-tab-pane label="Purchase List">
      <el-row
        v-for="(order, index) in buyerPendingOrderList"
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
              border-bottom: 2px solid #0f5841;
              padding-bottom: 10px;
            "
          >
            <el-col :span="12" style="text-align: left">
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1.1rem">
                  Seller Name: {{ order.orderItems[0].sellerName }}
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
            v-for="(item, indexItem) in order.orderItems"
            :key="indexItem"
            style="
              width: 100%;
              border-bottom: 2px solid #0f5841;
              margin-top: 10px;
            "
          >
            <el-col :span="12">
              <div
                style="
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  margin-bottom: 10px;
                "
              >
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
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Order Total: RM {{ order.totalAmt }}
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method:
              {{ order.paymentMethodID == 1 ? "COD" : "QR PAYMENT" }}
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
            >Contact Seller</el-button
          >
          <el-button
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
            >Confirm Order</el-button
          >
        </el-col>
      </el-row>
      <el-row
        v-for="(order, index) in buyerProcessingOrderList"
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
              border-bottom: 2px solid #0f5841;
              padding-bottom: 10px;
            "
          >
            <el-col :span="12" style="text-align: left">
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1.1rem">
                  Seller Name: {{ order.orderItems[0].sellerName }}
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
            v-for="(item, indexItem) in order.orderItems"
            :key="indexItem"
            style="
              width: 100%;
              border-bottom: 2px solid #0f5841;
              margin-top: 10px;
            "
          >
            <el-col :span="12">
              <div
                style="
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  margin-bottom: 10px;
                "
              >
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
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Order Total: RM {{ order.totalAmt }}
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method:
              {{ order.paymentMethodID == 1 ? "COD" : "QR PAYMENT" }}
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
            >Contact Seller</el-button
          >
          <el-button
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
            >Request to Cancel Order</el-button
          >

          <el-button
            v-if="order.paymentMethodID == 2"
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
            @click="dialogReceipt = true"
            >Check Payment Receipt</el-button
          >
          <el-dialog
            v-model="dialogReceipt"
            title="Payment Receipt"
            width="30%"
          >
            <img
              style="width: 15vw; object-fit: cover"
              :src="order.receipt"
              alt=""
            />
            <template #footer>
              <div class="dialog-footer">
                <el-button type="primary" @click="dialogReceipt = false"
                  >OK</el-button
                >
              </div>
            </template>
          </el-dialog>
        </el-col>
      </el-row>
      <el-row
        v-for="(order, index) in buyerCompletedOrderList"
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
              border-bottom: 2px solid #0f5841;
              padding-bottom: 10px;
            "
          >
            <el-col :span="12" style="text-align: left">
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1.1rem">
                  Seller Name: {{ order.orderItems[0].sellerName }}
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
            v-for="(item, indexItem) in order.orderItems"
            :key="indexItem"
            style="
              width: 100%;
              border-bottom: 2px solid #0f5841;
              margin-top: 10px;
            "
          >
            <el-col :span="12">
              <div
                style="
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  margin-bottom: 10px;
                "
              >
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
                {{ (item.quantity * item.price).toFixed(2) }}
              </div>
            </el-col>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Order Total: RM {{ order.totalAmt }}
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method:
              {{ order.paymentMethodID == 1 ? "COD" : "QR PAYMENT" }}
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
            >Contact Seller</el-button
          >
          <el-button
            round
            @click="dialogVisible = true"
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
            >Rate</el-button
          >
          <el-dialog
            v-model="dialogVisible"
            title="Rate Seller"
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
                    {{ order.orderItems[0].sellerName }}
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
                  <div style="color: #0f5841; font-size: 1.1rem">
                    Product Sold:
                  </div>
                  <img
                    style="
                      width: 100px;
                      border-radius: 10px;
                      border: 2px solid #0f5841;
                    "
                    :src="item.productImage"
                    alt=""
                  />
                  <div style="color: #0f5841; font-size: 1.1rem">
                    {{ item.productName }}
                  </div>
                </div>
              </div>
              <el-rate v-model="value" allow-half />
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
                v-model="textarea"
                type="textarea"
                :rows="4"
                placeholder="Write your feedback here..."
              />
            </div>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false"
                  >Submit</el-button
                >
              </div>
            </template>
          </el-dialog>
        </el-col>
      </el-row>
    </el-tab-pane> -->

    <!-- here start hardcode -->
    <el-tab-pane label="Purchase List">
      <!-- el-row for buyer => pending status DONE -->
      <el-row
        v-for="(order, index) in buyerPendingOrderList"
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
            style="width: 100%">
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
            style ="width: 100%;"
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
                    <div style="color: #0f5841; font-size: 1.2rem">{{ item.productName }}</div>
                    <div style="color: #0f5841; font-size: 1.2rem">x {{ item.quantity }}</div>
                </div>
                </el-col>
                <el-col :span="12" style="align-content: center">
                <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                    RM {{ (item.quantity * item.price).toFixed(2) }}
                </div>
                </el-col>
            </el-row>
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
              Payment Method: {{ order.paymentMethodID == 1 ? "COD" : "QR PAYMENT" }}
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
            >Contact Seller</el-button
          >
          <el-button
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
            >Confirm Order</el-button
          >
        </el-col>
      </el-row>


       <!-- el-row for buyer => process status DONE -->
      <el-row
       v-for="(order, index) in buyerProcessingOrderList"
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
            style="width: 100%">
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
            style="width: 100%;"
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
                    <div style="color: #0f5841; font-size: 1.2rem">{{ item.productName }}</div>
                    <div style="color: #0f5841; font-size: 1.2rem">x {{ item.quantity }}</div>
                </div>
                </el-col>
                <el-col :span="12" style="position: relative">
                <div
                    style="
                    position: absolute;
                    top: 0;
                    right: 0;
                    font-size: 1rem;
                    color: #0f5841;
                    "
                >
                    Product Status: {{ item.status }}
                </div>
                <div
                    style="
                    height: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    color: #0f5841;
                    font-size: 1.2rem;
                    "
                >
                    RM {{ (item.quantity * item.price).toFixed(2) }}
                </div>
                </el-col>
            </el-row>
            <div style="display: flex; justify-content: flex-end; width: 100%; margin-bottom: 10px;">
                <!-- v-if="order.paymentMethodID == 2" -->
            <el-button
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
                @click="openReceiptDialogBuyer(order.orderID, seller.sellerId)"
                >Check Payment Receipt</el-button
            >
            <el-dialog
                :id="`${order.orderID}-${seller.sellerId}`"
                v-model="dialogBuyerMap[`${order.orderID}-${seller.sellerId}`]"
                title="Payment Receipt"
                width="30%"
            >
                <img
                style="width: 15vw; object-fit: cover"
                :src="seller.receipt"
                alt=""
                />
                <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="closeReceiptDialogBuyer(order.orderID, seller.sellerId)"
                    >OK</el-button
                    >
                </div>
                </template>
            </el-dialog>
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
                >Request Cancel</el-button
            >
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
                >Contact Seller</el-button
            >
            </div>
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
              Payment Method: {{ order.paymentMethodID == 1 ? "COD" : "QR PAYMENT" }}
            </div>
          </el-row>
        </el-col>
      </el-row>


       <!-- el-row for seller => completed status DONE  -->
      <el-row
        v-for="(order, index) in buyerCompletedOrderList"
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
            style="width: 100%">
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
                    <div style="color: #0f5841; font-size: 1.2rem">{{ item.productName }}</div>
                    <div style="color: #0f5841; font-size: 1.2rem">x {{ item.quantity }}</div>
                </div>
                </el-col>
                <el-col :span="12" style="align-content: center">
                <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                    RM {{ (item.quantity * item.price).toFixed(2) }}
                </div>
                </el-col>
            </el-row>
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
              Payment Method: {{ order.paymentMethodID == 1 ? "COD" : "QR PAYMENT" }}
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
            >Contact Seller</el-button
          >
          <!-- v-if="order.paymentMethodID == 2" -->
          <el-button
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
            @click="dialogReceipt = true"
            >Check Payment Receipt</el-button
          >
          <el-dialog
            v-model="dialogReceipt"
            title="Payment Receipt"
            width="30%"
          >
            <img
              style="width: 15vw; object-fit: cover"
              src="/src/assets/eStove.png"
              alt=""
            />
            <template #footer>
              <div class="dialog-footer">
                <el-button type="primary" @click="dialogReceipt = false"
                  >OK</el-button
                >
              </div>
            </template>
          </el-dialog>
          <el-button
            round
            @click="dialogVisible = true"
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
            >Rate</el-button
          >
          <el-dialog
            v-model="dialogVisible"
            title="Rate Seller"
            width="50vw"
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
                    {{ products[currentIndex].seller }}
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
                  <div style="color: #0f5841; font-size: 1.1rem">
                    Product Sold:
                  </div>
                  <img
                    :src="products[currentIndex].image"
                    style="
                      width: 100px;
                      border-radius: 10px;
                      border: 2px solid #0f5841;
                    "
                  />
                  <div style="color: #0f5841; font-size: 1.1rem">
                    {{ products[currentIndex].productName }}
                  </div>
                </div>
              </div>
              <el-rate v-model="value" allow-half />
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
                v-model="textarea"
                type="textarea"
                :rows="4"
                placeholder="Write your feedback here..."
              />
            </div>
            <template #footer>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <!-- Pagination info -->
                <div style="color: #0f5841; font-size: 1rem">
                  {{ currentIndex + 1 }} / {{ products.length }}
                </div>

                <!-- Navigation buttons -->
                <div style="display: flex; gap: 10px">
                  <el-button v-if="currentIndex > 0" @click="prevProduct">
                    <el-icon><ArrowLeftBold /></el-icon>
                  </el-button>

                  <el-button
                    v-if="currentIndex < products.length - 1"
                    @click="nextProduct"
                  >
                    <el-icon><ArrowRightBold /></el-icon>
                  </el-button>

                  <el-button
                    v-if="currentIndex === products.length - 1"
                    type="primary"
                    @click="submitFeedback"
                  >
                    Submit
                  </el-button>
                </div>
              </div>
            </template>
          </el-dialog>
        </el-col>
      </el-row>





      <!-- v-for="(order, index) in buyerRequestCancelOrderList"
        :key="index" -->
      <el-row
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
                  Order ID: 003
                </div>
              </div>
            </el-col>
            <el-col
              :span="12"
              style="align-content: center; justify-items: right"
            >
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1rem">
                  Order Status: Request Cancel
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- v-for="(item, indexItem) in order.orderItems"
            :key="indexItem" -->
          <el-row style="width: 100%">
            <div
              style="
                display: block;
                width: 100%;
                text-align: left;
                padding-top: 10px;
                border-top: 2px solid #0f5841;
              "
            >
              Seller Name: KHAI
            </div>
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px">
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
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
              Order Total: RM 600
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method: COD
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
            >Contact Seller</el-button
          >
          <!-- v-if="order.paymentMethodID == 2" -->
          <el-button
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
            @click="dialogReceipt = true"
            >Check Payment Receipt</el-button
          >
          <el-dialog
            v-model="dialogReceipt"
            title="Payment Receipt"
            width="30%"
          >
            <img
              style="width: 15vw; object-fit: cover"
              src="/src/assets/eStove.png"
              alt=""
            />
            <template #footer>
              <div class="dialog-footer">
                <el-button type="primary" @click="dialogReceipt = false"
                  >OK</el-button
                >
              </div>
            </template>
          </el-dialog>
        </el-col>
      </el-row>


      <!-- v-for="(order, index) in buyerCancelledOrderList"
        :key="index" -->
      <el-row
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
                  Order ID: 004
                </div>
              </div>
            </el-col>
            <el-col
              :span="12"
              style="align-content: center; justify-items: right"
            >
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1rem">
                  Order Status: Cancelled
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- v-for="(item, indexItem) in order.orderItems"
            :key="indexItem" -->
          <el-row style="width: 100%">
            <div
              style="
                display: block;
                width: 100%;
                text-align: left;
                padding-top: 10px;
                border-top: 2px solid #0f5841;
              "
            >
              Seller Name: KHAI
            </div>
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px">
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
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
              Order Total: RM 600
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method: COD
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
            >Contact Seller</el-button
          >
          <!-- v-if="order.paymentMethodID == 2" -->
          <el-button
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
            @click="dialogReceipt = true"
            >Check Payment Receipt</el-button
          >
          <el-dialog
            v-model="dialogReceipt"
            title="Payment Receipt"
            width="30%"
          >
            <img
              style="width: 15vw; object-fit: cover"
              src="/src/assets/eStove.png"
              alt=""
            />
            <template #footer>
              <div class="dialog-footer">
                <el-button type="primary" @click="dialogReceipt = false"
                  >OK</el-button
                >
              </div>
            </template>
          </el-dialog>
        </el-col>
      </el-row>



     

      <!-- el-row for different seller => pending status DONE -->
      <!-- <el-row
        v-for="(order, index) in buyerPendingOrderList"
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
            v-for="(item, indexItem) in order.orderItems"
            :key="indexItem"
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
              Seller Name: {{ item.sellerName }}
            </div>
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
              Payment Method:{{
                order.paymentMethodID == 1 ? "COD" : "QR PAYMENT"
              }}
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
            >Contact Seller</el-button
          >
          <el-button
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
            >Confirm Order</el-button
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
                @click="confirmOrder"
                >Confirm</el-button
              >
            </template>
          </el-dialog>
          <el-dialog
            v-model="showDialogQR"
            title="QR Payment Confirmation"
            width="30%"
            align-center
          >
            <div style="text-align: justify">
              Please scan the QR code below and transfer the exact total amount
              of your order to complete the payment. After the transfer, kindly
              upload a screenshot of the payment receipt as proof.
            </div>
            <div
              v-for="(item, index) in proceedPaymentRequest.receiptList"
              :key="item.paymentID || index"
              style="margin-bottom: 20px; text-align: left"
            >
              <div>
                <img :src="item.qrCodeUrl" alt="QR Code" style="width: 100%" />
              </div>

              <el-upload
                v-model:file-list="item.receipt"
                class="upload-demo"
                style="width: 100%"
                action="#"
                :limit="proceedPaymentRequest.receiptList.length"
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
              <el-button
                type="primary"
                :loading="loadingStore.loading"
                :disabled="loadingStore.loading"
                @click="confirmOrder"
                >Confirm Order</el-button
              >
            </template>
          </el-dialog>
        </el-col>
      </el-row> -->

      <!-- el-row for different seller => process status (All item status: processing) DONE -->
      <!-- <el-row
        v-for="(order, index) in buyerProcessingOrderList"
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
            v-for="(item, indexItem) in order.orderItems"
            :key="indexItem"
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
              Seller Name: {{ item.sellerName }}
            </div>
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
            <el-col :span="12" style="position: relative">
              <div
                style="
                  position: absolute;
                  top: 0;
                  right: 0;
                  font-size: 1rem;
                  color: #0f5841;
                "
              >
                Product Status: {{ item.status }}
              </div>
              <div
                style="
                  height: 100%;
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  color: #0f5841;
                  font-size: 1.2rem;
                "
              >
                RM {{ (item.quantity * item.price).toFixed(2) }}
              </div>
            </el-col>
            <el-row style="width: 100%; margin-top: 10px">
              <div
                style="display: flex; justify-content: flex-end; width: 100%"
              >
                <el-button
                  v-if="order.paymentMethodID == 2"
                  round
                  color="#0F5841"
                  style="
                    float: right;
                    background-image: linear-gradient(
                      to right,
                      #0f5841,
                      #87ab9f
                    );
                    border: none;
                    width: 250px;
                    margin-right: 10px;
                  "
                  size="large"
                  @click="dialogReceipt = true"
                  >Check Payment Receipt</el-button
                >
                <el-dialog
                  v-model="dialogReceipt"
                  title="Payment Receipt"
                  width="30%"
                >
                  <img
                    style="width: 15vw; object-fit: cover"
                    :src="item.receipt"
                    alt=""
                  />
                  <template #footer>
                    <div class="dialog-footer">
                      <el-button type="primary" @click="dialogReceipt = false"
                        >OK</el-button
                      >
                    </div>
                  </template>
                </el-dialog>
                <el-button
                  round
                  color="#0F5841"
                  style="
                    float: right;
                    background-image: linear-gradient(
                      to right,
                      #0f5841,
                      #87ab9f
                    );
                    border: none;
                    width: 250px;
                  "
                  size="large"
                  >Request Cancel</el-button
                >
                <el-button
                  round
                  color="#0F5841"
                  style="
                    background-image: linear-gradient(
                      to right,
                      #0f5841,
                      #87ab9f
                    );
                    border: none;
                    width: 250px;
                  "
                  size="large"
                >
                  Contact Seller
                </el-button>
              </div>
            </el-row>
          </el-row>
          <el-row
            style="
              width: 100%;
              justify-content: right;
              border-top: 2px solid #0f5841;
              margin-top: 10px;
            "
          >
            <div style="color: #0f5841; font-size: 1.2rem; margin-top: 10px">
              Order Total: RM {{ order.totalAmt }}
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method:
              {{ order.paymentMethodID == 1 ? "COD" : "QR PAYMENT" }}
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
            >letak dulu</el-button
          >
        </el-col>
      </el-row> -->


      <!-- v-for="(order, index) in buyerProcessingOrderList"
        :key="index" different seller-->
      <!-- if the item status is different: Request Cancel and Processing-->
      <el-row
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
                  Order ID: 002
                </div>
              </div>
            </el-col>
            <el-col
              :span="12"
              style="align-content: center; justify-items: right"
            >
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1rem">
                  Order Status: Processing
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- v-for="(item, indexItem) in order.orderItems"
            :key="indexItem" -->
          <el-row style="width: 100%">
            <div
              style="
                display: block;
                width: 100%;
                text-align: left;
                padding-top: 10px;
                border-top: 2px solid #0f5841;
              "
            >
              Seller Name: KHAI
            </div>
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="position: relative">
              <div
                style="
                  position: absolute;
                  top: 0;
                  right: 0;
                  font-size: 1rem;
                  color: #0f5841;
                "
              >
                Product Status: Request Cancel
              </div>
              <div
                style="
                  height: 100%;
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  color: #0f5841;
                  font-size: 1.2rem;
                "
              >
                RM 100
              </div>
            </el-col>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px">
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="position: relative">
              <div
                style="
                  position: absolute;
                  top: 0;
                  right: 0;
                  font-size: 1rem;
                  color: #0f5841;
                "
              >
                Product Status: Request Cancel
              </div>
              <div
                style="
                  height: 100%;
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  color: #0f5841;
                  font-size: 1.2rem;
                "
              >
                RM 100
              </div>
            </el-col>
            <div style="display: flex; justify-content: flex-end; width: 100%">
              <!-- v-if="order.paymentMethodID == 2" -->
              <el-button
                round
                color="#0F5841"
                style="
                  float: right;
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                  margin-right: 10px;
                "
                size="large"
                @click="dialogReceipt = true"
                >Check Payment Receipt</el-button
              >
              <el-dialog
                v-model="dialogReceipt"
                title="Payment Receipt"
                width="30%"
              >
                <img
                  style="width: 15vw; object-fit: cover"
                  src="/src/assets/eStove.png"
                  alt=""
                />
                <template #footer>
                  <div class="dialog-footer">
                    <el-button type="primary" @click="dialogReceipt = false"
                      >OK</el-button
                    >
                  </div>
                </template>
              </el-dialog>
              <el-button
                round
                color="#0F5841"
                style="
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                "
                size="large"
              >
                Contact Seller
              </el-button>
            </div>
          </el-row>
          <!-- v-for="(item, indexItem) in order.orderItems"
            :key="indexItem" -->
          <el-row style="width: 100%">
            <div
              style="
                display: block;
                width: 100%;
                text-align: left;
                padding-top: 10px;
                margin-top: 10px;
                border-top: 2px solid #0f5841;
              "
            >
              Seller Name: KHAI
            </div>
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="position: relative">
              <div
                style="
                  position: absolute;
                  top: 0;
                  right: 0;
                  font-size: 1rem;
                  color: #0f5841;
                "
              >
                Product Status: Processing
              </div>
              <div
                style="
                  height: 100%;
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  color: #0f5841;
                  font-size: 1.2rem;
                "
              >
                RM 100
              </div>
            </el-col>
            <div style="display: flex; justify-content: flex-end; width: 100%">
              <!-- v-if="order.paymentMethodID == 2" -->
              <el-button
                round
                color="#0F5841"
                style="
                  float: right;
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                  margin-right: 10px;
                "
                size="large"
                @click="dialogReceipt = true"
                >Check Payment Receipt</el-button
              >
              <el-dialog
                v-model="dialogReceipt"
                title="Payment Receipt"
                width="30%"
              >
                <img
                  style="width: 15vw; object-fit: cover"
                  src="/src/assets/eStove.png"
                  alt=""
                />
                <template #footer>
                  <div class="dialog-footer">
                    <el-button type="primary" @click="dialogReceipt = false"
                      >OK</el-button
                    >
                  </div>
                </template>
              </el-dialog>
              <el-button
                round
                color="#0F5841"
                style="
                  float: right;
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                "
                size="large"
                >Request Cancel</el-button
              >
              <el-button
                round
                color="#0F5841"
                style="
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                "
                size="large"
              >
                Contact Seller
              </el-button>
            </div>
          </el-row>
          <el-row
            style="
              width: 100%;
              justify-content: right;
              border-top: 2px solid #0f5841;
              margin-top: 10px;
            "
          >
            <div style="color: #0f5841; font-size: 1.2rem; margin-top: 10px">
              Order Total: RM 600
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method: COD
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
            >letak dulu</el-button
          >
        </el-col>
      </el-row>





      <!-- v-for="(order, index) in buyerRequestCancelOrderList"
        :key="index" different seller-->
      <el-row
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
                  Order ID: 002
                </div>
              </div>
            </el-col>
            <el-col
              :span="12"
              style="align-content: center; justify-items: right"
            >
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1rem">
                  Order Status: Request Cancel
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- v-for="(item, indexItem) in order.orderItems"
            :key="indexItem" -->
          <el-row style="width: 100%">
            <div
              style="
                display: block;
                width: 100%;
                text-align: left;
                padding-top: 10px;
                border-top: 2px solid #0f5841;
              "
            >
              Seller Name: KHAI
            </div>
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px">
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
            <div style="display: flex; justify-content: flex-end; width: 100%">
              <!-- v-if="order.paymentMethodID == 2" -->
              <el-button
                round
                color="#0F5841"
                style="
                  float: right;
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                  margin-right: 10px;
                "
                size="large"
                @click="dialogReceipt = true"
                >Check Payment Receipt</el-button
              >
              <el-dialog
                v-model="dialogReceipt"
                title="Payment Receipt"
                width="30%"
              >
                <img
                  style="width: 15vw; object-fit: cover"
                  src="/src/assets/eStove.png"
                  alt=""
                />
                <template #footer>
                  <div class="dialog-footer">
                    <el-button type="primary" @click="dialogReceipt = false"
                      >OK</el-button
                    >
                  </div>
                </template>
              </el-dialog>
              <el-button
                round
                color="#0F5841"
                style="
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                "
                size="large"
              >
                Contact Seller
              </el-button>
            </div>
          </el-row>
          <!-- v-for="(item, indexItem) in order.orderItems"
            :key="indexItem" -->
          <el-row style="width: 100%">
            <div
              style="
                display: block;
                width: 100%;
                text-align: left;
                padding-top: 10px;
                margin-top: 10px;
                border-top: 2px solid #0f5841;
              "
            >
              Seller Name: KHAI
            </div>
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
            <div style="display: flex; justify-content: flex-end; width: 100%">
              <!-- v-if="order.paymentMethodID == 2" -->
              <el-button
                round
                color="#0F5841"
                style="
                  float: right;
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                  margin-right: 10px;
                "
                size="large"
                @click="dialogReceipt = true"
                >Check Payment Receipt</el-button
              >
              <el-dialog
                v-model="dialogReceipt"
                title="Payment Receipt"
                width="30%"
              >
                <img
                  style="width: 15vw; object-fit: cover"
                  src="/src/assets/eStove.png"
                  alt=""
                />
                <template #footer>
                  <div class="dialog-footer">
                    <el-button type="primary" @click="dialogReceipt = false"
                      >OK</el-button
                    >
                  </div>
                </template>
              </el-dialog>
              <el-button
                round
                color="#0F5841"
                style="
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                "
                size="large"
              >
                Contact Seller
              </el-button>
            </div>
          </el-row>
          <el-row
            style="
              width: 100%;
              justify-content: right;
              border-top: 2px solid #0f5841;
              margin-top: 10px;
            "
          >
            <div style="color: #0f5841; font-size: 1.2rem; margin-top: 10px">
              Order Total: RM 600
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method: COD
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
            >letak dulu</el-button
          >
        </el-col>
      </el-row>


      
      <!-- v-for="(order, index) in buyerCancelledOrderList"
        :key="index" different seller-->
      <el-row
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
                  Order ID: 002
                </div>
              </div>
            </el-col>
            <el-col
              :span="12"
              style="align-content: center; justify-items: right"
            >
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1rem">
                  Order Status: Cancelled
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- v-for="(item, indexItem) in order.orderItems"
            :key="indexItem" -->
          <el-row style="width: 100%">
            <div
              style="
                display: block;
                width: 100%;
                text-align: left;
                padding-top: 10px;
                border-top: 2px solid #0f5841;
              "
            >
              Seller Name: KHAI
            </div>
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px">
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
            <div style="display: flex; justify-content: flex-end; width: 100%">
              <!-- v-if="order.paymentMethodID == 2" -->
              <el-button
                round
                color="#0F5841"
                style="
                  float: right;
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                  margin-right: 10px;
                "
                size="large"
                @click="dialogReceipt = true"
                >Check Payment Receipt</el-button
              >
              <el-dialog
                v-model="dialogReceipt"
                title="Payment Receipt"
                width="30%"
              >
                <img
                  style="width: 15vw; object-fit: cover"
                  src="/src/assets/eStove.png"
                  alt=""
                />
                <template #footer>
                  <div class="dialog-footer">
                    <el-button type="primary" @click="dialogReceipt = false"
                      >OK</el-button
                    >
                  </div>
                </template>
              </el-dialog>
              <el-button
                round
                color="#0F5841"
                style="
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                "
                size="large"
              >
                Contact Seller
              </el-button>
            </div>
          </el-row>
          <!-- v-for="(item, indexItem) in order.orderItems"
            :key="indexItem" -->
          <el-row style="width: 100%">
            <div
              style="
                display: block;
                width: 100%;
                text-align: left;
                padding-top: 10px;
                margin-top: 10px;
                border-top: 2px solid #0f5841;
              "
            >
              Seller Name: KHAI
            </div>
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
            <div style="display: flex; justify-content: flex-end; width: 100%">
              <!-- v-if="order.paymentMethodID == 2" -->
              <el-button
                round
                color="#0F5841"
                style="
                  float: right;
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                  margin-right: 10px;
                "
                size="large"
                @click="dialogReceipt = true"
                >Check Payment Receipt</el-button
              >
              <el-dialog
                v-model="dialogReceipt"
                title="Payment Receipt"
                width="30%"
              >
                <img
                  style="width: 15vw; object-fit: cover"
                  src="/src/assets/eStove.png"
                  alt=""
                />
                <template #footer>
                  <div class="dialog-footer">
                    <el-button type="primary" @click="dialogReceipt = false"
                      >OK</el-button
                    >
                  </div>
                </template>
              </el-dialog>
              <el-button
                round
                color="#0F5841"
                style="
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                "
                size="large"
              >
                Contact Seller
              </el-button>
            </div>
          </el-row>
          <el-row
            style="
              width: 100%;
              justify-content: right;
              border-top: 2px solid #0f5841;
              margin-top: 10px;
            "
          >
            <div style="color: #0f5841; font-size: 1.2rem; margin-top: 10px">
              Order Total: RM 600
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method: COD
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
            >letak dulu</el-button
          >
        </el-col>
      </el-row>


      <!-- v-for="(order, index) in buyerCompletedOrderList"
        :key="index" different seller-->
      <el-row
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
                  Order ID: 002
                </div>
              </div>
            </el-col>
            <el-col
              :span="12"
              style="align-content: center; justify-items: right"
            >
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1rem">
                  Order Status: Completed
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- v-for="(item, indexItem) in order.orderItems"
            :key="indexItem" -->
          <el-row style="width: 100%">
            <div
              style="
                display: block;
                width: 100%;
                text-align: left;
                padding-top: 10px;
                border-top: 2px solid #0f5841;
              "
            >
              Seller Name: KHAI
            </div>
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px">
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
            <div style="display: flex; justify-content: flex-end; width: 100%">
              <el-button
                round
                @click="dialogVisible = true"
                color="#0F5841"
                style="
                  float: right;
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                  margin-right: 20px;
                "
                size="large"
                >Rate</el-button
              >
              <el-dialog
                v-model="dialogVisible"
                title="Rate Seller"
                width="50vw"
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
                      <div style="color: #0f5841; font-size: 1.1rem">
                        Seller:
                      </div>
                      <div style="color: #0f5841; font-size: 1.1rem">
                        {{ products[currentIndex].seller }}
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
                      <div style="color: #0f5841; font-size: 1.1rem">
                        Product Sold:
                      </div>
                      <img
                        :src="products[currentIndex].image"
                        style="
                          width: 100px;
                          border-radius: 10px;
                          border: 2px solid #0f5841;
                        "
                      />
                      <div style="color: #0f5841; font-size: 1.1rem">
                        {{ products[currentIndex].productName }}
                      </div>
                    </div>
                  </div>
                  <el-rate v-model="value" allow-half />
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
                    v-model="textarea"
                    type="textarea"
                    :rows="4"
                    placeholder="Write your feedback here..."
                  />
                </div>
                <template #footer>
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    "
                  >
                    <!-- Pagination info -->
                    <div style="color: #0f5841; font-size: 1rem">
                      {{ currentIndex + 1 }} / {{ products.length }}
                    </div>

                    <!-- Navigation buttons -->
                    <div style="display: flex; gap: 10px">
                      <el-button v-if="currentIndex > 0" @click="prevProduct">
                        <el-icon><ArrowLeftBold /></el-icon>
                      </el-button>

                      <el-button
                        v-if="currentIndex < products.length - 1"
                        @click="nextProduct"
                      >
                        <el-icon><ArrowRightBold /></el-icon>
                      </el-button>

                      <el-button
                        v-if="currentIndex === products.length - 1"
                        type="primary"
                        @click="submitFeedback"
                      >
                        Submit
                      </el-button>
                    </div>
                  </div>
                </template>
              </el-dialog>
              <!-- v-if="order.paymentMethodID == 2" -->
              <el-button
                round
                color="#0F5841"
                style="
                  float: right;
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                  margin-right: 10px;
                "
                size="large"
                @click="dialogReceipt = true"
                >Check Payment Receipt</el-button
              >
              <el-dialog
                v-model="dialogReceipt"
                title="Payment Receipt"
                width="30%"
              >
                <img
                  style="width: 15vw; object-fit: cover"
                  src="/src/assets/eStove.png"
                  alt=""
                />
                <template #footer>
                  <div class="dialog-footer">
                    <el-button type="primary" @click="dialogReceipt = false"
                      >OK</el-button
                    >
                  </div>
                </template>
              </el-dialog>
              <el-button
                round
                color="#0F5841"
                style="
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                "
                size="large"
              >
                Contact Seller
              </el-button>
            </div>
          </el-row>
          <!-- v-for="(item, indexItem) in order.orderItems"
            :key="indexItem" -->
          <el-row style="width: 100%">
            <div
              style="
                display: block;
                width: 100%;
                text-align: left;
                padding-top: 10px;
                margin-top: 10px;
                border-top: 2px solid #0f5841;
              "
            >
              Seller Name: KHAI
            </div>
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
            <div style="display: flex; justify-content: flex-end; width: 100%">
              <el-button
                round
                @click="dialogVisible = true"
                color="#0F5841"
                style="
                  float: right;
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                  margin-right: 20px;
                "
                size="large"
                >Rate</el-button
              >
              <el-dialog
                v-model="dialogVisible"
                title="Rate Seller"
                width="50vw"
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
                      <div style="color: #0f5841; font-size: 1.1rem">
                        Seller:
                      </div>
                      <div style="color: #0f5841; font-size: 1.1rem">
                        {{ products[currentIndex].seller }}
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
                      <div style="color: #0f5841; font-size: 1.1rem">
                        Product Sold:
                      </div>
                      <img
                        :src="products[currentIndex].image"
                        style="
                          width: 100px;
                          border-radius: 10px;
                          border: 2px solid #0f5841;
                        "
                      />
                      <div style="color: #0f5841; font-size: 1.1rem">
                        {{ products[currentIndex].productName }}
                      </div>
                    </div>
                  </div>
                  <el-rate v-model="value" allow-half />
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
                    v-model="textarea"
                    type="textarea"
                    :rows="4"
                    placeholder="Write your feedback here..."
                  />
                </div>
                <template #footer>
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    "
                  >
                    <!-- Pagination info -->
                    <div style="color: #0f5841; font-size: 1rem">
                      {{ currentIndex + 1 }} / {{ products.length }}
                    </div>

                    <!-- Navigation buttons -->
                    <div style="display: flex; gap: 10px">
                      <el-button v-if="currentIndex > 0" @click="prevProduct">
                        <el-icon><ArrowLeftBold /></el-icon>
                      </el-button>

                      <el-button
                        v-if="currentIndex < products.length - 1"
                        @click="nextProduct"
                      >
                        <el-icon><ArrowRightBold /></el-icon>
                      </el-button>

                      <el-button
                        v-if="currentIndex === products.length - 1"
                        type="primary"
                        @click="submitFeedback"
                      >
                        Submit
                      </el-button>
                    </div>
                  </div>
                </template>
              </el-dialog>
              <!-- v-if="order.paymentMethodID == 2" -->
              <el-button
                round
                color="#0F5841"
                style="
                  float: right;
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                  margin-right: 10px;
                "
                size="large"
                @click="dialogReceipt = true"
                >Check Payment Receipt</el-button
              >
              <el-dialog
                v-model="dialogReceipt"
                title="Payment Receipt"
                width="30%"
              >
                <img
                  style="width: 15vw; object-fit: cover"
                  src="/src/assets/eStove.png"
                  alt=""
                />
                <template #footer>
                  <div class="dialog-footer">
                    <el-button type="primary" @click="dialogReceipt = false"
                      >OK</el-button
                    >
                  </div>
                </template>
              </el-dialog>
              <el-button
                round
                color="#0F5841"
                style="
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                "
                size="large"
              >
                Contact Seller
              </el-button>
            </div>
          </el-row>
          <el-row
            style="
              width: 100%;
              justify-content: right;
              border-top: 2px solid #0f5841;
              margin-top: 10px;
            "
          >
            <div style="color: #0f5841; font-size: 1.2rem; margin-top: 10px">
              Order Total: RM 600
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method: COD
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
            >letak dulu</el-button
          >
        </el-col>
      </el-row>
    </el-tab-pane>





    <!-- SELLER-->
    <el-tab-pane label="Sales List">
      <!-- STATUS: PENDING -->
      <el-row
        v-for="(order, index) in sellerPendingOrderList"
        :key="index"
        style="
          border-style: solid;
          border-color: #0f5841;
          border-radius: 15px;
          margin: 0 20px 20px 20px;
        "
      >
        <el-col :span="24" style="padding: 20px">
          <el-row style="width: 100%; padding-bottom: 10px; border-bottom: 2px solid #0f5841;">
            <el-col :span="12" style="text-align: left">
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1.1rem">
                  Order ID: {{ order.orderID }}
                </div>
                <!-- Buyer Name AT Here-->
                <div>
                Buyer Name: {{ order.buyerName }}
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
          v-for="(item, indexItem) in order.orderItems"
            :key="indexItem"
            style="width: 100%; border-bottom: 2px solid #0f5841">
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
                <div style="color: #0f5841; font-size: 1.2rem">{{ item.productName }}</div>
                <div style="color: #0f5841; font-size: 1.2rem">x {{ item.quantity }}</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM {{ (item.quantity * item.price).toFixed(2) }}
              </div>
            </el-col>
          </el-row>
          <!-- <el-row
            style="
              width: 100%;
              margin-top: 10px;
              border-bottom: 2px solid #0f5841;
            "
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
          </el-row> -->
          <el-row style="width: 100%; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem; margin-top: 10px">
              Order Total: RM {{ order.totalAmt }}
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method: {{ order.paymentMethodID == 1 ? "COD" : "QR PAYMENT" }}
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
            >Contact Buyer</el-button
          >
        </el-col>
      </el-row>



      <!-- STATUS: PROCESSING -->
      <el-row
        v-for="(order, index) in sellerProcessingOrderList"
        :key="index"
        style="
          border-style: solid;
          border-color: #0f5841;
          border-radius: 15px;
          margin: 0 20px 20px 20px;
        "
      >
        <el-col :span="24" style="padding: 20px">
          <el-row style="width: 100%; padding-bottom: 10px; border-bottom: 2px solid #0f5841;">
            <el-col :span="12" style="text-align: left">
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1.1rem">
                  Order ID: {{ order.orderID }}
                </div>
                <div>
                    Buyer Name: {{ order.buyerName }}
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
          v-for="(item, indexItem) in order.orderItems"
            :key="indexItem"
            style="width: 100%; border-bottom: 2px solid #0f5841">
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
                      margin-top: 10px;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">{{ item.productName }}</div>
                <div style="color: #0f5841; font-size: 1.2rem">x {{ item.quantity }}</div>
              </div>
            </el-col>
            <el-col :span="12" style="position: relative">
              <div
                style="
                  position: absolute;
                  top: 0;
                  right: 0;
                  font-size: 1rem;
                  color: #0f5841;
                "
              >
                Product Status: {{ item.status }}
              </div>
              <div
                style="
                  height: 100%;
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  color: #0f5841;
                  font-size: 1.2rem;
                "
              >
                RM {{ (item.quantity * item.price).toFixed(2) }}
              </div>
            </el-col>
            <div style="display: flex; width: 100%; justify-content: flex-end">
              <el-button
                round
                color="#0F5841"
                style="
                  background-image: linear-gradient(to right, #0f5841, #87ab9f);
                  border: none;
                  width: 250px;
                  margin-bottom: 10px;
                "
                @click="markComplete"
                size="large"
                >Order Completed</el-button
              >
            </div>
          </el-row>
          <el-row style="width: 100%; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem; margin-top: 10px">
              Order Total: RM {{ order.totalAmt }}
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method: {{ order.paymentMethodID == 1 ? "COD" : "QR PAYMENT" }}
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
            >Contact Buyer</el-button
          >
          <el-button
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
            @click="markOrderComplete"
            size="large"
            >All Order Completed</el-button
          >
          <!-- v-if="order.paymentMethodID == 2" -->
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
            @click="openReceiptDialogSeller(order.orderID)"
            >Check Payment Receipt</el-button
          >
          <el-dialog
            :id="order.orderID"
            v-model="dialogSellerMap[order.orderID]"
            title="Payment Receipt"
            width="25vw"
          >
            <img
              style="width: 20vw; object-fit: cover"
              :src="order.receipt"
              alt=""
            />
            <template #footer>
              <div class="dialog-footer">
                <el-button type="primary" @click="closeReceiptDialogSeller(order.orderID)"
                  >OK</el-button
                >
              </div>
            </template>
          </el-dialog>
        </el-col>
      </el-row>


      <!-- v-for="(order, index) in sellerRequestCancelOrderList"
        :key="index" -->
      <el-row
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
                  Order ID: 002
                </div>
              </div>
            </el-col>
            <el-col
              :span="12"
              style="align-content: center; justify-items: right"
            >
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1rem">
                  Order Status: Request Cancel
                </div>
              </div>
            </el-col>
          </el-row>
          <div
            style="
              display: block;
              width: 100%;
              text-align: left;
              padding-top: 10px;
              border-top: 2px solid #0f5841;
            "
          >
            Buyer Name: KHAI
          </div>
          <!-- v-for="(item, indexItem) in order.orderItems"
            :key="indexItem" -->
          <el-row style="width: 100%; border-bottom: 2px solid #0f5841">
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
          </el-row>
          <el-row
            style="
              width: 100%;
              margin-top: 10px;
              border-bottom: 2px solid #0f5841;
            "
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
          </el-row>
          <el-row style="width: 100%; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem; margin-top: 10px">
              Order Total: RM 600
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method: COD
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
            >Contact Buyer</el-button
          >
          <el-button
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
            >Reject Request</el-button
          >
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
            >Approve Request</el-button
          >
          <!-- v-if="order.paymentMethodID == 2" -->
          <el-button
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
            @click="dialogReceipt = true"
            >Check Payment Receipt</el-button
          >
          <el-dialog
            v-model="dialogReceipt"
            title="Payment Receipt"
            width="30%"
          >
            <img
              style="width: 15vw; object-fit: cover"
              src="/src/assets/eStove.png"
              alt=""
            />
            <template #footer>
              <div class="dialog-footer">
                <el-button type="primary" @click="dialogReceipt = false"
                  >OK</el-button
                >
              </div>
            </template>
          </el-dialog>
        </el-col>
      </el-row>



      <!-- v-for="(order, index) in sellerCancelledOrderList"
        :key="index" -->
      <el-row
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
                  Order ID: 002
                </div>
              </div>
            </el-col>
            <el-col
              :span="12"
              style="align-content: center; justify-items: right"
            >
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1rem">
                  Order Status: Cancelled
                </div>
              </div>
            </el-col>
          </el-row>
          <div
            style="
              display: block;
              width: 100%;
              text-align: left;
              padding-top: 10px;
              border-top: 2px solid #0f5841;
            "
          >
            Buyer Name: KHAI
          </div>
          <!-- v-for="(item, indexItem) in order.orderItems"
            :key="indexItem" -->
          <el-row style="width: 100%; border-bottom: 2px solid #0f5841">
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
          </el-row>
          <el-row
            style="
              width: 100%;
              margin-top: 10px;
              border-bottom: 2px solid #0f5841;
            "
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
                    src="/src/assets/eStove.png"
                    alt=""
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="color: #0f5841; font-size: 1.2rem">Stove</div>
                <div style="color: #0f5841; font-size: 1.2rem">x 6</div>
              </div>
            </el-col>
            <el-col :span="12" style="align-content: center">
              <div style="color: #0f5841; font-size: 1.2rem; text-align: right">
                RM 100
              </div>
            </el-col>
          </el-row>
          <el-row style="width: 100%; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem; margin-top: 10px">
              Order Total: RM 600
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method: COD
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
            >Contact Buyer</el-button
          >
          <!-- v-if="order.paymentMethodID == 2" -->
          <el-button
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
            @click="dialogReceipt = true"
            >Check Payment Receipt</el-button
          >
          <el-dialog
            v-model="dialogReceipt"
            title="Payment Receipt"
            width="30%"
          >
            <img
              style="width: 15vw; object-fit: cover"
              src="/src/assets/eStove.png"
              alt=""
            />
            <template #footer>
              <div class="dialog-footer">
                <el-button type="primary" @click="dialogReceipt = false"
                  >OK</el-button
                >
              </div>
            </template>
          </el-dialog>
        </el-col>
      </el-row>




      <!-- STATUS: COMPLETED -->
      <el-row
      v-for="(order, index) in sellerCompletedOrderList"
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
                <div>
                     Buyer Name: {{ order.buyerName }}
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
          <div
            style="
              display: block;
              width: 100%;
              text-align: left;
              padding-top: 10px;
              border-top: 2px solid #0f5841;
            "
          >
            Buyer Name: KHAI
          </div>
          <el-row 
          v-for="(item, indexItem) in order.orderItems"
            :key="indexItem"
            style="width: 100%; border-bottom: 2px solid #0f5841">
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
                <div style="color: #0f5841; font-size: 1.2rem">{{ item.productName }}</div>
                <div style="color: #0f5841; font-size: 1.2rem">x {{ item.quantity }}</div>
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
              Payment Method: {{ order.paymentMethodID == 1 ? "COD" : "QR PAYMENT" }}
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
            >Contact Buyer</el-button
          >
          <!-- v-if="order.paymentMethodID == 2" -->
          <el-button
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
            @click="dialogReceipt = true"
            >Check Payment Receipt</el-button
          >
          <el-dialog
            v-model="dialogReceipt"
            title="Payment Receipt"
            width="30%"
          >
            <img
              style="width: 15vw; object-fit: cover"
              src="/src/assets/eStove.png"
              alt=""
            />
            <template #footer>
              <div class="dialog-footer">
                <el-button type="primary" @click="dialogReceipt = false"
                  >OK</el-button
                >
              </div>
            </template>
          </el-dialog>
        </el-col>
      </el-row>




      <el-row
        v-for="(order, index) in sellerPendingOrderList"
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
              border-bottom: 2px solid #0f5841;
              padding-bottom: 10px;
            "
          >
            <el-col :span="12" style="text-align: left">
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1.1rem">
                  Buyer Name: {{ order.buyerName }}
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
            v-for="(item, indexItem) in order.orderItems"
            :key="indexItem"
            style="
              width: 100%;
              border-bottom: 2px solid #0f5841;
              margin-top: 10px;
            "
          >
            <el-col :span="12">
              <div
                style="
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  margin-bottom: 10px;
                "
              >
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
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Order Total: RM {{ order.totalAmt }}
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method:
              {{ order.paymentMethodID == 1 ? "COD" : "QR PAYMENT" }}
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
            >Contact Buyer</el-button
          >
        </el-col>
      </el-row>
      <el-row
        v-for="(order, index) in sellerProcessingOrderList"
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
              border-bottom: 2px solid #0f5841;
              padding-bottom: 10px;
            "
          >
            <el-col :span="12" style="text-align: left">
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1.1rem">
                  Buyer Name: {{ order.orderItems[0].buyerName }}
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
            v-for="(item, indexItem) in order.orderItems"
            :key="indexItem"
            style="
              width: 100%;
              border-bottom: 2px solid #0f5841;
              margin-top: 10px;
            "
          >
            <el-col :span="12">
              <div
                style="
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  margin-bottom: 10px;
                "
              >
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
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Order Total: RM {{ order.totalAmt }}
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method:
              {{ order.paymentMethodID == 1 ? "COD" : "QR PAYMENT" }}
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
            >Contact Buyer</el-button
          >
          <el-button
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
            >Order Completed</el-button
          >
          <el-button
            v-if="order.paymentMethodID == 2"
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
            @click="dialogReceipt = true"
            >Check Payment Receipt</el-button
          >
          <el-dialog
            v-model="dialogReceipt"
            title="Payment Receipt"
            width="30%"
          >
            <img
              style="width: 15vw; object-fit: cover"
              :src="order.receipt"
              alt=""
            />
            <template #footer>
              <div class="dialog-footer">
                <el-button type="primary" @click="dialogReceipt = false"
                  >OK</el-button
                >
              </div>
            </template>
          </el-dialog>
        </el-col>
      </el-row>
      <el-row
        v-for="(order, index) in sellerRequestCancelOrderList"
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
              border-bottom: 2px solid #0f5841;
              padding-bottom: 10px;
            "
          >
            <el-col :span="12" style="text-align: left">
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1.1rem">
                  Buyer Name: {{ order.orderItems[0].buyerName }}
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
            v-for="(item, indexItem) in order.orderItems"
            :key="indexItem"
            style="
              width: 100%;
              border-bottom: 2px solid #0f5841;
              margin-top: 10px;
            "
          >
            <el-col :span="12">
              <div
                style="
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  margin-bottom: 10px;
                "
              >
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
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Order Total: RM {{ order.totalAmt }}
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method:
              {{ order.paymentMethodID == 1 ? "COD" : "QR PAYMENT" }}
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
            >Contact Buyer</el-button
          >
          <el-button
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
            >Reject Request</el-button
          >
          <el-button
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
            >Approve Request</el-button
          >
          <el-button
            v-if="order.paymentMethodID == 2"
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
            @click="dialogReceipt = true"
            >Check Payment Receipt</el-button
          >
          <el-dialog
            v-model="dialogReceipt"
            title="Payment Receipt"
            width="30%"
          >
            <img
              style="width: 15vw; object-fit: cover"
              :src="order.receipt"
              alt=""
            />
            <template #footer>
              <div class="dialog-footer">
                <el-button type="primary" @click="dialogReceipt = false"
                  >OK</el-button
                >
              </div>
            </template>
          </el-dialog>
        </el-col>
      </el-row>
      <el-row
        v-for="(order, index) in sellerCancelledOrderList"
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
              border-bottom: 2px solid #0f5841;
              padding-bottom: 10px;
            "
          >
            <el-col :span="12" style="text-align: left">
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1.1rem">
                  Buyer Name: {{ order.orderItems[0].buyerName }}
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
            v-for="(item, indexItem) in order.orderItems"
            :key="indexItem"
            style="
              width: 100%;
              border-bottom: 2px solid #0f5841;
              margin-top: 10px;
            "
          >
            <el-col :span="12">
              <div
                style="
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  margin-bottom: 10px;
                "
              >
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
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Order Total: RM {{ order.totalAmt }}
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method:
              {{ order.paymentMethodID == 1 ? "COD" : "QR PAYMENT" }}
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
            >Contact Buyer</el-button
          >
        </el-col>
      </el-row>
      <el-row
        v-for="(order, index) in sellerCompletedOrderList"
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
              border-bottom: 2px solid #0f5841;
              padding-bottom: 10px;
            "
          >
            <el-col :span="12" style="text-align: left">
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="color: #0f5841; font-size: 1.1rem">
                  Buyer Name: {{ order.orderItems[0].buyerName }}
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
            v-for="(item, indexItem) in order.orderItems"
            :key="indexItem"
            style="
              width: 100%;
              border-bottom: 2px solid #0f5841;
              margin-top: 10px;
            "
          >
            <el-col :span="12">
              <div
                style="
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  margin-bottom: 10px;
                "
              >
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
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Order Total: RM {{ order.totalAmt }}
            </div>
          </el-row>
          <el-row style="width: 100%; margin-top: 10px; justify-content: right">
            <div style="color: #0f5841; font-size: 1.2rem">
              Payment Method:
              {{ order.paymentMethodID == 1 ? "COD" : "QR PAYMENT" }}
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
            >Contact Buyer</el-button
          >
          <el-button
            v-if="order.paymentMethodID == 2"
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
            @click="dialogReceipt = true"
            >Check Payment Receipt</el-button
          >
          <el-dialog
            v-model="dialogReceipt"
            title="Payment Receipt"
            width="30%"
          >
            <img
              style="width: 15vw; object-fit: cover"
              :src="order.receipt"
              alt=""
            />
            <template #footer>
              <div class="dialog-footer">
                <el-button type="primary" @click="dialogReceipt = false"
                  >OK</el-button
                >
              </div>
            </template>
          </el-dialog>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
