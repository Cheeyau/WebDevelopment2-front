import { defineStore } from 'pinia'

export const useBasketStore = defineStore('basket', {
  state: () => ({ 
    products: [],
  }),
  getters: {
    isEmpty: (state) => {
      return state.products.length == 0;
    },
    getProducts: (state) => {
      
      return state.products;
    },
  }, 
  mutations: {
  },
  actions: {
    addAmount(id) {
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
          this.products[i].amount++;
        };
      }
    },
    removeAmount(id) {
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
          this.products[i].amount--;
        };
      }
    },
    addProduct(id, amount) {
      if (amount > 0) {
        var order = { id: id, amount: amount };
        
        var InArray = false;

        for (var i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
            this.products[i].amount += amount;
            InArray = true;
          };
        }

        if (!InArray)this.products.push(order);
      }
    },
    removeProduct(id) {
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
          this.products.splice(i, 1);
        };
      }
    },
    emptyBasket() {
      localStorage.clear();
      this.$reset();
    }
  },
})