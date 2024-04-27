<template>
  <div v-if="errorMessage" class="alert alert-danger" style="text-align: center;" role="alert">{{ errorMessage }}</div>
  <section class="container">
    <section class="row justify-content-md-center">
      <form class="col-md-6">
        <h1>Login</h1>
        <section class="col-md-10">
          <label for="input-password" class="form-label">User name</label>
          <input type="text" class="form-control" id="register-name" v-model="name" placeholder="Enter your user name"
          />

          <label for="input-password" class="form-label">Password</label>
          <input type="password" class="form-control" id="login-password" v-model="password" placeholder="Enter your password"
          />
        </section>
        <button type="button" @click="login()" class="btn btn-primary col-5 mt-4">Sign in</button>
      </form>
      
    </section>
  </section>
</template>

<script>
import { useLoginStore } from '@/stores/LoginStore'

export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
      errorMessage: ""
    };
  },
  setup() {
    const store = useLoginStore();
    return { store };
  },
  methods: {
    async login() {
      this.store.login(this.name, this.password)
        .then(() => {
          this.sendToHomePage();
        })
        .catch((error) => {
          this.errorMessage = error;
        });
    },
    logout() {
      this.store.logout()
        .then(() => {
          this.sendToHomePage();
        })
        .catch((error) => {
          this.errorMessage = error;
        });
    },
    sendToHomePage() {
      this.$router.replace("/");
    }
  }
}

</script>

<style>
</style>
