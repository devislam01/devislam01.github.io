<script setup>
import Breadcrumb from "../Common/Breadcrumb.vue";
import {ref} from "vue";

// const input = ref('');
const textarea = ref('');
const handleClose = ref('');
const dialogVisible = ref(false);
const value = ref();
</script>

<template>
    <Breadcrumb></Breadcrumb>
    <el-tabs type="border-card">
        <el-tab-pane label="Purchase List">
            <el-row style="border-style: solid; border-color: #0F5841; border-radius: 15px; margin: 0 20px 20px 20px;">
                <el-col :span="24" style="padding: 20px;" >
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; padding-bottom: 10px;">
                        <el-col :span="12" style="text-align: left;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <img
                                    style="width: 40px; border-radius: 50%; border: 2px solid #0F5841; "
                                    src="/src/assets/ProfilePic.jpg"
                                    alt=""
                                />
                                <div style="color: #0F5841; font-size: 1.1rem;">Ryan</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center; justify-items: right;">
                            <div style="display: flex; align-items: center; gap: 10px; ">
                                <div style="color: #0F5841; font-size: 1.0rem;">Order Status: Pending</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; margin-top: 10px;">
                        <el-col :span="12">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                <img style="width: 150px;" src="/src/assets/eStove.png" alt="" />
                                <div style="color: #0F5841; font-size: 1.2rem;">E-Stove</div>
                                <div style="color: #0F5841; font-size: 1.2rem;">x 2</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center;">
                            <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">RM 100</div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; margin-top: 10px; justify-content: right;">
                        <div style="color: #0F5841; font-size: 1.2rem;">Order Total: RM 200</div>
                    </el-row>
                    <el-button round color="#0F5841" style="float: right; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 250px; margin-top: 20px;" size="large">Contact Seller</el-button>
                    <el-button round color="#0F5841" style="float: right; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 250px; margin-top: 20px; margin-right: 20px;" size="large">Request to Cancel Order</el-button>
                </el-col>
            </el-row>
            <el-row style="border-style: solid; border-color: #0F5841; border-radius: 15px; margin: 0 20px 20px 20px;">
                <el-col :span="24" style="padding: 20px;" >
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; padding-bottom: 10px;">
                        <el-col :span="12" style="text-align: left;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <img
                                    style="width: 40px; border-radius: 50%; border: 2px solid #0F5841; "
                                    src="/src/assets/ProfilePic.jpg"
                                    alt=""
                                />
                                <div style="color: #0F5841; font-size: 1.1rem;">Ryan</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center; justify-items: right;">
                            <div style="display: flex; align-items: center; gap: 10px; ">
                                <div style="color: #0F5841; font-size: 1.0rem;">Order Status: Preparing</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; margin-top: 10px;">
                        <el-col :span="12">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                <img style="width: 150px;" src="/src/assets/eStove.png" alt="" />
                                <div style="color: #0F5841; font-size: 1.2rem;">E-Stove</div>
                                <div style="color: #0F5841; font-size: 1.2rem;">x 2</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center;">
                            <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">RM 100</div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; margin-top: 10px; justify-content: right;">
                        <div style="color: #0F5841; font-size: 1.2rem;">Order Total: RM 200</div>
                    </el-row>
                    <el-button round color="#0F5841" style="float: right; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 250px; margin-top: 20px;" size="large">Contact Seller</el-button>
                    <el-button round color="#0F5841" style="float: right; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 250px; margin-top: 20px; margin-right: 20px;" size="large">Request to Cancel Order</el-button>
                </el-col>
            </el-row>
            <el-row style="border-style: solid; border-color: #0F5841; border-radius: 15px; margin: 0 20px 0 20px;">
                <el-col :span="24" style="padding: 20px;" >
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; padding-bottom: 10px;">
                        <el-col :span="12" style="text-align: left;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <img
                                    style="width: 40px; border-radius: 50%; border: 2px solid #0F5841; "
                                    src="/src/assets/ProfilePic.jpg"
                                    alt=""
                                />
                                <div style="color: #0F5841; font-size: 1.1rem;">Ryan</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center; justify-items: right;">
                            <div style="display: flex; align-items: center; gap: 10px; ">
                                <div style="color: #0F5841; font-size: 1.0rem;">Order Status: Shipping</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; margin-top: 10px;">
                        <el-col :span="12">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                <img style="width: 150px;" src="/src/assets/eStove.png" alt="" />
                                <div style="color: #0F5841; font-size: 1.2rem;">E-Stove</div>
                                <div style="color: #0F5841; font-size: 1.2rem;">x 2</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center;">
                            <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">RM 100</div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; margin-top: 10px; justify-content: right;">
                        <div style="color: #0F5841; font-size: 1.2rem;">Order Total: RM 200</div>
                    </el-row>
                    <el-button round color="#0F5841" style="float: right; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 250px; margin-top: 20px;" size="large">Contact Seller</el-button>
                    <el-button round color="#0F5841" style="float: right; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 250px; margin-top: 20px; margin-right: 20px;" size="large">Order Received</el-button>
                </el-col>
            </el-row>
            <el-row style="border-style: solid; border-color: #0F5841; border-radius: 15px; margin: 20px 20px 0 20px;">
                <el-col :span="24" style="padding: 20px;" >
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; padding-bottom: 10px;">
                        <el-col :span="12" style="text-align: left;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <img
                                    style="width: 40px; border-radius: 50%; border: 2px solid #0F5841; "
                                    src="/src/assets/ProfilePic.jpg"
                                    alt=""
                                />
                                <div style="color: #0F5841; font-size: 1.1rem;">Ryan</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center; justify-items: right;">
                            <div style="display: flex; align-items: center; gap: 10px; ">
                                <div style="color: #0F5841; font-size: 1.0rem;">Order Status: Completed</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; margin-top: 10px;">
                        <el-col :span="12">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                <img style="width: 150px;" src="/src/assets/eStove.png" alt="" />
                                <div style="color: #0F5841; font-size: 1.2rem;">E-Stove</div>
                                <div style="color: #0F5841; font-size: 1.2rem;">x 2</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center;">
                            <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">RM 100</div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; margin-top: 10px; justify-content: right;">
                        <div style="color: #0F5841; font-size: 1.2rem;">Order Total: RM 200</div>
                    </el-row>
                    <el-button round color="#0F5841" style="float: right; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 250px; margin-top: 20px; " size="large">Contact Seller</el-button>
                    <el-button round @click="dialogVisible = true" color="#0F5841" style="float: right; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 250px; margin-top: 20px;margin-right: 20px;" size="large">Rate</el-button>
                    <el-dialog v-model="dialogVisible" title="Rate Seller" width="600" style="text-align: left;" :before-close="handleClose">
                        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                                    <div style="color: #0F5841; font-size: 1.1rem;">Seller:</div>
                                    <img
                                        style="width: 40px; border-radius: 50%; border: 2px solid #0F5841;"
                                        src="/src/assets/ProfilePic.jpg"
                                        alt=""
                                    />
                                    <div style="color: #0F5841; font-size: 1.1rem;">Ryan</div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                                    <div style="color: #0F5841; font-size: 1.1rem;">Product Sold:</div>
                                    <img
                                        style="width: 100px; border-radius: 10px; border: 2px solid #0F5841;"
                                        src="/src/assets/eStove.png"
                                        alt=""
                                    />
                                    <div style="color: #0F5841; font-size: 1.1rem;">E-Stove</div>
                                </div>
                            </div>
                            <el-rate v-model="value" allow-half/>
                        </div>
                        <div style="margin-top: 10px;">
                            <div style="color: #0F5841; font-size: 1.1rem; margin-bottom: 5px;">Leave Your Feedback:</div>
                            <el-input v-model="textarea" type="textarea" :rows="4" placeholder="Write your feedback here..." />
                        </div>
                        <template #footer>
                        <div class="dialog-footer">
                            <el-button @click="dialogVisible = false">Cancel</el-button>
                            <el-button type="primary" @click="dialogVisible = false">Submit</el-button>
                        </div>
                        </template>
                    </el-dialog>
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="Sales List">
            <el-row style="border-style: solid; border-color: #0F5841; border-radius: 15px; margin: 0 20px 20px 20px;">
                <el-col :span="24" style="padding: 20px;" >
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; padding-bottom: 10px;">
                        <el-col :span="12" style="text-align: left;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <img
                                    style="width: 40px; border-radius: 50%; border: 2px solid #0F5841; "
                                    src="/src/assets/ProfilePic.jpg"
                                    alt=""
                                />
                                <div style="color: #0F5841; font-size: 1.1rem;">Stephanie</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center; justify-items: right;">
                            <div style="display: flex; align-items: center; gap: 10px; ">
                                <div style="color: #0F5841; font-size: 1.0rem;">Order Status: Pending</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; margin-top: 10px;">
                        <el-col :span="12">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                <img style="width: 150px;" src="/src/assets/eStove.png" alt="" />
                                <div style="color: #0F5841; font-size: 1.2rem;">E-Stove</div>
                                <div style="color: #0F5841; font-size: 1.2rem;">x 2</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center;">
                            <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">RM 100</div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; margin-top: 10px; justify-content: right;">
                        <div style="color: #0F5841; font-size: 1.2rem;">Order Total: RM 200</div>
                    </el-row>
                    <el-button round color="#0F5841" style="float: right; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 250px; margin-top: 20px; " size="large">Contact Buyer</el-button>
                    <el-button round color="#0F5841" style="float: right; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 250px; margin-top: 20px; margin-right: 20px;" size="large">Confirm Order</el-button>
                </el-col>
            </el-row>
            <el-row style="border-style: solid; border-color: #0F5841; border-radius: 15px; margin: 0 20px 20px 20px;">
                <el-col :span="24" style="padding: 20px;" >
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; padding-bottom: 10px;">
                        <el-col :span="12" style="text-align: left;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <img
                                    style="width: 40px; border-radius: 50%; border: 2px solid #0F5841; "
                                    src="/src/assets/ProfilePic.jpg"
                                    alt=""
                                />
                                <div style="color: #0F5841; font-size: 1.1rem;">Stephanie</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center; justify-items: right;">
                            <div style="display: flex; align-items: center; gap: 10px; ">
                                <div style="color: #0F5841; font-size: 1.0rem;">Order Status: Preparing</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; margin-top: 10px;">
                        <el-col :span="12">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                <img style="width: 150px;" src="/src/assets/eStove.png" alt="" />
                                <div style="color: #0F5841; font-size: 1.2rem;">E-Stove</div>
                                <div style="color: #0F5841; font-size: 1.2rem;">x 2</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center;">
                            <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">RM 100</div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; margin-top: 10px; justify-content: right;">
                        <div style="color: #0F5841; font-size: 1.2rem;">Order Total: RM 200</div>
                    </el-row>
                    <el-button round color="#0F5841" style="float: right; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 250px; margin-top: 20px;" size="large">Contact Buyer</el-button>
                    <el-button round color="#0F5841" style="float: right; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 250px; margin-top: 20px; margin-right: 20px;" size="large">Start Shipping</el-button>
                </el-col>
            </el-row>
            <el-row style="border-style: solid; border-color: #0F5841; border-radius: 15px; margin: 0 20px 0 20px;">
                <el-col :span="24" style="padding: 20px;" >
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; padding-bottom: 10px;">
                        <el-col :span="12" style="text-align: left;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <img
                                    style="width: 40px; border-radius: 50%; border: 2px solid #0F5841; "
                                    src="/src/assets/ProfilePic.jpg"
                                    alt=""
                                />
                                <div style="color: #0F5841; font-size: 1.1rem;">Stephanie</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center; justify-items: right;">
                            <div style="display: flex; align-items: center; gap: 10px; ">
                                <div style="color: #0F5841; font-size: 1.0rem;">Order Status: Shipping</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; margin-top: 10px;">
                        <el-col :span="12">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                <img style="width: 150px;" src="/src/assets/eStove.png" alt="" />
                                <div style="color: #0F5841; font-size: 1.2rem;">E-Stove</div>
                                <div style="color: #0F5841; font-size: 1.2rem;">x 2</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center;">
                            <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">RM 100</div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; margin-top: 10px; justify-content: right;">
                        <div style="color: #0F5841; font-size: 1.2rem;">Order Total: RM 200</div>
                    </el-row>
                    <el-button round color="#0F5841" style="float: right; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 250px; margin-top: 20px;" size="large">Contact Buyer</el-button>
                    <el-button round color="#0F5841" style="float: right; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 250px; margin-top: 20px; margin-right: 20px;" size="large">Order Shipped</el-button>
                </el-col>
            </el-row>
            <el-row style="border-style: solid; border-color: #0F5841; border-radius: 15px; margin: 20px 20px 0 20px;">
                <el-col :span="24" style="padding: 20px;" >
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; padding-bottom: 10px;">
                        <el-col :span="12" style="text-align: left;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <img
                                    style="width: 40px; border-radius: 50%; border: 2px solid #0F5841; "
                                    src="/src/assets/ProfilePic.jpg"
                                    alt=""
                                />
                                <div style="color: #0F5841; font-size: 1.1rem;">Ryan</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center; justify-items: right;">
                            <div style="display: flex; align-items: center; gap: 10px; ">
                                <div style="color: #0F5841; font-size: 1.0rem;">Order Status: Completed</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; border-bottom: 2px solid #0F5841; margin-top: 10px;">
                        <el-col :span="12">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                <img style="width: 150px;" src="/src/assets/eStove.png" alt="" />
                                <div style="color: #0F5841; font-size: 1.2rem;">E-Stove</div>
                                <div style="color: #0F5841; font-size: 1.2rem;">x 2</div>
                            </div>
                        </el-col>
                        <el-col :span="12" style="align-content: center;">
                            <div style="color: #0F5841; font-size: 1.2rem; text-align: right;">RM 100</div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; margin-top: 10px; justify-content: right;">
                        <div style="color: #0F5841; font-size: 1.2rem;">Order Total: RM 200</div>
                    </el-row>
                    <el-button round color="#0F5841" style="float: right; background-image: linear-gradient(to right, #0F5841 , #87AB9F); border: none; width: 250px; margin-top: 20px;" size="large">Contact Buyer</el-button>
                </el-col>
            </el-row>
        </el-tab-pane>
    </el-tabs>
    
</template>