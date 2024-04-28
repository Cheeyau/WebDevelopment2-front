<template>
  
  <section class="container">
    <h1>Here are your orders</h1>
    
    <orderList />    
  </section>
</template>

<script>
import { useLoginStore } from '@/stores/LoginStore';
import orderList from '../orders/OrderList.vue';

export default {
  name: "Order",
  setup() {
    const store = useLoginStore();
    return { store };
  },
  components: {
    orderList
  },
  mounted() {
    if (!this.store.isAuthenticated) this.$router.push('/login');
  },
}
</script>

<style>

</style>
