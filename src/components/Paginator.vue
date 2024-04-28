<template>
  <section class="text-center paginator">
    <button v-if="!showPreviousButton" class="btn btn-secondary" @click="paginatorPrevious(this.offset, this.limit, this.count)">
      <i class="bi-arrow-left"></i>
      Previous
    </button>
    <button v-if="showButton" class="btn btn-primary" @click="paginatorNext(this.offset, this.limit, this.count)">
      Next
      <i class="bi-arrow-right"></i>
    </button>
  </section>
</template>

<script>
export default {
  name: "Paginator",
  emits: ["clicked"],
  data() {
    return {
    };
  },
  props: {
    offset: Number,
    limit: Number,
    count: Number,
    showButton: Boolean
  },
  computed: {
    showPreviousButton() {
      return this.offset === 0;
    }
  },
  methods: {
    paginatorNext(offset, limit, count) {
      offset += count;
      limit += count;
      if (limit < count) limit = count;
      this.$emit('clicked', { offset: offset, limit: limit });
    },
    paginatorPrevious(offset, limit, count) {
      if (offset - count >= count) {
        limit -= count;
        offset -= count;
      } else {
        limit = count;
        offset = 0;
      }
      this.$emit('clicked', { offset: offset, limit: limit });
    }
  }
};
</script>

<style>
.paginator {
  padding: 0 15px;
}

.paginator button {
  margin: 8px;
}

</style>