export default {
  user: (state, getters, rootState, rootGetters) => {
    if (!state.user) return null;
    return rootGetters['entities/getEntityById']('users', state.user);
  },
  isAuthenticated: state => state.accessToken !== null,
};
