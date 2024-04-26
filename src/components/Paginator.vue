<template>
  <section class="paginator">
    <button class="btn btn-secondary col-1" @click="paginatorPrevious()">Previous</button>
    <button v-if="showButton" class="btn btn-primary col-1" @click="paginatorNext()">Next</button>
  </section>
</template>

<script>
export default {
  name: "Paginator",
  data() {
    return {
      offset: 0,
      limit: 3,
      count: 3,
    };
  },
  props: {
    showButton: Boolean
  },
  methods: {
    paginatorNext() {
      this.offset += this.count;
      this.limit += this.count;
      if (this.limit < 3) this.limit = 3;
      this.$emit('clicked', { offset: this.offset, limit: this.limit });
    },
    paginatorPrevious() {
      if (this.offset - this.count >= 3) {
        this.limit -= this.count;
        this.offset -= this.count;
      } else {
        this.limit = this.count;
        this.offset = 0;
      }
      this.$emit('clicked', { offset: this.offset, limit: this.limit });
    }
  }
};
</script>

<style>
</style>