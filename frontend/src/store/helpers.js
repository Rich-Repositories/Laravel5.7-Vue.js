/* eslint-disable no-param-reassign */
export const setEntity = type => (state, entity) => {
  Object
    .keys(entity)
    .forEach((id) => {
      const oldObj = state[type].byId[id] || {};
      // Merge the new data in the old object
      const newObj = Object.assign({}, oldObj, entity[id]);
      // Make sure new entities are also reactive
      state[type].byId = { ...state[type].byId, [id]: newObj };
    });
};
/* eslint-enable no-param-reassign */

export const setProp = prop => (state, value) => {
  const path = prop.split('.');
  const objProp = path.pop();
  let obj = state;
  obj = path.reduce((o, i) => o[i], state);
  obj[objProp] = value;
};

// export const setProp = prop => (state, value) => {
//   if (value !== null && typeof value === 'object' && value.constructor === Object) {
//     Object
//       .keys(value)
//       .forEach((key) => {
//         const oldObj = state[prop][key] || {};
//         // Merge the new data in the old object
//         const newObj = Object.assign({}, oldObj, value[key]);
//         // Make sure new entities are also reactive
//         state[prop] = { ...state[prop], [key]: newObj };
//       });
//     return;
//   }
//   state[prop] = value;
// };
