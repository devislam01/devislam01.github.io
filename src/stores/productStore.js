import { throwError } from 'element-plus/es/utils/error.mjs'
import { defineStore } from 'pinia'
import axios from '@/utils/request.js'

// 第一个参数是应用程序中 store 的唯一 id
export const useProductStore = defineStore('products', {
    state: () => {
        error: null
        data: null
    },
    actions:{
        async getProductList(){
            const response = await axios.post(`product/getProductList`)
            this.data = response.data
            return response.data
        },
        async getSpecificProductList(){
            const response = await axios.get(`product/getFilteredProductList`)
            this.data = response.data
            return response.data
        },
        async getProductDetail(productID){
            const response = await axios.post(`product/getProductDetail`, productID)
            this.data = response.data
            return response.data
        },
        async updateProduct(payload){
            return await axios.post(`product/updateProduct`, payload)
        },
        async deleteProduct(payload){
            return await axios.post(`product/deleteProduct`, payload)
        },
        async addProduct(payload){
            return await axios.post('/product/addProduct', payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        },
        
        // async getPublicProductInfo(productID){
        //     console.log(productID);
        //     try{
        //         const response = await axios.post(`https://localhost:7172/api/product/getPublicProductInfo`, productID)
                
        //         this.data = response.data

        //         return response.data
        //     }catch(error){
        //         this.error = error.response?.data?.message || error.message
        //         throw error 
        //     }
        // },
    }
})
