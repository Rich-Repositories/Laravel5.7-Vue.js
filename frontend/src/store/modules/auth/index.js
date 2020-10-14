import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const auth = JSON.parse(window.localStorage.getItem('auth'));

const state = {
  user: null,
  expiresAt: auth ? auth.expiresAt : null,
  accessToken: auth ? auth.accessToken : null,
  status: {
    pending: false,
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
