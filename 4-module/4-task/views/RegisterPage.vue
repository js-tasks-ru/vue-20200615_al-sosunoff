<template>
  <form class="form" @submit.prevent="submitHandler">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input v-model="email" type="email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input v-model="fullname" type="text" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input v-model="password" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input v-model="passwordRepeat" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"
        ><input type="checkbox" v-model="agree" /> Я согласен с условиями
        <span></span
      ></label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт? <a href="login.html" class="link">Войдите</a>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',
  data: () => ({
    email: 'qwe@mail.ru',
    fullname: '123',
    password: '123123123',
    passwordRepeat: '123123123',
    agree: false,
    errorMessage: '',
  }),
  methods: {
    validate() {
      if (this.email.length === 0) {
        this.errorMessage = 'Требуется ввести Email';
        return false;
      }

      if (this.fullname.length === 0) {
        this.errorMessage = 'Требуется ввести полное имя';
        return false;
      }

      if (this.password.length === 0) {
        this.errorMessage = 'Требуется ввести пароль';
        return false;
      }

      if (this.passwordRepeat.length === 0) {
        this.errorMessage = 'Требуется повторить пароль';
        return false;
      }

      if (this.password !== this.passwordRepeat) {
        this.errorMessage = 'Пароли не совпадают';
        return false;
      }

      if (!this.agree) {
        this.errorMessage = 'Требуется согласиться с условиями';
        return false;
      }

      return true;
    },
    async submitHandler() {
      try {
        if (!this.validate()) {
          throw new Error(this.errorMessage);
        }
        const { id } = await register(this.email, this.fullname, this.password);
        alert(id);
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style scoped></style>
