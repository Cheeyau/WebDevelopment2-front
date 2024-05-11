<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
    <div class="card product-card h-100">
      
      <div class="card-body card-body-items">
        <img :src="product.image" :alt="product.title" :title="product.title" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <span class="price float-end">€ {{ total }}</span>
        
        <div>
          <div class="amount-box justify-content-center text-center">
            <amount-button :amount="this.amount" @clicked="setAmount"/>
          </div>
          
          <button class="btn btn-success" @click="addToBasket(product.id, this.amount)">
            Add 
            <i class="bi-plus-lg"></i>
          </button>
        </div>
      </div>
      
      <div v-if="store.isAdmin" class="card-footer">
        <button class="btn btn-warning" v-on:click="editProduct(product.id)">
          Edit</button
        >&nbsp;&nbsp;
        <button class="btn btn-danger" v-on:click="deleteProduct(product.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useLoginStore } from '@/stores/LoginStore'
import { useBasketStore } from '@/stores/BasketStore'
import axios from '../../axios-auth';
import AmountButton from '../AmountButton.vue';

export default {
  name: "ProductsListItem",
  data() {
    return {
      amount: 0,
    }
  },
  components: {
    AmountButton,
  },
  props: {
    product: Object,
  },
  setup() {
    const store = useLoginStore();
    const basket = useBasketStore();
    return { store, basket };
  },
  computed: {
    total() {
      return this.product.price.toFixed(2);
    },
  },
  
  methods: {
    setAmount(amount) {
      this.amount = amount.amount;
    },
    addToBasket(id, amount) {
      this.basket.addProduct(id, amount);
    },
    async deleteProduct(id) {
      await axios
        if (confirm('Are you sure you want to delete this item?')) {
          axios
            .delete('/products/' + id) 
            .then((results) => {
              this.$emit('update');
            })
            .catch((error) => {
              this.errorMessage = error;
              this.$emit('clicked', { offset: this.offset, limit: this.limit });
            });
        }
    },
    editProduct(id) {
      this.$router.push('/editproduct/' + id);
    },
  },
};
</script>

<style scoped>

.amount-box {
  position: absolute;
  bottom: 60px;
  left: 15px;
}

.card-body-items {
  position: relative;
  padding-bottom: 120px;
}

.card-body-items div button  {
  position: absolute;
  left: 15px;
  bottom: 15px;
}

.card-body-items span {
  position: absolute;
  right: 15px;
  bottom: 15px;
}

@media only screen  and (max-width: 600px) {
  .amount-box {
    left: 50%;
    right: 0;
    bottom: 15px;
  }

  .card-body-items {
    padding-bottom: 120px;
  }
  .card-body-items span {
    text-align: center;
    position: absolute;
    left: 0%;
    right: 0%;
    bottom: 60px;
  }
}
</style>