<script setup>
import {ref} from "vue";

const input = ref('');
const tableData = [
    {
        id: '007',
        name: 'E-Stove',
        category: 'Kitchenware',
        condition: 'Brand New',
    },
    {
        id: '007',
        name: 'E-Stove',
        category: 'Kitchenware',
        condition: 'Brand New',
    },
    {
        id: '007',
        name: 'E-Stove',
        category: 'Kitchenware',
        condition: 'Brand New',
    },
    {
        id: '007',
        name: 'E-Stove',
        category: 'Kitchenware',
        condition: 'Brand New',
    },
    {
        id: '007',
        name: 'E-Stove',
        category: 'Kitchenware',
        condition: 'Brand New',
    },
    {
        id: '007',
        name: 'E-Stove',
        category: 'Kitchenware',
        condition: 'Brand New',
    },
]
</script>

<template>
    <el-row style="border-radius: 5px;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); margin: 30px 40px 20px 20px; padding: 20px;">
        <div style="font-size: 1.1rem; font-weight: 700; width: 100%; text-align: left;">Product List</div>
        <el-row style="width: 100%; justify-content: space-between; margin: 10px 0 10px 0;">
            <el-col :span="6">
                <div style="font-size: 1.1rem; font-weight: 400; text-align: left;">Product ID</div>
                <div style="margin-right: 20px;"><el-input v-model="input" placeholder="000"></el-input></div>
            </el-col>
            <el-col :span="6">
                <div style="font-size: 1.1rem; font-weight: 400; text-align: left;">Product Name</div>
                <div style="margin-right: 20px;"><el-input v-model="input" placeholder="xxx"></el-input></div>
            </el-col>
            <el-col :span="6">
                <div style="font-size: 1.1rem; font-weight: 400; text-align: left;">Product Category</div>
                <div style="margin-right: 20px;"><el-input v-model="input" placeholder="Kitchenware"></el-input></div>
            </el-col>
            <el-col :span="6">
                <div style="font-size: 1.1rem; font-weight: 400; text-align: left;">Product Condition</div>
                <div style="margin-right: 20px;"><el-input v-model="input" placeholder="Brand New"></el-input></div>
            </el-col>
            <el-col :span="24" style="display: flex; justify-content: flex-start; margin-top: 20px;">
                <el-button type="success" style="border: none; width: 90px;" size="large">Search</el-button>
                <el-button type="danger" style="border: none; width: 90px;" size="large">Reset</el-button>
            </el-col>
        </el-row>
        <el-row style="width: 100%; justify-content: right; margin-top: 20px;">
            <el-button type="success" style="border: none; width: 120px; color: white;" size="large"><el-icon><Plus /></el-icon>Add Product</el-button>
        </el-row>
        <el-table :data="tableData" height="333" style="width: 100%;">
            <el-table-column prop="id" label="Product ID" :flex-grow="1" />
            <el-table-column prop="name" label="Product Name" :flex-grow="1" />
            <el-table-column prop="category" label="Product Category" :flex-grow="1" />
            <el-table-column prop="condition" label="Product Condition" :flex-grow="1" />
            <el-table-column label="Action" :flex-grow="1">
                <template #default="scope">
                    <router-link to="/admin/editProduct"><el-button type="primary" style="color: white;"><el-icon><Edit /></el-icon></el-button></router-link>
                    <el-button type="danger" style="color: white; margin: 0 12px 0 12px;"><el-icon><Delete /></el-icon></el-button>
                    <el-dropdown placement="bottom-start">
                        <el-button type="info" style="color: white;">
                            <el-icon><More /></el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                            <el-dropdown-item>Hello1</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <div style="width: 100%; justify-items: center;"><el-pagination background layout="prev, pager, next" :total="50" style="margin-top: 20px;"/></div>
    </el-row>
</template>