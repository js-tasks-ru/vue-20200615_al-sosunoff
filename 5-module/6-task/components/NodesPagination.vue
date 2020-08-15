<script>
export default {
  name: 'NodesPagination',
  inheritAttrs: false,
  props: {
    page: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 5,
    },
  },
  render(c) {
    const start = (this.page - 1) * this.perPage;
    const count = start + this.perPage;

    const items = this.$slots.default
      ? this.$slots.default.slice(start, count)
      : this.$slots.default;
    return c('div', items);
  },
};
</script>

<style scoped></style>
