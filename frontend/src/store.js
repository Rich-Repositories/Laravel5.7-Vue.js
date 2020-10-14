import Vue from 'vue';
import Vuex from 'vuex';
import auth from './store/modules/auth';
import passwordReset from './store/modules/passwordReset';
import entities from './store/entities';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    auth,
    entities,
    passwordReset,
  },
});
