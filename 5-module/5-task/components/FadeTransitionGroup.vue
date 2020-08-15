<template>
  <transition-group
    name="fade-transition-group"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </transition-group>
</template>

<script>
export default {
  name: 'FadeTransitionGroup',
};
</script>

<style>
.fade-transition-group-enter-active,
.fade-transition-group-leave-active {
  transition: all 1s;
}
.fade-transition-group-enter,
.fade-transition-group-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.fade-transition-group-move {
  transition: transform 1s;
}
.fade-transition-group-leave-active {
  position: absolute;
}
</style>
