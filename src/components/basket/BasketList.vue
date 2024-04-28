<template>
  <section>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
    <div class="container" v-if="basket.isEmpty">
      <h3>Looks like you don't have anything in your basket. Return to the homepage for browsing some items.</h3>
    </div>
    <div class="container" v-else>
      <h2 class="mt-3 mt-lg-5">Items in your basket:</h2>  
      
      <section class="row mt-3">
        <basket-list-item
          v-for="product in products"
          :key = "product.id"
          :product = "product"
          @update="getProducts"
        />
      </section>

      <section class="row text-center basket-bottom">
        <h4 class="col-sm-6 fw-bold">Total</h4>
        <span class="col-sm-6 fw-bold price float-end">€ {{ toDecimal }}</span>
      </section>

      <section class="row">
        <section class="col-md-12 justify-content-center text-center basket-bottom">
          <button class="btn btn-danger" @click="empty()">Empty basket</button>
          <button class="btn btn-success" @click="placeOrder()">Place Order</button>
        </section>
      </section>
    </div>

  </section>
</template>

<script>
import { useLoginStore } from '@/stores/LoginStore';
import { useBasketStore } from '@/stores/BasketStore';
import  axios from '../../axios-auth';
import  basketListItem  from './BasketListItem.vue';

export default {
  name: "BasketList",
  components: {
    basketListItem,
  },
  setup() {
    const store = useLoginStore();
    const basket = useBasketStore();
    return { store, basket };
  },
  data() {
    return {
      products: [],
      errorMessage: '',
      total: 0.0
    };
  },
  computed: {
    toDecimal() {
      return this.total.toFixed(2);
    }
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    empty() {
      if (confirm('Are you sure you want to empty it?')) this.basket.emptyBasket();
    },
    async placeOrder() {
      if (confirm('Are you sure you want to place an order? You need an account for that.')) {
        var toOrderProduct = { items: [] };
        const products = this.basket.getProducts;
        products.forEach(basketProduct => {
          var item = { id: basketProduct.id, amount: basketProduct.amount };
          toOrderProduct.items.push(item);
        });
        
        if(this.store.isAuthenticated) {
          await axios
            .post('/orders/', toOrderProduct)
            .then((results) => {
              this.basket.emptyBasket();
              this.$router.push('/orders');
            })
            .catch((error) => {
              this.errorMessage = error;
            });
        } else {
          this.$router.push('/login');
        }
      };
    },
    async getProducts() {
      this.products = [];
      this.total = 0.0;
      const products = this.basket.getProducts;
      products.forEach(basketProduct => {
        axios
          .get('/products/' + basketProduct.id)
          .then((results) => {
            var product = results.data;
            product.image = '/public/images/products/' + product.image.replace(/\s+/g, '-').toLowerCase().concat('.jpg');
            product.amount = basketProduct.amount;
            this.products.push(product);
            
            this.total = this.total + (product.price * basketProduct.amount);
          })
          .catch((error) => {
            this.errorMessage = error;
          });
       });
    },
  }
};
</script>

<style scoped>
.basket-bottom {
  margin-top: 15px;
  margin-bottom: 15px;
}
.basket-bottom button {
  margin-left: 15px;
  margin-right: 15px;
}
</style>