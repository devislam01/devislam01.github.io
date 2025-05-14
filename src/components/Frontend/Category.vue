<script setup>
import {Operation} from "@element-plus/icons-vue";
import { ElMessageBox } from 'element-plus';
import { useRoute, useRouter } from 'vue-router'
import {onMounted, ref} from "vue";
import {useProductStore} from "@/stores/productStore"

const productStore = useProductStore();
const checkboxes = ref();
const productList = ref([]);
const route = useRoute();
const router = useRouter()

const fetchProductList= async() => {
  try {
    const response = await productStore.getProductList()
    productList.value = response
    console.log(response);
    
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  if (route.query.showMessageBox === 'true') {
    ElMessageBox.confirm('You may proceed to your profile page now to complete your personal information, or do it later at your convenience.', 'Welcome to SecondLife Unimas!', {
      confirmButtonText: 'Go to Profile',
      cancelButtonText: 'Do It Later',
    }).then(() => {
      router.push('/profile')
    })
  }
})

onMounted(async() => {
    await fetchProductList()
})
</script>

<template>
  <el-row style="margin-top: 1.5rem" :gutter="20">
    <el-col class="sideFilter" :span="5">
      <el-card>
        <template #header>
          <div class="card-header">
            <el-row>
              <el-col :span="12">
                <span style="float: left; font-weight: bold; color: #0F5841; font-size: 1.3rem">Filter</span>
              </el-col>
              <el-col :span="4"></el-col>
              <el-col :span="8" style="text-align: right; align-content: end">
                <el-icon size="large" style="color: #0F5841;"><Operation/></el-icon>
              </el-col>
            </el-row>
          </div>
        </template>
        <el-checkbox-group v-model="checkboxes" style="display: flex; flex-direction: column;">
          <el-checkbox label="Kitchenware" size="large"></el-checkbox>
          <el-checkbox label="Electronics" size="large"></el-checkbox>
          <el-checkbox label="Furniture" size="large"></el-checkbox>
          <el-checkbox label="Books" size="large"></el-checkbox>
          <el-checkbox label="Food" size="large"></el-checkbox>
        </el-checkbox-group>
        <div><el-button round color="#0F5841" style="background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; margin: 10px 0 10px 0; width: 100%;" size="large">Apply Filter</el-button></div>
        <div><el-button round color="#0F5841" style="background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 100%;" size="large">Clear Filter</el-button></div>
      </el-card>
    </el-col>
    <el-col :span="19" style="">
      <el-row :gutter="20" style="">
        <el-col v-for="item in productList" :key="item.productID" :span="7" class="product-col">
          <RouterLink :to="{ name: 'ProdDetail', query: { id: item.productID}}" style="color: white;">
          <img
                style="height: 280px; width: 100%; object-fit: contain; display: block;"
                src="/src/assets/eStove.png"
                alt=""
            />
            <div style="text-align: left;">
              <div style="font-weight: bold; color: #0F5841; font-size: 1.3rem;">{{ item.productName }}</div>
              <div style="font-weight: bold; color: #0F5841; font-size: 1.3rem;">RM {{ item.productPrice }}</div>
              <div style="font-weight: 400; color: #0F5841; font-size: 1.2rem;">{{ item.productCondition }}</div>
            </div>
          </RouterLink>
        </el-col>
      </el-row>
      <div style="place-self: center;"><el-pagination background layout="prev, pager, next" :total="50" style="margin-top: 20px;"/></div>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-menu-item:nth-child(2):hover {
  background-color: transparent !important;
}
.product-col {
  transition: box-shadow 0.3s ease-in-out;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  margin: 0 12px 15px 12px;
}

.product-col:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6) !important;
}
</style>