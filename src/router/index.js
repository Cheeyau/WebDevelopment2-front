import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import User from '../components/User.vue';
import Order from '../components/Order.vue';
import Transaction from '../components/Transaction.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/users', component: User },
  { path: '/login', component: Login },
  { path: '/transactions', component: Transaction },
  { path: '/orders', component: Order }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
