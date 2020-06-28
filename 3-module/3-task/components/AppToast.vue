<template>
  <div class="toasts">
    <div
      class="toast"
      :class="[item.cls]"
      v-for="item of toasts"
      :key="item.id"
    >
      <app-icon :icon="item.icon" />
      <span>{{ item.message }}</span>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

export default {
  name: 'AppToast',

  data() {
    return {
      toasts: [],
      index: 0,
    };
  },

  methods: {
    createToast(message, type) {
      const id = this.index++;
      let icon = '';

      switch (type) {
        case 'success':
          icon = 'check-circle';
          break;
        case 'error':
          icon = 'alert-circle';
          break;
      }

      this.toasts.push({
        id,
        message,
        cls: `toast_${type}`,
        icon,
      });

      setTimeout(() => {
        this.toasts = this.toasts.filter((e) => e.id !== id);
      }, DELAY);
    },
    error(message) {
      this.createToast(message, 'error');
    },
    success(message) {
      this.createToast(message, 'success');
    },
  },

  components: { AppIcon },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
