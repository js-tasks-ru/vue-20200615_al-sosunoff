<template>
  <button type="button" @click="onClick">
    <slot>{{ count }}</slot>
  </button>
</template>

<script>
export default {
  name: 'CounterButton',

  model: {
    prop: 'count',
    event: 'increment',
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    onClick() {
      this.$emit('increment', this.count + 1);
    },
  },
};
</script>

<style scoped></style>
