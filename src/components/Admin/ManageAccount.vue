<script setup>
import { ref } from "vue";

const input = ref("");
const value = ref('');
const dialogVisible = ref(false);
const rules = ref({
  userName: [{ required: true, message: 'Please input User Name', trigger: 'blur' }],
  emailAddress: [{ required: true, message: 'Please input Email Address', trigger: 'blur' }],
  phoneNumber: [{ required: true, message: 'Please input Phone Number', trigger: 'blur' }],
})
const tableData = [
    {
        id: "007",
        name: "Tom",
        email: "abc@gmail.com",
        phone: "016-5680609",
        status: "active",
    },
    {
        id: "007",
        name: "Tom",
        email: "abc@gmail.com",
        phone: "016-5680609",
        status: "active",
    },
    {
        id: "007",
        name: "Tom",
        email: "abc@gmail.com",
        phone: "016-5680609",
        status: "active",
    },
    {
        id: "007",
        name: "Tom",
        email: "abc@gmail.com",
        phone: "016-5680609",
        status: "active",
    },
    {
        id: "007",
        name: "Tom",
        email: "abc@gmail.com",
        phone: "016-5680609",
        status: "active",
    },
    {
        id: "007",
        name: "Tom",
        email: "abc@gmail.com",
        phone: "016-5680609",
        status: "inactive",
    },
];

const options = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
];

</script>

<template>
    <el-row style="
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      margin: 30px 40px 20px 20px;
      padding: 20px;
    ">
        <div style="font-size: 1.1rem; font-weight: 700; width: 100%; text-align: left">
            User List
        </div>
        <el-row style="width: 100%; justify-content: space-between; margin: 10px 0 10px 0">
            <el-col :span="6">
                <div style="font-size: 1.1rem; font-weight: 400; text-align: left">
                    User ID
                </div>
                <div style="margin-right: 20px">
                    <el-input v-model="input" placeholder="000"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div style="font-size: 1.1rem; font-weight: 400; text-align: left">
                    User Name
                </div>
                <div style="margin-right: 20px">
                    <el-input v-model="input" placeholder="xxx xxx xxx"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div style="font-size: 1.1rem; font-weight: 400; text-align: left">
                    Email Address
                </div>
                <div style="margin-right: 20px">
                    <el-input v-model="input" placeholder="abc@gmail.com"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div style="font-size: 1.1rem; font-weight: 400; text-align: left">
                    Phone Number
                </div>
                <div style="margin-right: 20px">
                    <el-input v-model="input" placeholder="01x-xxxxxxx"></el-input>
                </div>
            </el-col>
            <el-col :span="24" style="display: flex; justify-content: flex-start; margin-top: 20px">
                <el-button type="success" style="border: none; width: 90px" size="large">Search</el-button>
                <el-button type="danger" style="border: none; width: 90px" size="large">Reset</el-button>
            </el-col>
        </el-row>
        <el-row style="width: 100%; justify-content: right; margin-top: 20px">
            <el-button type="success" style="border: none; width: 120px" size="large"><el-icon
                    style="margin-right: 5px">
                    <Plus />
                </el-icon>User</el-button>
        </el-row>
        <el-table :data="tableData" height="333" style="width: 100%">
            <el-table-column prop="id" label="User ID" :flex-grow="1" />
            <el-table-column prop="name" label="User Name" :flex-grow="1" />
            <el-table-column prop="email" label="Email Address" :flex-grow="1" />
            <el-table-column prop="phone" label="Phone Number" :flex-grow="1" />
            <el-table-column prop="status" label="Status" :flex-grow="1">
                <template #default="{ row }">
                    <el-tag :type="row.status === 'active' ? 'success' : 'danger'">{{
                        row.status
                        }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Action" :flex-grow="1">
                <template #default="scope">
                    <el-button @click="dialogVisible = true" type="primary" style="color: white"><el-icon>
                            <Edit />
                        </el-icon></el-button>
                    <el-button v-if="scope.row.status === 'active'" type="danger" style="color: white; margin-right: 12px;"><el-icon>
                            <Remove />
                        </el-icon></el-button>
                    <el-button v-else type="success" style="color: white; margin-right: 12px;"><el-icon>
                            <Refresh />
                        </el-icon></el-button>
                    <el-dropdown placement="bottom-end">
                        <el-button type="info" style="color: white;">
                            <el-icon><More /></el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                            <el-dropdown-item>Reset Password</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <div style="width: 100%; justify-items: center">
            <el-pagination background layout="prev, pager, next" :total="50" style="margin-top: 20px" />
        </div>
    </el-row>
    <el-dialog v-model="dialogVisible" title="Edit User" width="600" style="text-align: center;"
        :before-close="handleClose">
        <el-form :rules="rules">
            <el-row>
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="User ID"/>
                </el-col>
                <el-col :span="17">
                    <el-input disabled v-model="input" placeholder="000" style="height: 40px;"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="User Name" prop="userName"/>
                </el-col>
                <el-col :span="17">
                    <el-input v-model="input" placeholder="xxx xxx xxx" style="height: 40px; "></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="Email Address" prop="emailAddress"/>
                </el-col>
                <el-col :span="17">
                    <el-input v-model="input" placeholder="abc@gmail.com" style="height: 40px;"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="Phone Number" prop="phoneNumber"></el-form-item>
                </el-col>
                <el-col :span="17">
                    <el-input v-model="input" placeholder="01x-xxxxxxx" style="height: 40px;"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="Gender"></el-form-item>
                </el-col>
                <el-col :span="17">
                    <el-select
                    v-model="value"
                    placeholder="Select your Gender"
                    size="large"
                    style="width: 402px"
                    >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="Address"></el-form-item>
                </el-col>
                <el-col :span="17">
                    <el-mention label="address" v-model="input" type="textarea" placeholder="NO.66, xxxxx" style="height: 40px"></el-mention>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <div style="margin: 16px 0 16px 0; text-align: center">
                <el-button type="primary" @click="dialogVisible = false">Save</el-button>
                <el-button @click="dialogVisible = false">Cancel</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped></style>
