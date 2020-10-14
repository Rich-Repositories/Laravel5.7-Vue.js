import { mapActions } from 'vuex';
import { HTTP_UNPROCESSABLE_ENTITY, HTTP_UNAUTHORIZED } from '@/api/http-response-codes';

export default {

  name: 'LoginWrapper',

  data() {
    return {
      pending: false,
      resErrors: null,
    };
  },

  render() {
    return this.$scopedSlots.default({
      pending: this.pending,
      resErrors: this.resErrors,
      callLogin: this.callLogin,
    });
  },

  methods: {
    ...mapActions('auth', [
      'login',
    ]),
    togglePending(current) {
      this.pending = !current;
    },
    callLogin(data) {
      this.togglePending(this.pending);
      this.login(data)
        .then(() => {
          this.togglePending(this.pending);
          this.$router.replace('/');
        })
        .catch((error) => {
          if (error.status === HTTP_UNPROCESSABLE_ENTITY) {
            this.resErrors = error.data.errors;
          }
          this.togglePending(this.pending);
        });
    },
  },

};
