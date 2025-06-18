<script setup>
import { onMounted, ref } from "vue";
import {
  Edit,
  More,
  Plus,
  Refresh,
  Remove,
  Warning,
} from "@element-plus/icons-vue";
import { useUserStore } from "@/stores/admin/userStore.js";
import { gender, ResidentialColleges } from "@/utils/constants.js";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();

const userList = ref([]);
const editUserDetailsDialogVisible = ref(false);
const createUserDialogVisible = ref(false);
const registerUserFormRef = ref();
const editUserDetailsFormRef = ref();
const editUserDetailFormData = ref({
  userID: "",
  userName: "",
  email: "",
  phoneNumber: "",
  userGender: "",
  residentialCollege: "",
  address: "",
});
const registerUserFormData = ref({
  email: "",
  password: "",
  confirmPassword: "",
  userName: "",
  phoneNumber: "",
  gender: "",
  address: "",
  userGender: "",
  residentialCollege: "",
  paymentQRCode: [],
});
const pagination = ref({
  pageNumber: 1,
  pageSize: 10,
  totalRecord: 0,
  pageCount: 0,
});
const querySearch = ref({
  userID: null,
  userName: null,
  email: null,
  phoneNumber: null,
});
const rules = ref({
  email: [
    { required: true, message: "Please input Email Address", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Please enter a valid email address",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "Please input Password", trigger: "blur" },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/,
      message:
        "Password must include uppercase, lowercase, and special character",
      trigger: "blur",
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: "Please confirm your Password",
      trigger: "blur",
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/,
      message:
        "Password must include uppercase, lowercase, and special character",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        if (value !== registerUserFormData.value.password) {
          callback(new Error("Passwords do not match"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  userName: [
    { required: true, message: "Please input Username", trigger: "blur" },
  ],
  phoneNumber: [
    { required: true, message: "Please input Phone Number", trigger: "blur" },
  ],
  address: [
    { required: true, message: "Please input Address", trigger: "blur" },
  ],
  userGender: [
    { required: true, message: "Please select your gender", trigger: "change" },
  ],
  residentialCollege: [
    {
      required: true,
      message: "Please choose your Residential College",
      trigger: "change",
    },
  ],
});
const resetPassword = ref("");
const resetPasswordDialogVisible = ref(false);
const selectedUser = ref({
  userID: "",
  email: "",
});

const resetFilter = async () => {
  querySearch.value = {};
  await fetchUsers();
};

const fetchUsers = async () => {
  const payload = {
    pageNumber: pagination.value.pageNumber,
    pageSize: pagination.value.pageSize,
    userID: querySearch.value.userID,
    userName: querySearch.value.userName,
    email: querySearch.value.email,
    phoneNumber: querySearch.value.phoneNumber,
  };
  const resp = await userStore.getUsers(payload);

  if (resp.code === 200) {
    userList.value = resp.data.data;
    pagination.value.pageNumber = resp.data.pagination.pageNumber;
    pagination.value.pageSize = resp.data.pagination.pageSize;
    pagination.value.totalRecord = resp.data.pagination.totalRecord;
    pagination.value.pageCount = resp.data.pagination.pageCount;
  }
};

const fetchUserDetails = async (userID) => {
  const payload = {
    userID: userID,
  };
  const resp = await userStore.getUserDetails(payload);
  if (resp.code === 200) {
    editUserDetailFormData.value = resp.data;
  }
};

const registerUser = async () => {
  const resp = await userStore.registerUser(registerUserFormData.value);
  if (resp.code === 200) {
    toast.success(resp.message);
    setTimeout(() => {
      router.go(0);
    }, 1500);
  }
};

const updateUserDetail = async () => {
  const resp = await userStore.updateUserDetails(editUserDetailFormData.value);
  if (resp.code === 200) {
    toast.success(resp.message);
    setTimeout(() => {
      router.go(0);
    }, 1500);
  }
};

const openEditUserDialog = async (userID) => {
  editUserDetailsDialogVisible.value = true;
  await fetchUserDetails(userID);
};

const openCreateUserDialog = () => {
  createUserDialogVisible.value = true;
};

const closeCreateUserDialog = (form) => {
  createUserDialogVisible.value = false;
  form.resetFields();
};

const submitRegisterUserForm = async (form) => {
  await form.validate();
  await registerUser();
};

const submitEditUserDetailsForm = async (form) => {
  editUserDetailsDialogVisible.value = false;
  await form.validate();
  await updateUserDetail();
};

const banUser = async (userID) => {
  const payload = {
    userID: userID,
  };
  const resp = await userStore.banUser(payload);
  if (resp.code === 200) {
    setTimeout(() => {
      router.go(0);
    }, 1500);
  }
};

const reinstateUser = async (userID) => {
  const payload = {
    userID: userID,
  };
  const resp = await userStore.reinstateUser(payload);
  if (resp.code === 200) {
    setTimeout(() => {
      router.go(0);
    }, 1500);
  }
};

const submitResetPassword = async () => {
  const payload = {
    userID: selectedUser.value.userID,
    password: resetPassword.value,
  };
  const resp = await userStore.resetPassword(payload);
  if (resp.code === 200) {
    setTimeout(() => {
      router.go(0);
    }, 1500);
  }
};

const openResetPasswordDialog = (userID, email) => {
  resetPasswordDialogVisible.value = true;
  selectedUser.value.userID = userID;
  selectedUser.value.email = email;
};

onMounted(fetchUsers);
</script>

<template>
  <el-card
    header="User List"
    style="margin: 7% 3%; min-width: 500px; height: 800px; text-align: left"
  >
    <el-row :gutter="20">
      <el-col :span="6">
        <div>
          <span>User ID</span>
          <el-input
            type="text"
            v-model="querySearch.userID"
            placeholder="Paste the ID here..."
            clearable
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span>User Name</span>
        <div>
          <el-input
            type="text"
            v-model="querySearch.userName"
            placeholder="Paste the name here..."
            clearable
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span>Email Address</span>
        <div>
          <el-input
            type="text"
            v-model="querySearch.email"
            placeholder="abc@gmail.com"
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span>Phone Number</span>
        <div>
          <el-input
            type="text"
            v-model="querySearch.phoneNumber"
            placeholder="01xxxxxxxx"
          ></el-input>
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
          @click="fetchUsers"
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
    <el-row style="justify-content: right; margin: 2% 0">
      <el-button
        type="success"
        style="border: none; width: 120px"
        size="large"
        @click="openCreateUserDialog"
        ><el-icon style="display: flex; align-items: center">
          <Plus />
        </el-icon>
        <span style="font-size: 1rem">User</span></el-button
      >
    </el-row>
    <el-row>
      <el-table :data="userList" height="333" style="width: 100%" stripe>
        <el-table-column
          prop="userID"
          label="User ID"
          :flex-grow="1"
          show-overflow-tooltip
        />
        <el-table-column prop="userName" label="User Name" :flex-grow="1" />
        <el-table-column prop="email" label="Email Address" :flex-grow="1" />
        <el-table-column
          prop="phoneNumber"
          label="Phone Number"
          :flex-grow="1"
        />
        <el-table-column prop="status" label="Status" :flex-grow="1">
          <template #default="{ row }">
            <el-tag :type="row.status === 'Active' ? 'success' : 'danger'">{{
              row.status
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Action" :flex-grow="1">
          <template #default="scope">
            <el-button
              @click="openEditUserDialog(scope.row.userID)"
              type="primary"
              style="color: white"
              ><el-icon> <Edit /> </el-icon
            ></el-button>
            <el-button
              v-if="scope.row.status === 'Active'"
              type="danger"
              style="color: white; margin-right: 12px"
              @click="banUser(scope.row.userID)"
              ><el-icon> <Remove /> </el-icon
            ></el-button>
            <el-button
              v-else
              type="success"
              style="color: white; margin-right: 12px"
              @click="reinstateUser(scope.row.userID)"
              ><el-icon> <Refresh /> </el-icon
            ></el-button>
            <el-dropdown placement="bottom-end">
              <el-button type="info" style="color: white">
                <el-icon><More /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    @click="
                      openResetPasswordDialog(scope.row.userID, scope.row.email)
                    "
                  >
                    Reset Password
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
          @current-change="fetchUsers"
          @size-change="fetchUsers"
        />
      </div>
    </el-row>
  </el-card>

  <!-- Create User Dialog -->
  <el-dialog
    v-model="createUserDialogVisible"
    title="Register User"
    width="600"
  >
    <el-form
      ref="registerUserFormRef"
      :model="registerUserFormData"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="Email" prop="email">
        <el-input
          v-model="registerUserFormData.email"
          placeholder="abc@gmail.com"
          style="width: 400px; height: 40px"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password"
        ><el-input
          v-model="registerUserFormData.password"
          type="password"
          show-password
          placeholder="Please enter your Password"
          style="width: 400px; height: 40px"
        ></el-input>
      </el-form-item>
      <el-form-item label="Confirm Password" prop="confirmPassword">
        <el-input
          v-model="registerUserFormData.confirmPassword"
          type="password"
          show-password
          placeholder="Please enter again your password"
          style="width: 400px; height: 40px"
        ></el-input>
      </el-form-item>
      <el-form-item label="User Name" prop="userName">
        <el-input
          v-model="registerUserFormData.userName"
          placeholder="xxx xxx xxx"
          style="width: 400px; height: 40px"
        ></el-input>
      </el-form-item>
      <el-form-item label="Phone Number" prop="phoneNumber">
        <el-input
          v-model="registerUserFormData.phoneNumber"
          placeholder="01xxxxxxxx"
          style="width: 400px; height: 40px"
        ></el-input>
      </el-form-item>
      <el-form-item label="Gender" prop="userGender">
        <el-select
          v-model="registerUserFormData.userGender"
          placeholder="Please Select Gender"
          size="large"
          style="width: 400px; height: 40px"
        >
          <el-option
            v-for="(item, index) in gender"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Residential College" prop="residentialCollege">
        <el-select
          v-model="registerUserFormData.residentialCollege"
          placeholder="Please Select Residential College"
          size="large"
          style="width: 400px; height: 40px"
        >
          <el-option
            v-for="(item, index) in ResidentialColleges"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Address" prop="address">
        <el-input
          label="address"
          v-model="registerUserFormData.address"
          type="text"
          placeholder="Paste address here..."
          style="width: 400px; height: 40px"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="margin: 16px 0 16px 0; text-align: center">
        <el-button
          type="primary"
          @click="submitRegisterUserForm(registerUserFormRef)"
          >Save</el-button
        >
        <el-button @click="closeCreateUserDialog(registerUserFormRef)"
          >Cancel</el-button
        >
      </div>
    </template>
  </el-dialog>

  <!-- Edit User Dialog -->
  <el-dialog
    v-model="editUserDetailsDialogVisible"
    title="Edit User"
    width="600"
    style="text-align: center"
  >
    <el-form ref="editUserDetailsFormRef" :model="editUserDetailFormData">
      <el-row :gutter="20">
        <el-col :span="6" style="justify-items: right">
          <el-form-item label="User ID" />
        </el-col>
        <el-col :span="17">
          <el-input
            disabled
            v-model="editUserDetailFormData.userID"
            placeholder="000"
            style="height: 40px"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" style="justify-items: right">
          <el-form-item label="User Name" prop="userName" />
        </el-col>
        <el-col :span="17">
          <el-input
            v-model="editUserDetailFormData.userName"
            placeholder="xxx xxx xxx"
            style="height: 40px"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" style="justify-items: right">
          <el-form-item label="Email Address" prop="emailAddress" />
        </el-col>
        <el-col :span="17">
          <el-input
            v-model="editUserDetailFormData.email"
            placeholder="abc@gmail.com"
            style="height: 40px"
            disabled
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" style="justify-items: right">
          <el-form-item label="Phone Number" prop="phoneNumber"></el-form-item>
        </el-col>
        <el-col :span="17">
          <el-input
            v-model="editUserDetailFormData.phoneNumber"
            placeholder="01xxxxxxxx"
            style="height: 40px"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" style="justify-items: right">
          <el-form-item label="Gender"></el-form-item>
        </el-col>
        <el-col :span="17">
          <el-select
            v-model="editUserDetailFormData.userGender"
            placeholder="Gender"
            size="large"
          >
            <el-option
              v-for="(item, index) in gender"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" style="justify-items: right">
          <el-form-item label="Residential College"></el-form-item>
        </el-col>
        <el-col :span="17">
          <el-select
            v-model="editUserDetailFormData.residentialCollege"
            placeholder="Residential College"
            size="large"
          >
            <el-option
              v-for="(item, index) in ResidentialColleges"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" style="justify-items: right">
          <el-form-item label="Address"></el-form-item>
        </el-col>
        <el-col :span="17">
          <el-input
            label="address"
            v-model="editUserDetailFormData.address"
            type="textarea"
            placeholder="Paste address here..."
          ></el-input>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div style="margin: 16px 0 16px 0; text-align: center">
        <el-button
          type="primary"
          @click="submitEditUserDetailsForm(editUserDetailsFormRef)"
          >Save</el-button
        >
        <el-button @click="editUserDetailsDialogVisible = false"
          >Cancel</el-button
        >
      </div>
    </template>
  </el-dialog>

  <!-- Reset Password Dialog -->
  <el-dialog
    v-model="resetPasswordDialogVisible"
    width="600"
    style="text-align: center"
  >
    <p style="font-size: 1.5rem; font-weight: 600">Reset account password</p>
    <p style="font-size: 1rem">
      Enter a new password for {{ selectedUser.email }}
    </p>
    <el-input
      v-model="resetPassword"
      type="password"
      show-password
      label="New Password"
      placeholder="Enter new password..."
      clearable
      style="width: 400px; height: 40px"
    >
      <template #suffix>
        <el-tooltip
          content="This action is irreversible. Please proceed with caution."
          placement="top"
        >
          <el-icon><Warning /></el-icon>
        </el-tooltip>
      </template>
    </el-input>
    <template #footer>
      <div style="margin: 16px 0 16px 0; text-align: center">
        <el-button type="primary" @click="submitResetPassword">Save</el-button>
        <el-button @click="resetPasswordDialogVisible = false"
          >Cancel</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
