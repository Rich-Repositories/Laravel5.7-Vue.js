import { mapActions } from 'vuex';
import { HTTP_UNPROCESSABLE_ENTITY } from '@/api/http-response-codes';

export default {

  name: 'SignupWrapper',

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
      callSignup: this.callSignup,
    });
  },

  methods: {
    ...mapActions('auth', [
      'signup',
    ]),
    togglePending(current) {
      this.pending = !current;
    },
    callSignup(data) {
      this.togglePending(this.pending);
      this.signup(data)
        .then(() => {
          this.togglePending(this.pending);
          this.$router.push('/login');
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
