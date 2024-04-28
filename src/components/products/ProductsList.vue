<template>
  <section>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Products</h2>  
      <button v-if="store.isAdmin"  type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createproduct');">Add product</button>
      
      <section>
        <h5 class="categories align-middle">Categories:</h5>
        <ol class="categories" >
          <li v-for="category in this.categories"><button class="align-middle btn btn-link" @click="setCategory(category.id)">{{ category.name }}</button></li> 
        </ol> 
      </section>
      

      <section class="row mt-3">
        <product-list-item
          v-for="product in this.products"
          :key = "product.id"
          :product = "product"
          @update = "getProducts"
        />
      </section>
      
      <paginator 
        :showButton = "this.showNextButton" 
        :offset = "this.offset"
        :limit = "this.limit"
        :count = "this.count"
        @clicked="childPaginator"/>
    </div>

  </section>
</template>

<script>
import { useLoginStore } from '@/stores/LoginStore'
import  axios from '../../axios-auth';
import  productListItem  from './ProductsListItem.vue';
import  paginator  from '../Paginator.vue';

export default {
  name: "ProductList",
  components: {
    productListItem,
    paginator,
  },
  setup() {
    const store = useLoginStore();
    return { store };
  },
  data() {
    return {
      products: [],
      categories: [],
      offset: 0,
      limit: 3,
      count: 3,
      category: 0,
      showNextButton: true,
      errorMessage: ''
    };
  },
  mounted() {
    this.getProducts();
    this.getCategories();
  },
  methods: {
    setCategory(id) {
      this.category = id;
      this.getProducts();
    },
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
    childPaginator(value) {
      this.offset = value.offset;
      this.limit = value.limit;
      this.getProducts();
    },
    async getProducts() {
      await axios
        .get('/products', 
          { 
            params: {
              category: this.category,
              offset: this.offset, 
              limit: this.limit, 
            } 
          })
        .then((results) => {
          var products = results.data;
          products.forEach(product => {
            product.image = '/public/images/products/' + product.image.replace(/\s+/g, '-').toLowerCase().concat('.jpg');
          });
          this.products = products;
          this.showNextButton = (Object.keys(this.products).length === 0 || Object.keys(this.products).length < 3) ? false : true;
        })
        .catch((error) => {
          this.errorMessage = error;
        });
    },
  }
};
</script>

<style scoped>

ol li {
  display: inline-block;
  list-style: none!important;
}

ol {
  padding: 0;
}
.categories li button {
  text-decoration: none;
}

@media only screen  and (max-width: 600px) {
  .categories {
    margin-bottom: none;
  }


  .container h2 {
    text-align: center;
  }

  .categories {
    text-align: center;
  }
}
</style>