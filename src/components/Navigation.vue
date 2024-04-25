<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Bikes</router-link>
        </li>

        <li class="nav-item" v-if="store.isAuthenticated">
          <router-link to="/users" class="nav-link" active-class="active">Profile</router-link>
        </li>
        <li class="nav-item" v-if="store.isAuthenticated">
          <router-link to="/Profile" class="nav-link" active-class="active">Orders</router-link>
        </li>
        

        <li class="nav-item" v-if="!store.isAuthenticated">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li class="nav-item" v-else>
          <router-link to="/" class="nav-link" active-class="active">Logout</router-link>
        </li>

      </ul>      
    </div>
  </nav>
</template>

<script>
import { useLoginStore } from '@/stores/store'

export default {
  name: "Navigation",
  setup() {
    const store = useLoginStore();
    return { store };
  }
};

</script>

<style>
</style>