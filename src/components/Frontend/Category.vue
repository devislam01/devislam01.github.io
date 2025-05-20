<script setup>
import { Operation } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useProductStore } from "@/stores/productStore";
import { options } from "@/utils/constants";

const productStore = useProductStore();
const checkboxes = ref();
const productList = ref([]);
const route = useRoute();
const router = useRouter();
const pagination = ref({
  pageNumber: 1,
  pageSize: 10,
  totalRecord: 0,
});

const fetchProductList = async () => {
  const response = await productStore.getProductList();
  productList.value = response.data;
  pagination.value = response.pagination;
};

const applyFilter = async () => {
  const payload = {
    CategoryID: checkboxes.value,
  };
  const response = await productStore.getProductList(payload);
  productList.value = response.data;
};

const clearFilter = async () => {
  const response = await productStore.getProductList();
  productList.value = response.data;
  pagination.value = response.pagination;
};

const changePage = async () => {
  const payload = {
    pageNumber: pagination.value.pageNumber,
    pageSize: pagination.value.pageSize,
  };
  const response = await productStore.getProductList(payload);

  productList.value = response.data;
  pagination.value = response.pagination;
};

const changeSize = async () => {
  const payload = {
    pageNumber: pagination.value.pageNumber,
    pageSize: pagination.value.pageSize,
  };
  const response = await productStore.getProductList(payload);

  productList.value = response.data;
  pagination.value = response.pagination;
};

onMounted(async () => {
  await fetchProductList();
});
</script>

<template>
  <el-row style="margin-top: 1.5rem" :gutter="20">
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
          v-for="item in options"
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
  margin: 0 12px 15px 12px;
}

.product-col:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6) !important;
}
</style>
