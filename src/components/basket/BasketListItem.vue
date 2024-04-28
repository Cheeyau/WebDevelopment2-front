<template>
  <div class="card product-card">
    <div class="card-header text-center">
      <h3>{{ product.name }}</h3>
    </div>
    <div class="card-body text-center row basket-card">
      <div class="col-md-2 basket-img">
        <img  :src="product.image" :alt="product.title" :title="product.title" />
      </div>

      <div class="col-md-1 align-self-center mobile-margin">
        <button class="btn btn-danger" v-on:click="deleteProduct(product.id, product.amount)">
          Delete
        </button>
      </div>

      <div class="col-md-6">
        <div class="row basket-items justify-content-center text-center">
          <h5 class="fw-bold">Amount</h5>
          <amount-button :amount="product.amount" @clicked="setAmount"/>
        </div>
      </div>

      <div class="col-md align-self-center mobile-margin">
        <span class="price">€ {{ toDecimal }}</span>
      </div>

    </div>
    
  </div>
</template>

<script>
import { useLoginStore } from '@/stores/LoginStore';
import { useBasketStore } from '@/stores/BasketStore';
import AmountButton from '../AmountButton.vue';

export default {
  name: "ProductListItem",
  data() {
    return {
    }
  },
  components: {
    AmountButton,
  },
  computed: {
    toDecimal() {
      return this.product.price.toFixed(2);
    }
  },
  props: {
    product: Object,
  },
  setup() {
    const store = useLoginStore();
    const basket = useBasketStore();
    return { store, basket };
  },
  methods: {
    setAmount(amount) {
      if (amount.addRemove) {
        this.basket.addAmount(this.product.id);
      } else {
        if(amount.amount === 0) {
          if (confirm('Are you sure you want to delete this item?')) {
            this.basket.removeProduct(this.product.id);
          } 
        } else {
          this.basket.removeAmount(this.product.id);
        }
      };
      this.updateList();
    },
    deleteProduct(id) {
      this.basket.removeProduct(id);
      this.updateList();
    },
    updateList() {
      this.$emit('update');
    },
  },
};
</script>

<style scoped>
.basket-items {  
  margin-left: auto;
  margin-right: auto;
}

.basket-items span {
  max-width: 40px;
  margin-left: 15px;
  margin-right: 15px;
}

.basket-items button {
  max-width: 50px;
}

@media only screen and (max-width: 1024px) {
  .basket-img {
    text-align: center;
    display: inline-block;
  }
  
  .basket-img img {
    margin: 15px 0;
    display: initial;
    float: initial;
  }
  .mobile-margin {
    margin: 15px 0px 15px 15px;
  }
}

@media only screen  and (max-width: 600px) {
  .mobile-margin {
    margin: 15px 0;
  }
}

</style>