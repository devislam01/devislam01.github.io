<script setup>
import { onMounted, ref, watchEffect } from "vue";
import Breadcrumb from "../Common/Breadcrumb.vue";
import { ShoppingCart } from "@element-plus/icons-vue";
import { useProductStore } from "@/stores/productStore";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { claimTypes } from "@/utils/constants.js";
import router from "@/router/index.js";
import { parseISO, format } from "date-fns";
import { useAuthStore } from "@/stores/authStore.js";

const productStore = useProductStore();
const authStore = useAuthStore();
const toast = useToast();
const route = useRoute();

const info = ref({
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
const num = ref(1);
const feedbackList = ref([]);
const pagination = ref({
  pageNumber: 1,
  pageSize: 10,
  totalRecord: 0,
});

const token = authStore.accessToken || "";
const userID = JSON.parse(atob(token.split(".")[1]))[claimTypes.userId];

const addtoCart = async (isBuyNow = false) => {
  if (userID === sellerInfo.value.sellerID) {
    toast.error("You cannot purchase your own product!");
    return;
  }
  const payload = {
    ProductID: info.value.productID,
    Quantity: num.value,
  };
  const response = await productStore.addtoCart(payload);
  if (response.code === 200 && !isBuyNow) {
    toast.success("Item has been added to your shopping cart.");
  }
};

const checkout = async () => {
  if (userID === sellerInfo.value.sellerID) {
    toast.error("You cannot purchase your own product!");
    return;
  }
  await addtoCart(true);
  await router.push("/shoppingCart");
};

watchEffect(() => {
  if (num.value > info.value.stockQty) {
    num.value = info.value.stockQty;
    toast.warning(`Limit ${info.value.stockQty} stock only `);
  }
});

const fetchProductDetail = async () => {
  const response = await productStore.getProductDetail({
    productID: Number(route.query.id),
  });

  info.value = response.productDetail;
  sellerInfo.value = response.sellerDetail;
};

const fetchFeedbackList = async () => {
  const payload = {
    pageNumber: pagination.value.pageNumber,
    pageSize: pagination.value.pageSize,
    productID: info.value.productID,
  };
  const response = await productStore.getFeedbackList(payload);
  feedbackList.value = response.data;
  pagination.value = response.pagination;
};

onMounted(async () => {
  await fetchProductDetail();
  await fetchFeedbackList();
});
</script>

<template>
  <Breadcrumb></Breadcrumb>
  <el-row style="margin-top: 1.5rem; padding: 30px" :gutter="20">
    <el-col :span="12" style="padding: 20px; border: solid">
      <el-carousel trigger="click" height="350px">
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
        <div
          style="
            font-weight: 400;
            color: #0f5841;
            font-size: 1.1rem;
            margin-bottom: -5px;
          "
        >
          Stock Quantity
        </div>
        <div
          style="
            font-weight: 400;
            color: #0f5841;
            font-size: 1.4rem;
            margin-bottom: 20px;
          "
        >
          {{ info.stockQty }}
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
          @click="checkout"
          >Buy Now</el-button
        >
        <el-button
          round
          color="#0F5841"
          @click="addtoCart()"
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

  <!--Feedback-->
  <el-row style="justify-content: center">
    <el-card style="width: 100%; margin: 20px">
      <div style="display: flex; flex-direction: column">
        <div v-for="(item, index) in feedbackList" :key="index">
          <el-row>
            <el-col :span="3">
              <img
                style="
                  width: 50px;
                  border-radius: 50%;
                  border: 2px solid #0f5841;
                  display: block;
                "
                src="/src/assets/ProfilePic.jpg"
                alt=""
              />
            </el-col>
            <el-col
              :span="21"
              style="
                display: flex;
                align-items: baseline;
                flex-direction: column;
              "
            >
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: baseline;
                  font-size: small;
                  margin-bottom: 1.4rem;
                "
              >
                <el-row>
                  <el-col :span="24">{{ item.buyerName }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-rate
                      v-model="item.rating"
                      disabled
                      text-color="#ff9900"
                      style="font-weight: 500; flex-shrink: 0"
                    />
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">{{
                    format(parseISO(item.feedbackAt), "yyyy-MM-dd HH:mm")
                  }}</el-col>
                </el-row>
              </div>

              <el-row style="height: 50px">
                <el-col :span="24">{{ item.feedbacks }}</el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-divider />
        </div>
        <div v-if="feedbackList.length === 0">
          <el-empty description="No Rating Yet"></el-empty>
        </div>
      </div>
      <el-row style="margin-top: 5px; justify-content: center">
        <div style="place-self: center">
          <el-pagination
            v-model:current-page="pagination.pageNumber"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 50, 100]"
            :size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.totalRecord"
            @change="fetchFeedbackList"
          />
        </div>
      </el-row>
    </el-card>
  </el-row>
</template>

<style scoped></style>
