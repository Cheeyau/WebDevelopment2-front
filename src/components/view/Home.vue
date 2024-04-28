<template>
  <section>
    <div class="container">
      <h2 v-if="!store.isAuthenticated" class="mt-3 mt-lg-5">Welcome to the bike shop!</h2>
      <h2 v-else="store.isAuthenticated" class="mt-3 mt-lg-5">Welcome {{ store.name }}.</h2>
    </div>
  </section>
  <productsList />
</template>

<script>
import { useLoginStore } from '@/stores/LoginStore'
import productsList from '../products/ProductsList.vue'

export default {
  name: "Home",
  components: {
    productsList,
  },
  setup() {
    const store = useLoginStore();
    return { store };
  },
};
</script>

<style scoped>
@media only screen  and (max-width: 600px) {
  .container h2 {
    text-align: center;
  }
}
</style>