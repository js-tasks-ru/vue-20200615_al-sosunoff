<template>
  <BaseButton class="button_secondary" v-bind="$attrs" v-on="$listeners">
    <slot />
  </BaseButton>
</template>

<script>
export default {
  name: 'SecondaryButton',
  components: {
    BaseButton: () => import('./BaseButton'),
  },
};
</script>

<style scoped>
.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button_secondary:hover {
  border-color: var(--blue-light);
}
</style>
