<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
    <div class="card product-card h-100">
      
      <div class="card-body card-body-items">
        <img :src="bike.image" :alt="bike.title" :title="bike.title" />
        <h3>{{ bike.name }}</h3>
        <p>{{ bike.description }}</p>
        <span class="price float-end">€ {{ bike.price.toFixed(2) }}</span>
        <button class="btn btn-success" @click="addToBasket(bike.id)">Add to basket</button>
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

export default {
  name: "BikeListItem",
  props: {
    bike: Object,
  },
  setup() {
    const store = useLoginStore();
    return { store };
  },
  methods: {
    addToBasket(id) {
      // TODO
    },
    deleteBike(id) {
      alert("bike not deleted: " + id);
      // TODO use axios to delete the bike
    },
    editBike(id) {
      alert("bike not edited: " + id);
      // TODO use the router to navigate to the editbike route and pass the id
    },
  },
};
</script>

<style scoped>
.card-body-items {
  position: relative;
  padding-bottom: 70px;
}

.card-body-items button {
  position: absolute;
  left: 15px;
  bottom: 15px;
}

.card-body-items span {
  position: absolute;
  right: 15px;
  bottom: 15px;
}
</style>