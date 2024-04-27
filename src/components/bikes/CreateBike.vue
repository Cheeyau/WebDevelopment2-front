<template>
  <section>
    <div v-if="errorMessage" class="alert alert-danger" style="text-align: center;" role="alert">{{ errorMessage }}</div>
    <div class="container">
      <form ref="form">
        <h2 class="mt-3 mt-lg-5">Create a product</h2>
        <h5 class="mb-4"></h5>

        <div class="input-group mb-3">
          <span class="input-group-text">Name</span>
          <input type="text" class="form-control" v-model="bike.name" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Price</span>
          <input type="number" class="form-control" v-model="bike.price" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Description</span>
          <textarea
            class="form-control"
            v-model="bike.description"
          ></textarea>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Image URL</span>
          <input type="text" class="form-control" v-model="bike.image" />
        </div>

        <div class="input-group mt-4">
          <button type="button" class="btn btn-primary" @click="createBike()">
            Save changes
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="this.$router.push('/')"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </section>
</template>


<script>
import { useLoginStore } from '@/stores/LoginStore'
import axios from '../../axios-auth';

export default {
  name: "EditBike",
  setup() {
    const store = useLoginStore();
    return { store };
  },
  data() {
    return {
      errorMessage: '',
      bike: {
        id: 0,
        name: "",
        price: 0.0,
        description: "",
        image: "",
      },
    };
  },
  mounted() {
    if (!this.store.isAuthenticated) this.$router.push('/login');
  },
  methods: {
    async createBike() {
      await axios
        .post('/products/', this.bike)
        .then((results) => {
          this.$router.push('/');
        })
        .catch((error) => {
          this.errorMessage = error;
        }) 
    }
  }
};
</script>

<style>
</style>