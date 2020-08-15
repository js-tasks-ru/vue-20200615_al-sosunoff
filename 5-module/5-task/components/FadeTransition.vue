<template>
  <transition name="fade-transition" mode="out-in">
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'FadeTransition',
};
</script>

<style scoped>
.fade-transition-enter-active,
.fade-transition-leave-active {
  transition: opacity 0.5s;
}
.fade-transition-enter,
.fade-transition-leave-to {
  opacity: 0;
}
</style>
