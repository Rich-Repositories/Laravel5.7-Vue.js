export default {
  getEntityById: state => (type, id) => {
    if (!state[type]) return null;
    return state[type].byId[id] || null;
  },
};
