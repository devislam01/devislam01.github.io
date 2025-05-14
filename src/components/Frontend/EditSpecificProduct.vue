<script setup>
import Breadcrumb from "../Common/Breadcrumb.vue";
import {onMounted, ref} from "vue";
import {useProductStore} from "@/stores/productStore"
import { useRoute, useRouter } from "vue-router";
import { options } from "@/utils/constants"
import { useToast } from "vue-toastification";

const toast = useToast();
const productStore = useProductStore();
const formRef = ref(null)
const form = ref({
    productImage: [],
    productName: '',
    productDescription: '',
    categoryID: 1,
    productCondition: '',
    productPrice: '',
    stockQty: '',
})
const productList = ref([])

const route = useRoute();
const router = useRouter()
console.log(route);

const updateProduct = async() => {
  try {
    await formRef.value.validate()
    console.log(form.value.productImage);
    const payload = {
        productID: Number(route.query.id),
        productImage: form.value.productImage[0].raw,
        productName: form.value.productName,
        productDescription: form.value.productDescription,
        categoryID: form.value.categoryID,
        productCondition: form.value.productCondition,
        productPrice: form.value.productPrice,
        stockQty: form.value.stockQty,
    }
    const response = await productStore.updateProduct(payload)
    if (response.code == 200){
      toast.success('Update Successfully!')
    }
    setTimeout(()=>{router.push('/seller')},2000)
    console.log(response);
    
  } catch (error) {
    console.log(error);
  }
}

const fetchProductDetail= async() => {
  try {
    const response = await productStore.getProductDetail({ProductID: Number(route.query.id)})
    console.log(response);
    form.value.productName = response.productName
    form.value.productDescription = response.productDescription
    form.value.categoryID = response.categoryID
    form.value.productCondition = response.productCondition
    form.value.productPrice = response.productPrice
    form.value.stockQty = response.stockQty
    form.value.productImage = response.productImage

  } catch (error) {
    console.log(error);
  }
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const radio1 = ref('Brand New')

const handleRemove = (file) => {
  console.log(file)
}

const handlePictureCardPreview = (file) => {
//   dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

onMounted(async() => {
    await fetchProductDetail()
})
</script>

<template>
    <Breadcrumb></Breadcrumb>
    <el-form ref="formRef" :model="form">
        <el-col :span="24" style=" border-style: solid; border-color: #0F5841; border-width: 2px; border-radius: 15px; padding: 20px; margin: 10px;">
            <el-row style="width: 100%; display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                <RouterLink to="/seller" style="color: #0F5841; margin-top: 5px;">
                    <el-icon><ArrowLeftBold /></el-icon>
                </RouterLink>
                <div style="font-weight: 700; color: #0F5841; font-size: 1.8rem;">Edit Product</div>
            </el-row>
            <el-upload  v-model:file-list="form.productImage" list-type="picture-card" :auto-upload="false">
                <el-icon><Plus /></el-icon>

                <template #file="{ file }">
                <div>
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                    <span class="el-upload-list__item-actions">
                    <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                    >
                        <el-icon><zoom-in /></el-icon>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                    >
                        <el-icon><Delete /></el-icon>
                    </span>
                    </span>
                </div>
                </template>
            </el-upload>
            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
            <div style="text-align: left;">
                <div style="float: left; color: #0F5841; font-size: 1.2rem; margin-top: 20px;font-weight: 500;">Product Name</div>
            </div>
            <el-input v-model="form.productName" placeholder="Please Enter your Product Name" style="height: 40px;"></el-input>
            <div style="text-align: left;">
                <div style="float: left; color: #0F5841; font-size: 1.2rem; margin-top: 20px;font-weight: 500;">Product Description</div>
            </div>
            <el-input v-model="form.productDescription" type="textarea" :rows="4" placeholder="Write your Product Description here..." />
            <div style="text-align: left;">
                <div style="float: left; color: #0F5841; font-size: 1.2rem; margin-top: 20px;font-weight: 500;">Product Category</div>
            </div>
            <el-select
                v-model="form.categoryID"
                placeholder="Select your Item Category"
                size="large"
                style="border-radius: 6px; width: 100%; height: 30px; align-items: center;"
                >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
            <div style="display: flex; flex-direction: column; text-align: left; width: 100%;">
                <div style="color: #0F5841; font-size: 1.2rem; margin-top: 20px; font-weight: 500;">
                    Product Condition
                </div>
                <div style="width: 100%;">
                    <el-radio-group v-model="form.productCondition" size="large" style="width: 100%; display: flex; flex-wrap: wrap;">
                        <el-radio-button label="Brand New" value="Brand New" />
                        <el-radio-button label="Like New" value="Like New" />
                        <el-radio-button label="Gently Used" value="Gently Used" />
                        <el-radio-button label="Moderately Used" value="Moderately Used" />
                        <el-radio-button label="Heavily Used" value="Heavily Used" />
                    </el-radio-group>
                </div>
            </div>
            <div style="text-align: left;">
            <div style="float: left; color: #0F5841; font-size: 1.2rem; margin-top: 20px;font-weight: 500;">Product Price</div>
            </div>
            <el-input v-model="form.productPrice" placeholder="Please Enter your Product Price" style="height: 40px;"></el-input>
            <div style="text-align: left;">
            <div style="float: left; color: #0F5841; font-size: 1.2rem; margin-top: 20px;font-weight: 500;">Product Stock</div>
            </div>
            <el-input v-model="form.stockQty" placeholder="Please Enter your Product Stock Quantity" style="height: 40px;"></el-input>
            <el-button round color="#0F5841" style="background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; margin-top: 30px; width: 100%;" size="large" @click="updateProduct">Update Product</el-button>
        </el-col>
    </el-form>
</template>

<style scoped>
.el-button + .el-button {
    margin-left: 0 !important;
}
</style>