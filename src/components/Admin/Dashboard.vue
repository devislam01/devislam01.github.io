<script setup>
import { useDashboardStore } from "@/stores/admin/dashboardStore.js";

const input = ref("");

import { ref, onMounted, onBeforeMount, watch } from "vue";
import * as echarts from "echarts";

const chartRef = ref(null);
let myChart = null;
const dashboardStore = useDashboardStore();

const salesOverview = ref([]);
const usersOverview = ref([]);
const chartOverview = ref({
  months: [],
  salesRevenue: [],
  numberOfOrders: [],
});

onBeforeMount(async () => {
  const resp = await dashboardStore.getDashboard();

  if (resp.code === 200) {
    salesOverview.value = resp.data.sales;
    usersOverview.value = resp.data.users;
    chartOverview.value.months = resp.data.orderChartData.months;
    chartOverview.value.salesRevenue = resp.data.orderChartData.salesRevenue;
    chartOverview.value.numberOfOrders =
      resp.data.orderChartData.numberOfOrders;
  }
});

watch(
  chartOverview,
  (val) => {
    if (myChart && val.months.length > 0) {
      const option = {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: val.months,
        },
        yAxis: {
          type: "value",
          min: 0,
        },
        series: [
          {
            name: "Sales Revenue",
            data: val.salesRevenue,
            type: "line",
            smooth: true,
          },
          {
            name: "Number of Orders",
            data: val.numberOfOrders,
            type: "line",
            smooth: true,
          },
        ],
      };
      myChart.setOption(option);
      myChart.resize();
    }
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);
  }
});
</script>

<template>
  <el-row
    gutter="20"
    style="
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      color: black;
    "
  >
    <el-col
      :span="11"
      style="
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        margin: 30px 20px 20px 20px;
        padding: 20px;
      "
    >
      <div
        style="
          font-size: 1.1rem;
          font-weight: 700;
          width: 100%;
          text-align: left;
          margin: 0 0 20px 0;
        "
      >
        Sales Overview
      </div>
      <el-row
        style="
          width: 100%;
          justify-content: space-between;
          margin: 10px 0 10px 0;
        "
      >
        <el-col :span="8">
          <div
            style="
              font-size: 1.1rem;
              font-weight: 400;
              text-align: left;
              justify-self: center;
            "
          >
            RM {{ (salesOverview.totalSales ?? 0).toFixed(2) }}
          </div>
          <div
            style="
              font-size: 1.1rem;
              font-weight: 400;
              text-align: left;
              justify-self: center;
            "
          >
            Total Sales
          </div>
        </el-col>
        <el-col :span="8">
          <div
            style="
              font-size: 1.1rem;
              font-weight: 400;
              text-align: left;
              justify-self: center;
            "
          >
            RM {{ (salesOverview.lastTotalSales ?? 0).toFixed(2) }}
          </div>
          <div
            style="
              font-size: 1.1rem;
              font-weight: 400;
              text-align: left;
              justify-self: center;
            "
          >
            Last Month Total Sales
          </div>
        </el-col>
        <el-col :span="8">
          <div
            style="
              font-size: 1.1rem;
              font-weight: 400;
              text-align: left;
              justify-self: center;
            "
          >
            {{ salesOverview.totalOrders }}
          </div>
          <div
            style="
              font-size: 1.1rem;
              font-weight: 400;
              text-align: left;
              justify-self: center;
            "
          >
            Total Orders
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col
      :span="11"
      style="
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        margin: 30px 40px 20px 20px;
        padding: 20px;
      "
    >
      <div
        style="
          font-size: 1.1rem;
          font-weight: 700;
          width: 100%;
          text-align: left;
          margin: 0 0 20px 0;
        "
      >
        User Overview
      </div>
      <el-row
        style="
          width: 100%;
          justify-content: space-between;
          margin: 10px 0 10px 0;
        "
      >
        <el-col :span="8">
          <div
            style="
              font-size: 1.1rem;
              font-weight: 400;
              text-align: left;
              justify-self: center;
            "
          >
            {{ usersOverview.totalNewUser }}
          </div>
          <div
            style="
              font-size: 1.1rem;
              font-weight: 400;
              text-align: left;
              justify-self: center;
            "
          >
            New Users
          </div>
        </el-col>
        <el-col :span="8">
          <div
            style="
              font-size: 1.1rem;
              font-weight: 400;
              text-align: left;
              justify-self: center;
            "
          >
            {{ usersOverview.activeUser }}
          </div>
          <div
            style="
              font-size: 1.1rem;
              font-weight: 400;
              text-align: left;
              justify-self: center;
            "
          >
            Active Users
          </div>
        </el-col>
        <el-col :span="8">
          <div
            style="
              font-size: 1.1rem;
              font-weight: 400;
              text-align: left;
              justify-self: center;
            "
          >
            {{ usersOverview.totalUser }}
          </div>
          <div
            style="
              font-size: 1.1rem;
              font-weight: 400;
              text-align: left;
              justify-self: center;
            "
          >
            Total Users
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row
    style="
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      padding: 20px;
      margin-right: 30px;
      margin-left: 10px;
      margin-top: 10px;
    "
  >
    <div
      style="font-size: 1.1rem; font-weight: 700; width: 100%; text-align: left"
    >
      Monthly Sales Revenue & Order
    </div>
    <el-row
      :gutter="20"
      style="display: flex; justify-content: center; width: 100%"
    >
      <div ref="chartRef" style="width: 100%; height: 400px"></div>
    </el-row>
  </el-row>
</template>

<style>
#chart {
  width: 100%;
  height: 400px;
}
</style>
