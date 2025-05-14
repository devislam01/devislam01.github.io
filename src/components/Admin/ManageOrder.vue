<script setup>
import {ref} from "vue";

const input = ref('');
const selectedStatus = ref(""); 
const dialogVisible = ref(false);
const rules = ref({
  orderDate: [{ required: true, message: 'Please input Order Date', trigger: 'blur' }],
  orderStatus: [{ required: true, message: 'Please input Order Status', trigger: 'blur' }],
})
const tableData = [
    {
        id: '007',
        name: '29-09-2000',
        status: 'Pending',
    },
    {
        id: '007',
        name: '29-09-2000',
        status: 'Pending',
    },
    {
        id: '007',
        name: '29-09-2000',
        status: 'Pending',
    },
    {
        id: '007',
        name: '29-09-2000',
        status: 'Pending',
    },
    {
        id: '007',
        name: '29-09-2000',
        status: 'Pending',
    },
    {
        id: '007',
        name: '29-09-2000',
        status: 'Pending',
    },
];

const status = [
  { value: "Pending", label: "Pending" },
  { value: "Preparing", label: "Preparing" },
  { value: "Shipping", label: "Shipping" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
];

</script>

<template>
    <el-row style="border-radius: 5px;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); margin: 30px 40px 20px 20px; padding: 20px;">
        <div style="font-size: 1.1rem; font-weight: 700; width: 100%; text-align: left;">Order List</div>
        <el-row style="width: 100%; justify-content: space-between; margin: 10px 0 10px 0;">
            <el-col :span="8">
                <div style="font-size: 1.1rem; font-weight: 400; text-align: left;">Order ID</div>
                <div style="margin-right: 20px;"><el-input v-model="input" placeholder="000"></el-input></div>
            </el-col>
            <el-col :span="8">
                <div style="font-size: 1.1rem; font-weight: 400; text-align: left;">Order Date</div>
                <div style="margin-right: 20px;"><el-input v-model="input" placeholder="xx-xx-xxxx"></el-input></div>
            </el-col>
            <el-col :span="8">
                <div style="font-size: 1.1rem; font-weight: 400; text-align: left;">Order Status</div>
                <div style="margin-right: 20px;"><el-input v-model="input" placeholder="Pending"></el-input></div>
            </el-col>
            <el-col :span="24" style="display: flex; justify-content: flex-start; margin-top: 20px;">
                <el-button type="success" style="border: none; width: 90px; color: white;" size="large">Search</el-button>
                <el-button type="danger" style="border: none; width: 90px; color: white;" size="large">Reset</el-button>
            </el-col>
        </el-row>
        <el-row style="width: 100%; justify-content: right; margin-top: 20px;">
            <el-button type="success" style="border: none; width: 120px; color: white;" size="large"><el-icon><Plus /></el-icon>Add Order</el-button>
        </el-row>
        <el-table :data="tableData" height="333" style="width: 100%;">
            <el-table-column prop="id" label="Order ID" :flex-grow="1" />
            <el-table-column prop="name" label="Order Date" :flex-grow="1" />
            <el-table-column prop="status" label="Order Status" :flex-grow="1" />
            <el-table-column label="Action" :flex-grow="1">
                <template #default="scope">
                    <el-button @click="dialogVisible = true" type="primary" style="color: white;"><el-icon><Edit /></el-icon></el-button>
                    <el-button type="danger" style="color: white; margin-right: 12px;"><el-icon><Delete /></el-icon></el-button>
                    <el-dropdown placement="bottom-start">
                        <el-button type="info" style="color: white;">
                            <el-icon><More /></el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                            <el-dropdown-item>Cancel Order</el-dropdown-item>
                            <el-dropdown-item>Delay Order</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <div style="width: 100%; justify-items: center;"><el-pagination background layout="prev, pager, next" :total="50" style="margin-top: 20px;"/></div>
    </el-row>
    <el-dialog v-model="dialogVisible" title="Edit Order" width="600" style="text-align: center;" :before-close="handleClose">
        <el-form :rules="rules">
            <el-row>
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="Order ID"/>
                </el-col>
                <el-col :span="17">
                    <el-input disabled v-model="input" placeholder="000" style="height: 40px;"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="Order Date" prop="orderDate"/>
                </el-col>
                <el-col :span="17">
                    <el-date-picker
                        v-model="value1"
                        type="datetime"
                        placeholder="Pick a Date"
                        format="YYYY-MM-DD HH:mm:ss"
                        date-format="MMM DD, YYYY"
                        time-format="HH:mm"
                        style="width: 100%; height: 40px;"
                    >
                        <template #prev-month>
                        <el-icon><CaretLeft /></el-icon>
                        </template>
                        <template #next-month>
                        <el-icon><CaretRight /></el-icon>
                        </template>
                        <template #prev-year>
                        <el-icon>
                            <svg
                            viewBox="0 0 20 20"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <g stroke-width="1" fill-rule="evenodd">
                                <g fill="currentColor">
                                <path
                                    d="M8.73171,16.7949 C9.03264,17.0795 9.50733,17.0663 9.79196,16.7654 C10.0766,16.4644 10.0634,15.9897 9.76243,15.7051 L4.52339,10.75 L17.2471,10.75 C17.6613,10.75 17.9971,10.4142 17.9971,10 C17.9971,9.58579 17.6613,9.25 17.2471,9.25 L4.52112,9.25 L9.76243,4.29275 C10.0634,4.00812 10.0766,3.53343 9.79196,3.2325 C9.50733,2.93156 9.03264,2.91834 8.73171,3.20297 L2.31449,9.27241 C2.14819,9.4297 2.04819,9.62981 2.01448,9.8386 C2.00308,9.89058 1.99707,9.94459 1.99707,10 C1.99707,10.0576 2.00356,10.1137 2.01585,10.1675 C2.05084,10.3733 2.15039,10.5702 2.31449,10.7254 L8.73171,16.7949 Z"
                                />
                                </g>
                            </g>
                            </svg>
                        </el-icon>
                        </template>
                        <template #next-year>
                        <el-icon>
                            <svg
                            viewBox="0 0 20 20"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <g stroke-width="1" fill-rule="evenodd">
                                <g fill="currentColor">
                                <path
                                    d="M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z"
                                />
                                </g>
                            </g>
                            </svg>
                        </el-icon>
                        </template>
                    </el-date-picker>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="Order Status" prop="orderStatus"/>
                </el-col>
                <el-col :span="17">
                    <el-select
                    v-model="selectedStatus"
                    placeholder="Select Order Status"
                    size="large"
                    style="min-width: 402px;"
                    >
                    <el-option
                        v-for="item in status"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                    </el-select>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
        <div style="margin: 16px 0 16px 0; text-align: center;">
            <el-button type="primary" @click="dialogVisible = false">Save</el-button>
            <el-button @click="dialogVisible = false">Cancel</el-button>
        </div>
        </template>
    </el-dialog>
</template>