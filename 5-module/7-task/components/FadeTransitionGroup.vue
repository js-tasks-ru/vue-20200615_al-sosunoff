<script>
export default {
  name: 'FadeTransitionGroup',
  inheritAttrs: false,
  render(c) {
    if (this.$slots.default) {
      this.$slots.default.forEach((vnode) => {
        vnode.data = vnode.data || {};
        vnode.data.class = { ...vnode.data.class, 'fade-list-item': true };
      });
    }

    return c(
      'transition-group',
      {
        attrs: {
          ...this.$attrs,
        },
        props: {
          name: 'fade-list',
        },
        on: {
          ...this.$listeners,
        },
      },
      this.$slots.default,
    );
  },
};
</script>

<style scoped>
/deep/ .fade-list {
  position: relative;
}

.fade-list /deep/ .fade-list-item {
  transition: all 0.3s ease-out;
}

/deep/ .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

/deep/ .fade-list-enter,
/deep/ .fade-list-leave-to {
  opacity: 0;
}

/deep/ .fade-list-move {
  transition: transform 0.3s;
}
</style>
