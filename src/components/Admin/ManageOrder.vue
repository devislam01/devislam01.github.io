<script setup>
import { onMounted, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useOrderStore } from "@/stores/admin/orderStore.js";
import { getTagColor, orderStatus } from "@/utils/constants.js";

const orderStore = useOrderStore();
const toast = useToast();
const router = useRouter();

const orderList = ref([]);
const pagination = ref({
  pageNumber: 1,
  pageSize: 10,
  totalRecord: 0,
  pageCount: 0,
});
const querySearch = ref({
  orderID: null,
  userID: null,
  paymentID: null,
  status: null,
});

const resetFilter = async () => {
  querySearch.value = {};
  await fetchOrders();
};

const fetchOrders = async () => {
  const payload = {
    pageNumber: pagination.value.pageNumber,
    pageSize: pagination.value.pageSize,
    orderID: querySearch.value.orderID,
    userID: querySearch.value.userID,
    paymentID: querySearch.value.paymentID,
    status: querySearch.value.status,
  };
  const resp = await orderStore.getOrders(payload);

  if (resp.code === 200) {
    orderList.value = resp.data.data;
    pagination.value.pageNumber = resp.data.pagination.pageNumber;
    pagination.value.pageSize = resp.data.pagination.pageSize;
    pagination.value.totalRecord = resp.data.pagination.totalRecord;
    pagination.value.pageCount = resp.data.pagination.pageCount;
  }
};

onMounted(fetchOrders);
</script>

<template>
  <el-card
    header="Order List"
    style="margin: 7% 3%; min-width: 500px; height: 800px; text-align: left"
  >
    <el-row :gutter="20">
      <el-col :span="6">
        <div>
          <span>Order ID</span>
          <el-input
            type="text"
            v-model="querySearch.orderID"
            placeholder="Paste the ID here..."
            clearable
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span>User ID</span>
        <div>
          <el-input
            type="text"
            v-model="querySearch.userID"
            placeholder="Paste the ID here..."
            clearable
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span>Payment ID</span>
        <div>
          <el-input
            type="text"
            v-model="querySearch.paymentID"
            placeholder="Paste the ID here..."
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span>Status</span>
        <div>
          <el-select
            v-model="querySearch.status"
            placeholder="--- Select Status ---"
          >
            <el-option
              v-for="(item, index) in orderStatus"
              :key="index"
              :label="item.label"
              :value="item.value"
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
          @click="fetchOrders"
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
      <el-table :data="orderList" height="333" style="width: 100%" stripe>
        <el-table-column
          prop="orderID"
          label="Order ID"
          :flex-grow="1"
          show-overflow-tooltip
        />
        <el-table-column
          prop="userID"
          label="User ID"
          show-overflow-tooltip
          :flex-grow="1"
        />
        <el-table-column prop="paymentID" label="Payment ID" :flex-grow="1" />
        <el-table-column
          prop="totalAmount"
          label="Total Amount"
          :flex-grow="1"
          :formatter="(row) => `RM ${row.totalAmount.toFixed(2)}`"
        />
        <el-table-column prop="status" label="Status" :flex-grow="1">
          <template #default="{ row }">
            <el-tag :type="getTagColor[row.status]">{{ row.status }}</el-tag>
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
          @current-change="fetchOrders"
          @size-change="fetchOrders"
        />
      </div>
    </el-row>
  </el-card>
</template>

<style scoped></style>
