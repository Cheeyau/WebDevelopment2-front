import { defineStore } from 'pinia'

export const useBasketStore = defineStore('basket', {
  state: () => ({ 
    products: [],
  }),
  getters: {
    getProducts: (state) => {
      return JSON.parse(localStorage.getItem('basket'))
    },
  }, 
  actions: {
    addProduct(id, amount) {
      var order = { id: id, amount: amount };
      this.products.push(order);
      localStorage.setItem('basket', JSON.stringify(this.products));
    },
    removeProduct(id) {
      this.products.filter(
        function(product) { 
          return product.id != id; 
        }); 
      localStorage.setItem('basket', JSON.stringify(this.products));
    }
  },
})