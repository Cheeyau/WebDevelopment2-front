<template>
  <div class="amount-button">
    <button class="btn btn-primary" v-if="!showRemoveButton" @click="removeAmount(this.amount)">
      <i class="bi-dash-lg"></i>
    </button>
    <span class="align-self-center fw-bold">{{ this.amount }}</span>
    
    <button class="btn btn-primary" @click="addAmount(this.amount)">
      <i class="bi-plus-lg"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "AmountButton",
  emits: ["clicked"],
  data() {
    return {
    };
  },
  props: {
    amount: Number,
  },
  computed: {
    showRemoveButton() {
      return this.amount === 0;
    }
  },
  methods: {
    removeAmount(amount) {
      amount--;
      if(amount <= 0) amount = 0;
      this.$emit('clicked', { amount: amount, addRemove: false });
    },
    addAmount(amount) {
      amount++;
      this.$emit('clicked', { amount: amount, addRemove: true });
    }
  }
};
</script>

<style scoped>

.amount-button span {
  display: inline-block;
  min-width: 35px;
}

</style>