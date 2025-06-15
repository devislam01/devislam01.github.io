<script setup>
import { onMounted, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/admin/productStore.js";
import { category, productConditions } from "../../utils/constants.js";

const productStore = useProductStore();
const toast = useToast();
const router = useRouter();

const getCategoryLabel = (id) =>
  category.find((c) => c.value === id)?.label || "Unknown";

const productList = ref([]);
const pagination = ref({
  pageNumber: 1,
  pageSize: 10,
  totalRecord: 0,
  pageCount: 0,
});
const querySearch = ref({
  belongsTo: null,
  productName: null,
  categoryID: null,
  productCondition: null,
});

const resetFilter = async () => {
  querySearch.value = {};
  await fetchProducts();
};

const fetchProducts = async () => {
  const payload = {
    pageNumber: pagination.value.pageNumber,
    pageSize: pagination.value.pageSize,
    belongsTo: querySearch.value.belongsTo,
    productName: querySearch.value.productName,
    categoryID: querySearch.value.categoryID,
    productCondition: querySearch.value.productCondition,
  };
  const resp = await productStore.getProducts(payload);

  if (resp.code === 200) {
    productList.value = resp.data.data;
    pagination.value.pageNumber = resp.data.pagination.pageNumber;
    pagination.value.pageSize = resp.data.pagination.pageSize;
    pagination.value.totalRecord = resp.data.pagination.totalRecord;
    pagination.value.pageCount = resp.data.pagination.pageCount;
  }
};

onMounted(fetchProducts);
</script>

<template>
  <el-card
    header="Product List"
    style="margin: 7% 3%; min-width: 500px; height: 800px; text-align: left"
  >
    <el-row :gutter="20">
      <el-col :span="6">
        <div>
          <span>Belongs To</span>
          <el-input
            type="text"
            v-model="querySearch.belongsTo"
            placeholder="Paste the ID here..."
            clearable
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span>Product Name</span>
        <div>
          <el-input
            type="text"
            v-model="querySearch.productName"
            placeholder="Paste the name here..."
            clearable
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span>Category</span>
        <div>
          <el-select
            v-model="querySearch.categoryID"
            placeholder="--- Select Category ---"
          >
            <el-option
              v-for="(item, index) in category"
              :key="index"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <span>Condition</span>
        <div>
          <el-select
            v-model="querySearch.productCondition"
            placeholder="--- Select Condition ---"
          >
            <el-option
              v-for="(item, index) in productConditions"
              :key="index"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </div>
      </el-col>
      <el-col
        :span="24"
        style="display: flex; justify-content: flex-start; margin-top: 20px"
      >
        <el-button
          type="success"
          style="border: none; width: 90px"
          size="large"
          @click="fetchProducts"
          >Search</el-button
        >
        <el-button
          type="danger"
          style="border: none; width: 90px"
          size="large"
          @click="resetFilter"
          >Reset</el-button
        >
      </el-col>
    </el-row>
    <el-divider />
    <el-row>
      <el-table :data="productList" height="333" style="width: 100%" stripe>
        <el-table-column
          prop="belongsTo"
          label="Belongs To"
          :flex-grow="1"
          show-overflow-tooltip
        />
        <el-table-column
          prop="productName"
          label="Product Name"
          :flex-grow="1"
        />
        <el-table-column prop="categoryID" label="Category" :flex-grow="1">
          <template #default="{ row }">
            {{ getCategoryLabel(row.categoryID) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="productCondition"
          label="Product Condition"
          :flex-grow="1"
        />
        <el-table-column
          prop="productPrice"
          label="Product Price"
          :flex-grow="1"
          :formatter="(row) => `RM ${row.productPrice.toFixed(2)}`"
        />
        <el-table-column prop="stockQty" label="Stock Qty" :flex-grow="1" />
        <el-table-column prop="isActive" label="Status" :flex-grow="1">
          <template #default="{ row }">
            <el-tag :type="row.isActive === true ? 'success' : 'danger'">{{
              row.isActive === true ? "Active" : "Inactive"
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!-- Pagination -->
    <el-row>
      <div style="margin: 3% auto">
        <el-pagination
          v-model:current-page="pagination.pageNumber"
          v-model:page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 50, 100]"
          :size="pagination.pageSize"
          :total="pagination.totalRecord"
          :hide-on-single-page="
            pagination.pageCount === 1 && pagination.totalRecord <= 10
          "
          @current-change="fetchProducts"
          @size-change="fetchProducts"
        />
      </div>
    </el-row>
  </el-card>
</template>

<style scoped></style>
