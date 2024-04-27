<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
    <div class="card product-card h-100">
      
      <div class="card-body card-body-items">
        <img :src="bike.image" :alt="bike.title" :title="bike.title" />
        <h3>{{ bike.name }}</h3>
        <p>{{ bike.description }}</p>
        <span class="price float-end">€ {{ bike.price.toFixed(2) }}</span>
        
        <div>
          <input type="number" class="form-control" min="0" v-model="this.amount" />
        
          <button class="btn btn-success" @click="addToBasket(bike.id, this.amount)">Add to basket</button>
        </div>
      </div>
      
      <div v-if="store.isAuthenticated" class="card-footer">
        <button class="btn btn-warning" v-on:click="editBike(bike.id)">
          Edit</button
        >&nbsp;&nbsp;
        <button class="btn btn-danger" v-on:click="deleteBike(bike.id)">
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

export default {
  name: "BikeListItem",
  data() {
    return {
      amount: 0,
    }
  },
  props: {
    bike: Object,
  },
  setup() {
    const store = useLoginStore();
    const basket = useBasketStore();
    return { store, basket };
  },
  methods: {
    addToBasket(id, amount) {
      this.basket.addProduct(id, amount);
    },
    async deleteBike(id) {
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
    editBike(id) {
      this.$router.push('/editbike/' + id);
    },
  },
};
</script>

<style scoped>
.card-body-items {
  position: relative;
  padding-bottom: 70px;
}

.card-body-items div button  {
  position: absolute;
  left: 15px;
  bottom: 15px;
}

.card-body-items div input  {
  position: absolute;
  width: 70px;
  bottom: 15px;
  left: 50%;
  right: 50%;
}

.card-body-items span {
  position: absolute;
  right: 15px;
  bottom: 15px;
}
</style>