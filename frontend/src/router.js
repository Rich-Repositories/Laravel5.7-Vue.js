import Vue from 'vue';
import Router from 'vue-router';
import { requireAuth, requireGuest } from './router/helpers';
import Landing from './views/Landing.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
      beforeEnter: requireGuest,
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "auth" */ './views/Signup.vue'),
    },
    {
      path: '/signup/activate/:token',
      name: 'signup.activate',
      component: () => import(/* webpackChunkName: "auth" */ './views/SignupActivate.vue'),
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "auth" */ './views/Login.vue'),
    },
    {
      path: '/password',
      name: 'password',
      component: () => import(/* webpackChunkName: "auth" */ './wrappers/PasswordWrapper.js'),
      redirect: { name: 'password.forgot' },
      children: [
        {
          path: 'forgot',
          name: 'password.forgot',
          component: () => import(/* webpackChunkName: "auth" */ './views/PasswordForgot.vue'),
        },
        {
          path: 'reset',
          name: 'password.reset',
          component: () => import(/* webpackChunkName: "auth" */ './views/PasswordReset.vue'),
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
      beforeEnter: requireAuth,
    },
    { path: '*', redirect: '/' },
  ],
});
