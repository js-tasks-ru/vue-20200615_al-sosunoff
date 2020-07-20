<template>
  <button @click="add">
    {{ countLocaly }}
  </button>
</template>

<script>
export default {
  name: 'counter-button',
  model: {
    event: 'increment',
    prop: 'count',
  },
  data() {
    return {
      countLocaly: null,
    };
  },
  watch: {
    count: {
      immediate: true,
      handler(payload) {
        this.countLocaly = payload;
      },
    },
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    add() {
      this.countLocaly += 1;
      this.$emit('increment', this.countLocaly);
    },
  },
};
</script>

<style></style>
