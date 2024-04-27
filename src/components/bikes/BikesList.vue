<template>
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Bikes</h2>  
      <button v-if="store.isAuthenticated"  type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createbike');">Add bike</button>
      
      <section class="row mt-3">
        <bike-list-item
          v-for="bike in bikes"
          :key = "bike.id"
          :bike = "bike"
          @update="getBikes"
        />
      </section>
      <paginator :showButton="this.showNextButton" @clicked="childPaginator"/>
    </div>

    <div v-if="errorMessage" class="alert alert-danger" style="text-align: center;" role="alert">{{ errorMessage }}</div>
  </section>
</template>

<script>
import { useLoginStore } from '@/stores/LoginStore'
import  axios from '../../axios-auth';
import  bikeListItem  from './BikesListItem.vue';
import  paginator  from '../Paginator.vue';

export default {
  name: "BikeList",
  components: {
    bikeListItem,
    paginator,
  },
  setup() {
    const store = useLoginStore();
    return { store };
  },
  data() {
    return {
      bikes: [],
      offset: 0,
      limit: 3,
      showNextButton: true,
      errorMessage: ''
    };
  },
  mounted() {
    this.getBikes();
  },
  methods: {
    childPaginator(value) {
      this.offset = value.offset;
      this.limit = value.limit;
      this.getBikes();
    },
    async getBikes() {
      await axios
        .get('/products', 
          { 
            params: { 
              offset: this.offset, 
              limit: this.limit, 
            } 
          })
        .then((results) => {
          var bikes = results.data;
          bikes.forEach(bike => {
            bike.image = '/public/images/products/' + bike.image.replace(/\s+/g, '-').toLowerCase().concat('.jpg');
          });
          this.bikes = bikes;
          this.showNextButton = (Object.keys(this.bikes).length === 0 || Object.keys(this.bikes).length < 3) ? false : true;
        })
        .catch((error) => console.log(error))
    },
  }
};
</script>

<style>
</style>