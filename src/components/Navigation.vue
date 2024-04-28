<template>
  <nav class="text-center navbar navbar-expand-md navbar-dark bg-dark mb-4">
    
    <button class="navbar-toggler mobile-icon" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">
            <i class="bi-bicycle"></i>
            Bikes
          </router-link>
        </li>

        <li class="nav-item" v-if="store.isAuthenticated">
          <router-link to="/orders" class="nav-link" active-class="active">Orders</router-link>
        </li>
        <li class="nav-item" v-if="!store.isAuthenticated">
          <router-link to="/register" class="nav-link" active-class="active">
            <i class="bi-shift"></i>
            Register
          </router-link>
        </li>

        <li class="nav-item" v-if="!store.isAuthenticated">
          <router-link to="/login" class="nav-link" active-class="active">
            <i class="bi-person"></i>
            Login
          </router-link>
        </li>
        <li class="nav-item" v-else>
          <router-link to="/" class="nav-link" active-class="active" @click="logout()" >Logout</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/basket" class="nav-link" active-class="active">
            <i class="bi-basket"></i>
            Basket 
            <span v-if="basketStore.products.length > 0" class="align-items-center justify-content-center translate-middle badge rounded-pill bg-secondary">
              {{ basketStore.products.length }}
            </span>
          </router-link>
        </li>

      </ul>      
    </div>
  </nav>
</template>

<script>
import { useLoginStore } from '@/stores/LoginStore';
import { useBasketStore } from '@/stores/BasketStore';

export default {
  name: "Navigation",
  setup() {
    const store = useLoginStore();
    const basketStore = useBasketStore();
    return { store, basketStore };
  },
  methods: {
    logout() {
      this.store.logout()
        .then(() => {
          this.$router.replace("/");
        })
        .catch((error) => {
          this.errorMessage = error;
        });
    }
  }
};

</script>

<style scoped>
.mobile-icon {
  margin-left: 15px;
}

</style>