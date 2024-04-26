<template>
   <navigation />
   <RouterView />
</template>

<script>
import Navigation from './components/Navigation.vue';
import { useLoginStore } from '@/stores/LoginStore';

export default {
  name: "App",
  components: {
    Navigation
  },
  setup() {
    const store = useLoginStore();
    
    return { store };
  },
  created() {
    this.store.autoLogin();
  }
};
</script>

<style scoped>
</style>
