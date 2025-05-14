<script setup>

const input = ref('');

import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref(null);

onMounted(() => {
  if (chartRef.value) {
    const myChart = echarts.init(chartRef.value);
    
    const option = {
        tooltip: {
            trigger: 'axis'
        },
      xAxis: {
        type: "category",
        data: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
            name: "Sales Revenue",
            data: [130, 25, 234, 164, 89, 188, 79, 130, 25, 234, 164, 89], 
            type: "line",
            smooth: true
        },
        {
            name: "Number of Orders",
            data: [15, 40, 100, 50, 60, 90, 30, 70, 20, 110, 75, 95], 
            type: "line",
            smooth: true
        }
      ]
    };
    myChart.setOption(option);
  }
});

</script>

<template>
    <el-row gutter="20" style="display: flex; flex-wrap: nowrap; justify-content: space-between;">
        <el-col :span="11" style="border-radius: 5px;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); margin: 30px 20px 20px 20px; padding: 20px;">
            <div style="font-size: 1.1rem; font-weight: 700; width: 100%; text-align: left; margin: 0 0 20px 0;">
                Product Overview
            </div>
            <el-row style="width: 100%; justify-content: space-between; margin: 10px 0 10px 0">
                <el-col :span="8">
                    <div style="font-size: 1.1rem; font-weight: 400; text-align: left; justify-self: center;">
                        30
                    </div>
                    <div style="font-size: 1.1rem; font-weight: 400; text-align: left; justify-self: center;">
                        Completed Sales
                    </div>
                </el-col>
                <el-col :span="8">
                    <div style="font-size: 1.1rem; font-weight: 400; text-align: left; justify-self: center;">
                        70
                    </div>
                    <div style="font-size: 1.1rem; font-weight: 400; text-align: left; justify-self: center;">
                        Product for Sales
                    </div>
                </el-col>
                <el-col :span="8">
                    <div style="font-size: 1.1rem; font-weight: 400; text-align: left; justify-self: center;">
                        100
                    </div>
                    <div style="font-size: 1.1rem; font-weight: 400; text-align: left; justify-self: center;">
                        Total Products
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="11" style="border-radius: 5px;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); margin: 30px 40px 20px 20px; padding: 20px;">
            <div style="font-size: 1.1rem; font-weight: 700; width: 100%; text-align: left; margin: 0 0 20px 0;">
                User Overview
            </div>
            <el-row style="width: 100%; justify-content: space-between; margin: 10px 0 10px 0">
                <el-col :span="8">
                    <div style="font-size: 1.1rem; font-weight: 400; text-align: left; justify-self: center;">
                        30
                    </div>
                    <div style="font-size: 1.1rem; font-weight: 400; text-align: left; justify-self: center;">
                        New Users
                    </div>
                </el-col>
                <el-col :span="8">
                    <div style="font-size: 1.1rem; font-weight: 400; text-align: left; justify-self: center;">
                        60
                    </div>
                    <div style="font-size: 1.1rem; font-weight: 400; text-align: left; justify-self: center;">
                        Active Users
                    </div>
                </el-col>
                <el-col :span="8">
                    <div style="font-size: 1.1rem; font-weight: 400; text-align: left; justify-self: center;">
                        100
                    </div>
                    <div style="font-size: 1.1rem; font-weight: 400; text-align: left; justify-self: center;">
                        Total Users
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
    <el-row style="border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);padding: 20px; margin-right: 30px; margin-left: 10px; margin-top: 10px;">
        <div style="font-size: 1.1rem; font-weight: 700; width: 100%; text-align: left;">
            Monthly Sales Revenue & Order
        </div>
        <el-row :gutter="20" style="display: flex; justify-content: center; width: 100%;">
            <div ref="chartRef" style="width: 100%; height: 400px;"></div>
        </el-row>
    </el-row>
</template>

<style>
#chart {
  width: 100%;
  height: 400px;
}
</style>