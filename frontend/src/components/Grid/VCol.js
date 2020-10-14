export default {
  functional: true,
  render(createElement, context) {
    const attrs = context.data.attrs || {};
    return createElement(
      'div',
      {
        class: [
          attrs.size || 'flex-1',
          'px-4',
        ],
      },
      context.children,
    );
  },
};
