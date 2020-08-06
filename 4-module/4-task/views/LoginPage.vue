<template>
  <form class="form" @submit.prevent="submitHandler">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          v-model="email"
          type="email"
          placeholder="demo@email"
          class="form-control"
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          v-model="password"
          type="password"
          placeholder="password"
          class="form-control"
        />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link to="/register" class="link">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',
  data: () => ({
    email: '',
    password: '',
    errorMessage: '',
  }),
  methods: {
    validate() {
      this.errorMessage = '';
      if (this.email.length === 0) {
        this.errorMessage = 'Требуется ввести Email';
        return false;
      }

      if (this.password.length === 0) {
        this.errorMessage = 'Требуется ввести пароль';
        return false;
      }

      return true;
    },
    async submitHandler() {
      try {
        if (!this.validate()) {
          throw new Error(this.errorMessage);
        }
        const { fullname } = await login(this.email, this.password);
        alert(fullname);
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style scoped></style>
