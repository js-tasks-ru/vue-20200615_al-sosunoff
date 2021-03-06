import Vue from 'vue';
import VueRouter from 'vue-router';
import IndexPage from '../views/IndexPage';
import LoginPage from '../views/LoginPage';
import RegisterPage from '../views/RegisterPage';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL + '/4-module-4-task/',
  routes: [
    {
      path: '/',
      component: IndexPage,
    },
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/register',
      component: RegisterPage,
    },
  ],
});
