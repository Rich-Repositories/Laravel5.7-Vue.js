import actions from './actions';
import mutations from './mutations';

const state = {
  email: null,
  token: null,
  status: {
    pending: false,
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
