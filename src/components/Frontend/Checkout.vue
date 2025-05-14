<script setup>
import Breadcrumb from "../Common/Breadcrumb.vue";
import {ref} from "vue";
import { ElMessage } from 'element-plus';
import { useRouter } from "vue-router";

const router = useRouter();
const radio2 = ref('1');
// const input = ref('');

const open = () => {
  ElMessage({
    message: 'Order Placed Successfully',
    type: 'success',
  })

  setTimeout(() => {
    router.push('/')
  }, 3000);
}
</script>

<template>
    <Breadcrumb></Breadcrumb>
    <el-row>
        <div style="float: left; font-weight: bold; color: #0F5841; font-size: 1.8rem; width: 100%; text-align: left; margin-left: 50px; margin-bottom: 20px;">Order Summary</div>
    </el-row>
    <el-row style="justify-content: center;">
        <el-col :span="23" style="padding: 20px 30px 30px 30px; border-style: solid; border-color: #0F5841; border-width: 2px; border-radius: 15px;">
            <el-row :gutter="20" style="border-bottom: 2px solid #0F5841; padding-bottom: 10px;">
                <el-col :span="9">
                    <div style="color: #0F5841; font-size: 1.2rem; text-align: left; font-weight: 500;">Product Ordered</div>
                </el-col>
                <el-col :span="5">
                    <div style="color: #0F5841; font-size: 1.2rem; text-align: right; font-weight: 500;">Unit Price</div>
                </el-col>
                <el-col :span="5">
                    <div style="color: #0F5841; font-size: 1.2rem; text-align: right; font-weight: 500;">Quantity</div>
                </el-col>
                <el-col :span="5">
                    <div style="color: #0F5841; font-size: 1.2rem; text-align: right; font-weight: 500;">Subtotal</div>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="padding-bottom: 10px; margin-top: 10px;margin-bottom: 10px;">
                <el-col :span="9" >
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img style="width: 150px;" src="/src/assets/eStove.png" alt="" />
                        <div style="color: #0F5841; font-size: 1.2rem;">E-Stove</div>
                    </div>
                </el-col>
                <el-col :span="5" style="align-content: space-evenly;">
                    <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">RM 100</div>
                </el-col>
                <el-col :span="5" style="align-content: space-evenly; justify-items: right;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="color: #0F5841; font-size: 1.2rem; ">1</div>
                    </div>
                </el-col>
                <el-col :span="5" style="align-content: space-evenly;">
                    <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">RM 100</div>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="padding-bottom: 10px;margin-top: 10px;margin-bottom: 10px;">
                <el-col :span="9" >
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img style="width: 150px;" src="/src/assets/eStove.png" alt="" />
                        <div style="color: #0F5841; font-size: 1.2rem;">E-Stove</div>
                    </div>
                </el-col>
                <el-col :span="5" style="align-content: space-evenly;">
                    <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">RM 100</div>
                </el-col>
                <el-col :span="5" style="align-content: space-evenly; justify-items: right;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">2</div>
                    </div>
                </el-col>
                <el-col :span="5" style="align-content: space-evenly;">
                    <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">RM 200</div>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="padding-bottom: 10px;">
                <el-col :span="9" >
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img style="width: 150px;" src="/src/assets/eStove.png" alt="" />
                        <div style="color: #0F5841; font-size: 1.2rem;">E-Stove</div>
                    </div>
                </el-col>
                <el-col :span="5" style="align-content: space-evenly;">
                    <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">RM 100</div>
                </el-col>
                <el-col :span="5" style="align-content: space-evenly; justify-items: right;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">2</div>
                    </div>
                </el-col>
                <el-col :span="5" style="align-content: space-evenly;">
                    <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">RM 200</div>
                </el-col>
            </el-row>
            <hr style="border: 0; height: 1px; background-color: #0F5841; width: 100%;">
            <div style="display: flex; justify-content: space-between; width: 100%; font-weight: 500; text-align: left;">
                <div style="color: #0F5841; font-size: 1.2rem;">Subtotal:</div>
                <div style="color: #0F5841; font-size: 1.2rem;">RM 500</div>
            </div>
            <hr style="border: 0; height: 1px; background-color: #0F5841; margin: 10px 0; width: 100%;">
            <div style="display: flex; justify-content: space-between; width: 100%; font-weight: 500; text-align: left; margin-top: 10px;">
                <div style="color: #0F5841; font-size: 1.2rem;">Shipping:</div>
                <div style="color: #0F5841; font-size: 1.2rem;">Free</div>
            </div>
            <hr style="border: 0; height: 1px; background-color: #0F5841; margin: 10px 0; width: 100%;">
            <div style="display: flex; justify-content: space-between; width: 100%; font-weight: 500; text-align: left; margin-top: 10px;">
                <div style="color: #0F5841; font-size: 1.2rem;">Total:</div>
                <div style="color: #0F5841; font-size: 1.2rem;">RM 500</div>
            </div>
            <div style="float: left; font-weight: 700; color: #0F5841; font-size: 1.3rem; width: 100%; text-align: left; margin-top: 20px; margin-bottom: 20px;">Shipping Option</div>
            <div style="justify-self: left;">
                <el-radio-group v-model="radio2">
                    <el-radio value="1">Self-Pickup / Meet-Up</el-radio>
                </el-radio-group>
            </div>
            <div style="float: left; font-weight: 700; color: #0F5841; font-size: 1.3rem; width: 100%; text-align: left; margin-top: 20px; margin-bottom: 20px;">Payment Method</div>
            <div style="justify-self: left;">
                <el-radio-group v-model="radio2">
                    <el-radio value="1">Cash on Delivery (COD)</el-radio>
                    <el-radio value="2">QR Code</el-radio>
                </el-radio-group>
            </div>
            <el-button round color="#0F5841" @click="open" style="margin: 30px 0 0 0; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: -webkit-fill-available;" size="large">Place Order</el-button>
        </el-col>
    </el-row>
</template>