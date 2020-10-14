export default {
  functional: true,
  render(createElement, context) {
    return createElement(
      `h${context.props.level}`,
      {
        class: ['font-light', 'text-brand', 'text-center'],
      },
      context.children,
    );
  },
  props: {
    level: {
      type: Number,
      default: 1,
    },
  },
};
