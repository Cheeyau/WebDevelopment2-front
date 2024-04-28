import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/view/Home.vue';
import Login from '../components/view/Login.vue';
import Order from '../components/view/Order.vue';
import Register from '../components/view/Register.vue';
import EditProduct from '../components/products/EditProduct.vue';
import CreateProduct from '../components/products/CreateProduct.vue';
import Basket from '../components/view/Basket.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/orders', component: Order },
  { path: '/register', component: Register },
  { path: '/editproduct/:id', component: EditProduct, props: true },
  { path: '/createproduct', component: CreateProduct },
  { path: '/register', component: Register },
  { path: '/basket', component: Basket }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
