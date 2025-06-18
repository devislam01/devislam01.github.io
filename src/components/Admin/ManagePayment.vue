<script setup>
import { paymentMethods, paymentStatus } from "@/utils/constants.js";
import { onMounted, ref } from "vue";
import { usePaymentStore } from "@/stores/admin/paymentStore.js";
import { Edit } from "@element-plus/icons-vue";
import { useToast } from "vue-toastification";

const paymentStore = usePaymentStore();
const toast = useToast();

const editPaymentFormRef = ref();
const editDialogPaymentVisible = ref(false);
const paymentList = ref([]);
const editPaymentsData = ref({
  paymentID: null,
  totalPaidAmount: null,
  paymentMethodID: null,
  receiptFile: [],
  receipt: null,
  status: null,
});

const pagination = ref({
  pageNumber: 1,
  pageSize: 10,
  totalRecord: 0,
  pageCount: 0,
});

const querySearch = ref({
  paymentID: null,
  orderID: null,
  paymentMethodID: null,
  status: null,
});

const resetFilter = async () => {
  querySearch.value = {};
  await fetchPayments();
};

const fetchPayments = async () => {
  const payload = {
    pageNumber: pagination.value.pageNumber,
    pageSize: pagination.value.pageSize,
    orderID: querySearch.value.orderID,
    paymentMethodID: querySearch.value.paymentMethodID,
    status: querySearch.value.status,
  };

  const resp = await paymentStore.getPayments(payload);
  if (resp.code === 200) {
    paymentList.value = resp.data.data;
    pagination.value.pageSize = resp.data.pagination.pageSize;
    pagination.value.pageNumber = resp.data.pagination.pageNumber;
    pagination.value.totalRecord = resp.data.pagination.totalRecord;
  }
};

const getPaymentDetail = async (paymentID) => {
  editDialogPaymentVisible.value = true;
  const payload = {
    paymentID: paymentID,
  };

  const resp = await paymentStore.getPaymentDetail(payload);
  if (resp.code === 200) {
    editPaymentsData.value = resp.data;
  }
};

const editPayment = async (formRef) => {
  await formRef.validate();

  const payload = {
    paymentID: editPaymentsData.value.paymentID,
    totalPaidAmount: editPaymentsData.value.totalPaidAmount,
    paymentMethodID: editPaymentsData.value.paymentMethodID,
    receiptFile: editPaymentsData.value.receiptFile,
    status: editPaymentsData.value.status,
  };

  const resp = await paymentStore.updatePayment(payload);
  if (resp.code === 200) {
    toast.success(resp.message);
    editDialogPaymentVisible.value = false;
    await fetchPayments();
  }
};

onMounted(fetchPayments);
</script>

<template>
  <el-card
    header="Payment List"
    style="margin: 7% 3%; min-width: 500px; height: 800px; text-align: left"
  >
    <el-row :gutter="20">
      <el-col :span="6">
        <div>
          <span>Payment ID</span>
          <el-input
            type="text"
            v-model="querySearch.paymentID"
            placeholder="Paste the ID here..."
            clearable
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span>Order ID</span>
        <div>
          <el-input
            type="text"
            v-model="querySearch.orderID"
            placeholder="Paste the ID here..."
            clearable
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span>Payment Method</span>
        <div>
          <el-select
            v-model="querySearch.paymentMethodID"
            placeholder="--- Payment Method ---"
          >
            <el-option
              v-for="(item, index) in paymentMethods"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <span>Payment Status</span>
        <div>
          <el-select
            v-model="querySearch.status"
            placeholder="--- Payment Status ---"
          >
            <el-option
              v-for="(item, index) in paymentStatus"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
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
          @click="fetchPayments"
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
      <el-table :data="paymentList" height="333" style="width: 100%" stripe>
        <el-table-column prop="paymentID" label="Payment ID" :flex-grow="1" />
        <el-table-column
          prop="orderID"
          label="Order ID"
          :flex-grow="1"
          show-overflow-tooltip
        />
        <el-table-column
          prop="totalPaidAmount"
          label="Total Paid Amount"
          :flex-grow="1"
          :formatter="(row) => `RM ${row.totalPaidAmount.toFixed(2)}`"
        />
        <el-table-column
          prop="paymentMethodID"
          label="Payment Method"
          :flex-grow="1"
          :formatter="
            (row) =>
              `${row.paymentMethodID === 1 ? 'Cash On Delivery' : 'QR Code'}`
          "
        />
        <el-table-column prop="status" label="Status" :flex-grow="1">
          <template #default="{ row }">
            <el-tag :type="row.status === 'Paid' ? 'success' : 'primary'">{{
              row.status
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Action" :flex-grow="1">
          <template #default="{ row }">
            <el-button
              type="primary"
              style="color: white"
              @click="getPaymentDetail(row.paymentID)"
            >
              <el-icon><Edit /></el-icon>
            </el-button>
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
          @current-change="fetchPayments"
          @size-change="fetchPayments"
        />
      </div>
    </el-row>
  </el-card>

  <!-- Edit Payment Dialog -->
  <el-dialog
    v-model="editDialogPaymentVisible"
    title="Edit Payment"
    width="600"
    style="text-align: center"
  >
    <el-form ref="editPaymentFormRef" :model="editPaymentsData">
      <el-row :gutter="20">
        <el-col :span="6" style="justify-items: right">
          <el-form-item label="Payment ID" />
        </el-col>
        <el-col :span="17">
          <el-input
            disabled
            v-model="editPaymentsData.paymentID"
            placeholder="000"
            style="height: 40px"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" style="justify-items: right">
          <el-form-item label="Payment Method ID" prop="paymentMethodID" />
        </el-col>
        <el-col :span="17">
          <el-select
            v-model="editPaymentsData.paymentMethodID"
            placeholder="--- Select Payment Method ---"
            style="height: 40px"
          >
            <el-option
              v-for="(item, index) in paymentMethods"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" style="justify-items: right">
          <el-form-item label="Total Paid Amount" prop="totalPaidAmount" />
        </el-col>
        <el-col :span="17">
          <el-input
            v-model="editPaymentsData.totalPaidAmount"
            placeholder="xxx xxx xxx"
            style="height: 40px"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" style="justify-items: right">
          <el-form-item label="Receipt"></el-form-item>
        </el-col>
        <el-col :span="17">
          <el-image :src="editPaymentsData.receipt" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" style="justify-items: right">
          <el-form-item label="Status"></el-form-item>
        </el-col>
        <el-col :span="17">
          <el-select
            v-model="editPaymentsData.status"
            placeholder="--- Select Payment Status ---"
            style="height: 40px"
          >
            <el-option
              v-for="(item, index) in paymentStatus"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div style="margin: 16px 0 16px 0; text-align: center">
        <el-button type="primary" @click="editPayment(editPaymentFormRef)"
          >Save</el-button
        >
        <el-button @click="editDialogPaymentVisible = false">Cancel</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
