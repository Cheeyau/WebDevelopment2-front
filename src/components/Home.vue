<template>
  <section>
    <div class="container">
      <h2 v-if="!store.isAuthenticated" class="mt-3 mt-lg-5">Welcome to the bike shop!</h2>
      <h2 v-else="store.isAuthenticated" class="mt-3 mt-lg-5">Welcome {{ store.name }}</h2>
    </div>
  </section>
  <bikesList />
</template>

<script>
import { useLoginStore } from '@/stores/LoginStore'
import bikesList from './bikes/BikesList.vue'

export default {
  name: "Home",
  components: {
    bikesList,
  },
  setup() {
    const store = useLoginStore();
    return { store };
  },
};
</script>

<style>
</style>