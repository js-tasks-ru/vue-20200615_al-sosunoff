<script>
export default {
  name: 'BaseButton',
  props: {
    block: {
      type: Boolean,
    },
    tag: {
      type: String,
      default: 'button',
      validator: function (value) {
        return ['button', 'a', 'router-link'].indexOf(value) !== -1;
      },
    },
  },
  render: function (h) {
    return h(
      this.tag,
      {
        attrs: {
          ...this.$attrs,
        },
        class: [
          'button',
          {
            button_block: this.block,
          },
        ],
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
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition: 0.2s all;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}
</style>
