<template>
  <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
  <div class="container" v-if="isEmpty">
    <h3>Looks like there are no orders. Return to the homepage for browsing some items.</h3>
  </div>
  <section class="container" v-else>
    <h2 class="mt-3 mt-lg-5">Orders:</h2>  
    
    <section class="row mt-3">
      <order-list-item
        v-for="order in orders"
        :key = "order.id"
        :order = "order"
        @update="getOrders"
      />
    </section>
  </section>

  <paginator 
    :showButton = "this.showNextButton" 
    :offset = "this.offset"
    :limit = "this.limit"
    :count = "this.count"
    @clicked="childPaginator"/>

</template>

<script>
import { useLoginStore } from '@/stores/LoginStore';
import  axios from '../../axios-auth';
import  orderListItem  from './OrderListItem.vue';
import  paginator  from '../Paginator.vue';

export default {
  name: "OrderList",
  components: {
    orderListItem,
    paginator,
  },
  setup() {
    const store = useLoginStore();
    return { store };
  },
  data() {
    return {
      showNextButton: true,
      orders: [],
      errorMessage: '',
      offset: 0,
      count: 10,
      limit: 10,
    };
  },
  computed: {
    isEmpty() {
      return !this.orders.length === 0;
    },
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    childPaginator(value) {
      this.offset = value.offset;
      this.limit = value.limit;
      this.getOrders();
    },
    async getOrders() {
      await axios
        .get('/orders', 
          { 
            params: { 
              offset: this.offset, 
              limit: this.limit, 
            } 
          })
        .then((results) => {
          this.orders = results.data;
          this.showNextButton = (Object.keys(this.orders).length === 0 || Object.keys(this.orders).length < 3) ? false : true;
        })
        .catch((error) => {
          this.errorMessage = error;
        });
    },
  }
};
</script>

<style scoped>

</style>