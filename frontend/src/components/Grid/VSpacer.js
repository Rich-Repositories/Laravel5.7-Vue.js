export default {
  functional: true,
  methods: {
    getAmount(attrs) {
      switch (true) {
        case attrs.xl !== undefined: return 'my-8';
        case attrs.lg !== undefined: return 'my-6';
        case attrs.md !== undefined: return 'my-4';
        case attrs.sm !== undefined: return 'my-2';
        default: return '';
      }
    },
  },
  render(createElement, context) {
    const getAmount = () => {
      const attrs = context.data.attrs || {};
      switch (true) {
        case attrs.xl !== undefined: return 'my-8';
        case attrs.lg !== undefined: return 'my-6';
        case attrs.md !== undefined: return 'my-4';
        case attrs.sm !== undefined: return 'my-2';
        default: return '';
      }
    };

    return createElement(
      'div',
      {
        class: [
          getAmount(),
        ],
      },
      context.children,
    );
  },
};
