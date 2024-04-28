<template>
  <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
  <section class="container">
    <section class="row justify-content-md-center">
        
      <basketList />
    </section>
  </section>
</template>

<script>
import { useLoginStore } from '@/stores/LoginStore';
import { useBasketStore } from '@/stores/BasketStore';
import basketList from '../basket/BasketList.vue';

export default {
  name: "Basket",
  components: {
    basketList
  },
  data() {
    return {
      errorMessage: ""
    };
  },
  setup() {
    const store = useLoginStore();
    const basketStore = useBasketStore();
    return { store, basketStore };
  },
  methods: {
    
  }
}

</script>

<style>
</style>
