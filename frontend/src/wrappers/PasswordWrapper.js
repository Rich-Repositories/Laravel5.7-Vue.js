import { mapState, mapActions } from 'vuex';

export default {
  name: 'PasswordWrapper',
  data() {
    return {
      resErrors: {},
    };
  },
  computed: {
    ...mapState('passwordReset', {
      pending: state => state.status.pending,
    }),
  },
  methods: {
    ...mapActions('passwordReset', [
      'sendEmail',
      'findToken',
      'reset',
    ]),
    passwordResetEmail(email) {
      this.sendEmail(email)
        .then(() => Promise.resolve())
        .catch(({ data = {} }) => {
          this.resErrors = { ...this.resErrors, email: [data.message || ''] };
        });
    },
    passwordResetToken(token) {
      this.findToken(token)
        .then(() => Promise.resolve())
        .catch(() => {
          this.$router.push({ name: 'password.forgot' });
        });
    },
    passwordReset(credentials) {
      this.reset(credentials)
        .then(() => this.$router.push({ name: 'login' }))
        .catch(() => Promise.reject());
    },
  },
  render(h) {
    return h(
      'router-view',
      {
        attrs: {
          pending: this.pending,
          resErrors: this.resErrors,
        },
        on: {
          'request-password-reset-email': this.passwordResetEmail,
          'request-password-reset-token': this.passwordResetToken,
          'request-password-reset': this.passwordReset,
        },
      },
    );
  },
};
