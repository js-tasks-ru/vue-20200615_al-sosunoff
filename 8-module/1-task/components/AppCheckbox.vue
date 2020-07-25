<template>
  <label class="checkbox">
    <input
      type="checkbox"
      v-bind="$attrs"
      v-on="listeners"
      v-model="model"
      :value="value"
      :checked="checked"
    />
    <slot />
    <span></span>
  </label>
</template>

<script>
export default {
  name: 'AppCheckbox',
  inheritAttrs: false,
  model: {
    event: 'change',
    prop: 'checked',
  },
  props: {
    value: [Boolean, String],
    checked: [Boolean, Array],
  },
  mounted() {},
  computed: {
    listeners() {
      const listeners = { ...this.$listeners };
      delete listeners.change;
      return listeners;
    },
    model: {
      get: function () {
        /* const isArrayChecked = Array.isArray(this.checked); */

        /* let checked = isArrayChecked
          ? this.checked.includes(this.value)
          : this.checked; */

        // return checked;
        return this.checked;
      },
      set: function (value) {
        this.$emit('change', value);
        /* const isArrayChecked = Array.isArray(this.checked);
        if (isArrayChecked) {
          if (value) {
            this.$emit('change', [...this.checked, this.value]);
          } else {
            this.$emit('change', [
              ...this.checked.filter((e) => e !== this.value),
            ]);
          }
        } else {
          this.$emit('change', value);
        } */
      },
    },
  },
};
/* render(h) {
    const isArrayChecked = Array.isArray(this.$attrs.checked);

    let checked = isArrayChecked
      ? this.$attrs.checked.includes(this.$attrs.value)
      : this.$attrs.value;

    return h(
      'label',
      {
        class: ['checkbox'],
      },
      [
        h('input', {
          attrs: {
            ...this.$attrs,
            type: 'checkbox',
          },
          on: {
            ...this.$listeners,
            change: ($event) => {
              if (isArrayChecked) {
                if ($event.target.checked) {
                  this.$emit('change', [
                    ...this.$attrs.checked,
                    this.$attrs.value,
                  ]);
                } else {
                  this.$emit('change', [
                    ...this.$attrs.checked.filter(
                      (e) => e !== this.$attrs.value,
                    ),
                  ]);
                }
              } else {
                this.$emit('change', $event.target.checked);
              }
            },
          },
          domProps: {
            checked,
          },
        }),
        this.$slots.default,
        h('span'),
      ],
    );
  }, */
</script>

<style scoped>
.checkbox {
  display: inline-block;
  position: relative;
  padding-left: 44px;
  margin-bottom: 10px;
  text-align: left;
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
  transition: all 0.3s ease;
}

.checkbox > input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  padding: 0;
}

.checkbox > a {
  text-decoration: none;
}

.checkbox > span {
  border: 2px solid var(--blue-light);
}

.checkbox > span {
  border-radius: 8px;
  background: 0 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
}

.checkbox > input:checked ~ span:after {
  display: block;
}

.checkbox > span:after {
  content: '';
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 13px;
  background-image: url('../assets/icons/icon-check.svg');
  border: none;
  transform: translate(-50%, -50%);
}
</style>
