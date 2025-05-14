<script setup>
import {ref} from "vue";

const input = ref('');
const selectedCategory = ref(""); 
const selectedCondition = ref(""); 
const rules = ref({
    productName: [{ required: true, message: 'Please input Product Name', trigger: 'blur' }],
    productCategory: [{ required: true, message: 'Please input Product Category', trigger: 'blur' }],
    productCondition: [{ required: true, message: 'Please input Product Condition', trigger: 'blur' }],
})
const handleRemove = (file) => {
  console.log(file)
}

const handlePictureCardPreview = (file) => {
//   dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const categories = [
  { value: "Kitchenware", label: "Kitchenware" },
  { value: "Electronics", label: "Electronics" },
  { value: "Furniture", label: "Furniture" },
  { value: "Books", label: "Books" },
  { value: "Food", label: "Food" },
];

const conditions = [
  { value: "Brand New", label: "Brand New" },
  { value: "Like New", label: "Like New" },
  { value: "Gently Used", label: "Gently Used" },
  { value: "Moderately Used", label: "Moderately Used" },
  { value: "Heavily Used", label: "Heavily Used" },
];

</script>

<template>
    <el-row style="border-radius: 5px;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); margin: 30px 40px 20px 20px; padding: 20px;">
        <div style="font-size: 1.1rem; font-weight: 700; width: 100%;">Edit Product</div>
        <div style="width: 100%; margin-top: 20px;">
        <el-form :rules="rules">
            <el-row>
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="Product ID : "/>
                </el-col>
                <el-col :span="14">
                    <el-input disabled v-model="input" placeholder="000" style="height: 40px;"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-top: 15px;">
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="Product Name : " prop="productName"/>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="input" placeholder="xxx" style="height: 40px;"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-top: 15px;">
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="Product Description :"></el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-mention label="productDescription" v-model="input" type="textarea" placeholder="xxx" style="height: 40px"></el-mention>
                </el-col>
            </el-row>
            <el-row style="margin-top: 15px;">
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="Product Category :" prop="productCategory"/>
                </el-col>
                <el-col :span="14">
                    <el-select
                    v-model="selectedCategory"
                    placeholder="Select Category"
                    size="large"
                    style="min-width: 679px;"
                    >
                    <el-option
                        v-for="item in categories"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                    </el-select>
                </el-col>
            </el-row>
            <el-row style="margin-top: 15px;">
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="Product Condition :" prop="productCondition"/>
                </el-col>
                <el-col :span="14">
                    <el-select
                    v-model="selectedCondition"
                    placeholder="Select Condition"
                    size="large"
                    style="min-width: 679px;"
                    >
                    <el-option
                        v-for="item in conditions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                    </el-select>
                </el-col>
            </el-row>
            <el-row style="margin-top: 15px;">
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="Product Price : "/>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="input" placeholder="xxx" style="height: 40px;"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-top: 15px;">
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="Stock Quantity : "/>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="input" placeholder="xxx" style="height: 40px;"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px;">
                <el-col :span="6" style="justify-items: right;">
                    <el-form-item label="Product Image : "/>
                </el-col>
                <el-col :span="14" style="text-align: left;">
                    <el-upload action="#" list-type="picture-card" :auto-upload="false">
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
                </el-col>
            </el-row>
        </el-form>
        </div>
        <div style="margin: 16px 0 16px 0; text-align: center; width: 100%;">
            <el-button type="primary">Save</el-button>
            <router-link to="/admin/manageProduct"><el-button plain style="margin-left: 12px;">Cancel</el-button></router-link>
        </div>
    </el-row>
</template>