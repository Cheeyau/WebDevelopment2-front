<template>
  <section>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
    <div class="container">
      <form ref="form">
        <h2 class="mt-3 mt-lg-5">Create a product</h2>
        <h5 class="mb-4"></h5>

        <div class="input-group mb-3">
          <span class="input-group-text">Name</span>
          <input type="text" class="form-control" v-model="product.name" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Price</span>
          <input type="number" class="form-control" v-model="product.price" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Description</span>
          <textarea
            class="form-control"
            v-model="product.description"
          ></textarea>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Image URL</span>
          <input type="text" class="form-control" v-model="product.image" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Category</span>
          <select class="form-select" v-model="product.category_id">
            <option v-for="category in this.categories" :value="category.id" :key="id">{{ category.name }}</option>
          </select>
        </div>

        <div class="input-group mt-4">
          <button type="button" class="btn btn-primary" @click="createProduct()">
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
  name: "EditProduct",
  setup() {
    const store = useLoginStore();
    return { store };
  },
  data() {
    return {
      errorMessage: '', 
      product: {
        id: 0,
        name: "",
        price: 0.0,
        description: "",
        image: "",
        category_id: 0
      },
      categories: [],
    };
  },
  mounted() {
    if (!this.store.isAuthenticated) this.$router.push('/login');
    this.getCategories();
  },
  methods: {
    async getCategories() {
      await axios
        .get('/categories')
        .then((results) => {
          this.categories = results.data;
        })
        .catch((error) => {
          this.errorMessage = error;
        });
    },
    async createProduct() {
      await axios
        .post('/products/', this.product)
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