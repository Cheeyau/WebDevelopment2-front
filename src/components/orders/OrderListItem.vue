<template>
  <div class="card order-card">
    <div class="card-header row">
    </div>
    
    <div class="card-body row">
      <section class="col-md-4">
        <h5 class="fm-bold">ID: {{ order.id }}</h5>
        <p>Name: {{ order.name }}</p>
        <p>Email: {{ order.email_address }}</p>
        <p>Ordered: {{ order.created }}</p>
        <p>Status: {{ order.status }}</p>
        <p>Total: € {{ total }}</p>
      </section>
      <section class="col-md row">
        <div class="row">
          <div class="col-md-4">
            <h5 class="fw-bold">Products</h5>
            <div v-for="detail in order.items" :key = "detail.id" :detail = "detail">
              <p>{{ detail.name }}</p>
            </div>
            
          </div>
          <div class="col-md-4">
            <h5 class="fw-bold">Price</h5>
            <div v-for="detail in order.items" :key = "detail.id" :detail = "detail">
              <p>€ {{ detail.price.toFixed(2) }}</p>
            </div>
          </div>

          <div class="col-md-4">
            <h5 class="fw-bold">Amount</h5>
            <div v-for="detail in order.items" :key = "detail.id" :detail = "detail">
              <p>{{ detail.amount }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  </div>
</template>

<script>
import { useLoginStore } from '@/stores/LoginStore';

export default {
  name: "OrderListItem",
  computed: {
    total() {
      var total = 0;
      this.order.items.forEach(item => {
        total = total + (item.price * item.amount);
      });
      return total.toFixed(2);
    },
  },
  props: {
    order: Object,
  },
  setup() {
    const store = useLoginStore();
    return { store };
  },
};
</script>
<style scoped>

.order-card {
  margin-bottom: 15px;
}

</style>