<template>
  <form
    data-vv-scope="passwordReset"
    @submit.prevent="onSubmit('passwordReset')">
    <div class="card card--theme-secondary">
      <div class="card__header"><h5 class="font-light">Password Reset</h5></div>
      <div class="card__body">
        <div class="w-full">
          <div class="field">
            <label
              for="passwordResetPassword"
              class="field__label">Password</label>
            <input
              v-validate="'required|confirmed:passwordConfirmation'"
              id="passwordResetPassword"
              v-model="credentials.password"
              :disabled="pending"
              :class="{ 'field__control--has-error': errors.has('passwordReset.password') }"
              type="password"
              name="password"
              class="field__control">
            <div
              v-show="errors.has('passwordReset.password')"
              class="field__feedback field__feedback--is-error">
              {{ errors.first('passwordReset.password') }}
            </div>
          </div>
          <div class="field">
            <label
              for="passwordResetPasswordConfirmation"
              class="field__label">Confirm Password</label>
            <input
              id="passwordResetPasswordConfirmation"
              ref="passwordConfirmation"
              v-model="credentials.passwordConfirmation"
              :disabled="pending"
              type="password"
              name="passwordConfirmation"
              class="field__control">
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
      credentials: {
        password: '',
        passwordConfirmation: '',
      },
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
              scope: 'passwordReset',
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
            this.$emit('submit', { ...this.credentials });
          }
        });
    },
  },

};
</script>
