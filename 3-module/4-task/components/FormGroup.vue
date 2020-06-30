<template>
  <div
    class="form-group"
    :class="{
      'form-group_inline': inline,
    }"
  >
    <label class="form-label" v-if="canShowLabel">{{ label }}</label>
    <slot>
      <input />
    </slot>
  </div>
</template>

<script>
export default {
  name: 'FormGroup',

  props: {
    inline: {
      type: Boolean,
    },
    label: {
      type: String,
    },
  },

  computed: {
    canShowLabel() {
      return Boolean(this.label);
    },
  },
};
</script>

<style scoped>
.form-group {
  position: relative;
  margin-bottom: 24px;
}

.form-group.form-group_inline {
  display: inline-block;
  margin-bottom: 0;
}

.form-group.form-group_inline + .form-group.form-group_inline {
  margin-left: 16px;
}

.form-label {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  margin-bottom: 10px;
  display: block;
}
</style>
