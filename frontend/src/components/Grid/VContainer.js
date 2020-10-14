export default {
  functional: true,
  render(createElement, context) {
    return createElement('div', { class: ['container'] }, context.children);
  },
};
