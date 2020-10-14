<template>
  <form
    data-vv-scope="forgotPassword"
    @submit.prevent="onSubmit('forgotPassword')">
    <div class="card card--theme-secondary">
      <div class="card__header"><h5 class="font-light">Password Forgot</h5></div>
      <div class="card__body">
        <div class="w-full">
          <div class="field">
            <label
              for="forgotPasswordEmail"
              class="field__label">Email</label>
            <input
              v-validate="'required|email'"
              id="forgotPasswordEmail"
              v-model="email"
              :disabled="pending"
              :class="{ 'field__control--has-error': errors.has('forgotPassword.email') }"
              type="email"
              name="email"
              class="field__control">
            <div
              v-show="errors.has('forgotPassword.email')"
              class="field__feedback field__feedback--is-error">
              {{ errors.first('forgotPassword.email') }}
            </div>
          </div>
        </div>
      </div>
      <div class="card__body">
        <div class="flex-inline w-full text-right">
          <button
            :disabled="pending"
            class="btn btn--theme-brand ml-4">Submit</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {

  name: 'Form',

  props: {
    pending: {
      type: Boolean,
      default: false,
    },
    resErrors: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      email: '',
    };
  },

  watch: {
    resErrors: {
      handler(errors) {
        Object
          .keys(errors)
          .forEach((error) => {
            this.errors.add({
              field: error,
              msg: errors[error][0],
              scope: 'forgotPassword',
            });
          });
      },
      deep: true,
    },
  },

  methods: {
    onSubmit(scope) {
      this.$validator.validateAll(scope)
        .then((result) => {
          if (result) {
            this.$emit('submit', this.email);
          }
        });
    },
  },

};
</script>
