import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import VeeValidate from 'vee-validate';

import App from './App.vue';
import router from './router';
import store from './store';

Raven
  .config(process.env.VUE_APP_SENTRY_DSN)
  .addPlugin(RavenVue, Vue)
  .install();

Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
