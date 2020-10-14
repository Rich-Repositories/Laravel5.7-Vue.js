export default {
  functional: true,
  render(createElement, context) {
    const attrs = context.data.attrs || {};
    return createElement(
      'div',
      {
        class: [
          'flex',
          ...(attrs.flow !== undefined && attrs.flow === 'vertical' ? ['flex-col'] : ['']),
          '-mx-4',
          'px-4',
        ],
      },
      context.children,
    );
  },
};
