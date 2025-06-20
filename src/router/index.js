import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Frontend",
    component: () => import("../components/Common/layouts/FrontendLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../components/Frontend/Category.vue"),
      },
      {
        path: "checkout",
        name: "Checkout",
        component: () => import("../components/Frontend/Checkout.vue"),
      },
      {
        path: "forgetPassword",
        name: "ForgetPass",
        component: () => import("../components/Frontend/ForgetPass.vue"),
      },
      {
        path: "order",
        name: "Order",
        component: () => import("../components/Frontend/Order.vue"),
      },
      {
        path: "productDetail",
        name: "ProdDetail",
        component: () => import("../components/Frontend/ProdDetail.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("../components/Frontend/Profile.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("../components/Frontend/Register.vue"),
      },
      {
        path: "seller",
        name: "Seller",
        component: () => import("../components/Frontend/Seller.vue"),
      },
      {
        path: "shoppingCart",
        name: "ShoppingCart",
        component: () => import("../components/Frontend/ShoppingCart.vue"),
      },
      {
        path: "editSpecificProduct",
        name: "EditSpecificProduct",
        component: () =>
          import("../components/Frontend/EditSpecificProduct.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../components/Common/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("../components/Admin/Dashboard.vue"),
      },
      {
        path: "manageAccount",
        name: "ManageAccount",
        component: () => import("../components/Admin/ManageAccount.vue"),
      },
      {
        path: "manageOrder",
        name: "ManageOrder",
        component: () => import("../components/Admin/ManageOrder.vue"),
      },
      {
        path: "manageProduct",
        name: "ManageProduct",
        component: () => import("../components/Admin/ManageProduct.vue"),
      },
      {
        path: "editProduct",
        name: "EditProduct",
        component: () => import("../components/Admin/EditProduct.vue"),
      },
      {
        path: "managePayment",
        name: "ManagePayment",
        component: () => import("../components/Admin/ManagePayment.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Frontend/Login.vue"),
  },
  {
    path: "/admin/login",
    name: "Admin Login",
    component: () => import("../components/Admin/Login.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
