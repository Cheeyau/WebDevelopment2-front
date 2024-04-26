import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import User from '../components/User.vue';
import Order from '../components/Order.vue';
import Transaction from '../components/Transaction.vue';
import Register from '../components/Register.vue';
import EditBike from '../components/bikes/EditBike.vue';
import CreateBike from '../components/bikes/CreateBike.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/users', component: User },
  { path: '/login', component: Login },
  { path: '/transactions', component: Transaction },
  { path: '/orders', component: Order },
  { path: '/register', component: Register },
  { path: '/editbike/:id', component: EditBike, props: true },
  { path: '/createbike', component: CreateBike },
  { path: '/register', component: Register }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
