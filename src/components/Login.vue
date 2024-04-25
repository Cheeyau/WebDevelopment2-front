<template>
  <template class="container">
    <h1>Get an account.</h1>
    <template class="mt-6">
      <h2>Login</h2>
    </template>
  </template>
</template>

<script>

export default {
  name: "Login",
  methods: {
    login() {
      this.store.login(this.username, this.password)
        .then(() => {
          this.$router.replace("/products");
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
