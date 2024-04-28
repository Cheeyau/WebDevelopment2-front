<template>
  <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
  <section class="container">
    <div class="row  justify-content-md-center">
      <form class="col-md-6">
        <h1>Register</h1>
        <section class="col-md-10">
          <label for="input-password" class="form-label">User name</label>
          <input type="text" class="form-control" id="register-name" v-model="name" placeholder="Enter your user name"
          />
        </section>

        <section class="col-md-10">
          <label for="input-email" class="form-label">Email</label>
          <input type="text" class="form-control" id="register-email" v-model="email_address" placeholder="Enter your email"
          />
        </section>

        <section class="col-md-10">
          <label for="input-password" class="form-label">Password</label>
          <input type="password" class="form-control" id="register-password" v-model="password" placeholder="Enter your password"
          />
        </section>
        <button type="button" @click="register()" class="btn btn-primary col-5 mt-4">Register</button>
      </form>
      
    </div>
  </section>
</template>

<script>
import { useLoginStore } from '@/stores/LoginStore'

export default {
  name: "Login",
  data() {
    return {
      name: "",
      email_address: "",
      password: "",
      errorMessage: ""
    };
  },
  setup() {
    const store = useLoginStore();
    return { store };
  },
  methods: {
    async register() {
      this.store.register(this.name, this.email_address, this.password)
        .then(() => {
          this.$router.replace("/");
        })
        .catch((error) => {
          this.errorMessage = error;
        });
    },
  }
}

</script>

<style>
</style>
