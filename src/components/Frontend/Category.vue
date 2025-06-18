<script setup>
import { Operation } from "@element-plus/icons-vue";
import { computed, onMounted, ref } from "vue";
import { useProductStore } from "@/stores/productStore";
import { category } from "@/utils/constants";
import { useSignalR } from "@/composables/useSignalR.js";
import { useSignalRStore } from "@/stores/signalrStore.js";
import { useToast } from "vue-toastification";

const productStore = useProductStore();
const signalrStore = useSignalRStore();
const { startConnection } = useSignalR();
const toast = useToast();

const checkboxes = ref();
const productList = computed(() => productStore.productList);
const pagination = computed(() => productStore.pagination);

const fetchProductList = async () => {
  const response = await productStore.getProductList();
  pagination.value = response.pagination;
};

const applyFilter = async () => {
  const payload = {
    categoryID: checkboxes.value,
    search: productStore.filters.search || "",
  };
  const response = await productStore.getProductList(payload);
  pagination.value = response.pagination;
};

const clearFilter = async () => {
  checkboxes.value = [];
  const payload = {
    categoryID: [],
    search: productStore.filters.search || "",
  };
  const response = await productStore.getProductList(payload);
  pagination.value = response.pagination;
};

const changePage = async (page) => {
  productStore.pagination.pageNumber = page;

  const payload = {
    pageNumber: pagination.value.pageNumber,
    pageSize: pagination.value.pageSize,
    search: productStore.filters.search || "",
    categoryID: checkboxes.value,
  };
  const response = await productStore.getProductList(payload);
  pagination.value = response.pagination;
};

const changeSize = async (size) => {
  productStore.pagination.pageSize = size;
  productStore.pagination.pageNumber = 1;

  const payload = {
    pageNumber: pagination.value.pageNumber,
    pageSize: pagination.value.pageSize,
    search: productStore.filters.search || "",
    categoryID: checkboxes.value,
  };
  const response = await productStore.getProductList(payload);
  pagination.value = response.pagination;
};

const checkIfSignalMessage = async () => {
  const unreadMessages = signalrStore.getUnreadMessages();

  unreadMessages.forEach((msg) => {
    toast.info(msg.content, {
      onClose: () => {
        signalrStore.markMessageAsRead(msg.id);
      },
      timeout: false,
    });
  });
};

onMounted(async () => {
  await fetchProductList();
  await startConnection();
  await checkIfSignalMessage();
});
</script>

<template>
  <el-row style="margin-top: -0.3rem" :gutter="20">
    <el-col class="sideFilter" :span="5">
      <el-card>
        <template #header>
          <div class="card-header">
            <el-row>
              <el-col :span="12">
                <span
                  style="
                    float: left;
                    font-weight: bold;
                    color: #0f5841;
                    font-size: 1.3rem;
                  "
                  >Filter</span
                >
              </el-col>
              <el-col :span="4"></el-col>
              <el-col :span="8" style="text-align: right; align-content: end">
                <el-icon size="large" style="color: #0f5841"
                  ><Operation
                /></el-icon>
              </el-col>
            </el-row>
          </div>
        </template>
        <el-checkbox-group
          v-model="checkboxes"
          v-for="item in category"
          style="display: flex; flex-direction: column"
        >
          <el-checkbox
            :label="item.label"
            :value="item.value"
            size="large"
          ></el-checkbox>
        </el-checkbox-group>
        <div>
          <el-button
            round
            color="#0F5841"
            style="
              background-image: linear-gradient(to right, #0f5841, #87ab9f);
              border: none;
              margin: 10px 0 10px 0;
              width: 100%;
            "
            size="large"
            @click="applyFilter"
            >Apply Filter</el-button
          >
        </div>
        <div>
          <el-button
            round
            color="#0F5841"
            style="
              background-image: linear-gradient(to right, #0f5841, #87ab9f);
              border: none;
              width: 100%;
            "
            size="large"
            @click="clearFilter"
            >Clear Filter</el-button
          >
        </div>
      </el-card>
    </el-col>
    <el-col :span="19" style="">
      <el-row :gutter="20" style="">
        <el-col
          v-for="item in productList"
          :key="item.productID"
          :span="7"
          class="product-col"
        >
          <RouterLink
            :to="{ name: 'ProdDetail', query: { id: item.productID } }"
            style="color: white"
          >
            <img
              style="
                height: 280px;
                width: 100%;
                object-fit: contain;
                display: block;
              "
              :src="item.productImage"
              alt=""
            />
            <div style="text-align: left">
              <div style="font-weight: bold; color: #0f5841; font-size: 1.3rem">
                {{ item.productName }}
              </div>
              <div style="font-weight: bold; color: #0f5841; font-size: 1.3rem">
                RM {{ item.productPrice }}
              </div>
              <div style="font-weight: 400; color: #0f5841; font-size: 1.2rem">
                {{ item.productCondition }}
              </div>
            </div>
          </RouterLink>
        </el-col>
      </el-row>
      <div style="place-self: center">
        <el-pagination
          v-model:current-page="pagination.pageNumber"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 50, 100]"
          :size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totalRecord"
          @current-change="changePage"
          @size-change="changeSize"
        />
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.product-col {
  transition: box-shadow 0.3s ease-in-out;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 10px 12px 10px 12px;
}

.product-col:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6) !important;
}

.sideFilter {
  margin: 10px 0 0 0;
}
</style>
