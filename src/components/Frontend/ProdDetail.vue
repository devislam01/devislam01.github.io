<script setup>
import {onMounted,ref} from "vue";
import Breadcrumb from "../Common/Breadcrumb.vue";
import {ShoppingCart} from "@element-plus/icons-vue";
import { ElMessage } from 'element-plus';
import {useProductStore} from "@/stores/productStore"
import { useRoute } from "vue-router";

const productStore = useProductStore();
const formRef = ref(null)
const info = ref({
    productImage: [],
    productName: '',
    productDescription: '',
    productCondition: '',
    productPrice: '',
    categoryName: '',
})
const route = useRoute()

const value = ref(2.3);

const value1 = ref(2);

const images = ref([
  "/src/assets/eFan.jpg",
  "/src/assets/eStove.png",
  "/src/assets/ProfilePic.jpg",
  "/src/assets/SecondLifeUnimas.png"
]);

const addToCart = () => {
    const product = {
    id: info.id,
    name: info.productName,
    price: info.productPrice,
    condition: info.productCondition,
    category: info.categoryName,
    quantity: num.value,
    image: info.image // if available
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
    ElMessage({
        message: 'Item successfully added to your cart!',
        type: 'success',
    })
};
const num = ref(1);
const handleChange = (value) => {
  console.log(value)
};

const fetchProductDetail= async() => {
  try {
    const response = await productStore.getProductDetail({productID: Number(route.query.id)})
    console.log(response);
    info.value.productName = response.productName
    info.value.productDescription = response.productDescription
    info.value.productCondition = response.productCondition
    info.value.productPrice = response.productPrice
    info.value.categoryName = response.categoryName
    //productRating
    // form.value.productImage = response.productImage
  } catch (error) {
    console.log(error);
  }
}

onMounted(async() => {
    await fetchProductDetail()
})
</script>

<template>
    <Breadcrumb></Breadcrumb>
    <el-row style="margin-top: 1.5rem;padding: 30px;" :gutter="20">
        <el-col :span="12" style="padding: 20px; border: solid;">
            <el-carousel trigger="click" height="350px">
                <el-carousel-item v-for="(image, index) in images" :key="index">
                    <img :src="image" alt="Product Image" style="max-width: 100%; max-height: 100%; object-fit: contain; display: block; margin: auto;" />
                </el-carousel-item>
            </el-carousel>
        </el-col>
        <el-col :span="12">
            <div style="text-align: left; margin-left: 20px;">
                <div style="font-weight: 400; color: #0F5841; font-size: 1.1rem;margin-bottom: -5px;">Name</div>
                <div style="font-weight: 700; color: #0F5841; font-size: 2rem; margin-bottom: 20px;">{{ info.productName }}</div>
                <div style="font-weight: 400; color: #0F5841; font-size: 1.1rem;margin-bottom: -5px;">Price</div>
                <div style="font-weight: 700; color: #0F5841; font-size: 1.6rem; margin-bottom: 20px;">RM {{ info.productPrice }}</div>
                <div style="font-weight: 400; color: #0F5841; font-size: 1.1rem;margin-bottom: -5px;">Condition</div>
                <div style="font-weight: 400; color: #0F5841; font-size: 1.4rem; margin-bottom: 20px;">{{ info.productCondition }}</div>
                <div style="font-weight: 400; color: #0F5841; font-size: 1.1rem;margin-bottom: -5px;">Category</div>
                <div style="font-weight: 400; color: #0F5841; font-size: 1.4rem; margin-bottom: 20px;">{{ info.categoryName }}</div>
                <div style="font-weight: 400; color: #0F5841; font-size: 1.6rem;">Quantity: <el-input-number v-model="num" :min="1" :max="100" @change="handleChange" style="color: #0F5841;" /></div>
                <el-button round color="#0F5841" style="background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; margin-top: 20px;width: 150px;" size="large">Buy Now</el-button>
                <el-button round color="#0F5841" @click="addToCart" style="background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; margin-top: 20px; width: 150px;" size="large"><el-icon style="margin-right: 8px;"><ShoppingCart/></el-icon>Add to Cart</el-button>
            </div>
        </el-col>
    </el-row>
    <el-row style="margin-top: 1.5rem; margin: 20px; border: solid" :gutter="20" >
        <div style="text-align: left; padding: 10px; margin-left: 10px;">
            <div style="font-weight: bold; color: #0F5841; font-size: 1.3rem;">Product Description</div>
            <div style="background-color: white; height: 10px; width: 100%;"></div>
            <div style="font-weight: bold; color: #0F5841; font-size: 1.0rem;">{{ info.productDescription }}</div>
        </div>
    </el-row>
    <el-row style="margin-top: 1.5rem; margin: 20px; border: solid; " :gutter="20" >
        <div style="text-align: left; padding: 10px; margin-left: 10px; width: 100%;">
            <div style="font-weight: bold; color: #0F5841; font-size: 1.3rem; margin-bottom: 10px;">Seller Information</div>
            <div style="display: flex; align-items: center;">
                <img style="width: 50px; border-radius: 50%; border: 2px solid #0F5841; display: block; max-inline-size: -webkit-fill-available;" src="/src/assets/ProfilePic.jpg" alt=""/>
                <div style="font-weight: bold; color: #0F5841; font-size: 1.0rem; margin-left: 10px; min-width: 200px; border-right: 2px solid #0F5841; height: 50px; align-content: space-evenly;">Dwayne Chan</div>
                <div style="justify-content: space-around; display: flex; width: 100%;">
                    <div style="margin-left: 10px; text-align: center;">
                        <div style="font-weight: bold; color: #0F5841; font-size: 1.0rem;">Ratings</div>
                        <el-rate v-model="value1" disabled show-score text-color="#ff9900" score-template="{value} points" style="font-weight: 500; flex-shrink: 0;"/>
                    </div>
                    <div style="margin-left: 10px; text-align: center;">
                        <div style="font-weight: bold; color: #0F5841; font-size: 1.0rem;">Products</div>
                        <div style="color: #0F5841; font-size: 0.95rem;">12</div>
                    </div>
                    <div style="margin-left: 10px; text-align: center;">
                        <div style="font-weight: bold; color: #0F5841; font-size: 1.0rem;">Joined</div>
                        <div style="color: #0F5841; font-size: 0.95rem;">1 Year & 7 Months</div>
                    </div>
                </div>
            </div>
        </div>
    </el-row>
</template>

<style scoped>
    
</style>