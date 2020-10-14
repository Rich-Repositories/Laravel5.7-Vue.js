<template>
  <form
    data-vv-scope="login"
    @submit.prevent="onSubmit('login')">
    <div class="card card--theme-secondary">
      <div class="card__header">
        <h4 class="text-brand font-light">Login</h4>
        <p class="text-grey-dark">Welcome back</p>
      </div>
      <div class="card__body">
        <div class="w-full">
          <div class="field">
            <label
              for="login_email"
              class="field__label">Email</label>
            <input
              v-validate="'required|email'"
              id="login_email"
              v-model="credentials.email"
              :disabled="pending"
              :class="{ 'field__control--has-error': errors.has('login.email') }"
              type="email"
              name="email"
              class="field__control">
            <div
              v-show="errors.has('login.email')"
              class="field__feedback field__feedback--is-error">
              {{ errors.first('login.email') }}
            </div>
          </div>
          <div class="field">
            <label
              for="login_password"
              class="field__label">Password</label>
            <input
              v-validate="'required'"
              id="login_password"
              v-model="credentials.password"
              :disabled="pending"
              :class="{ 'field__control--has-error': errors.has('login.password') }"
              type="password"
              name="password"
              class="field__control">
            <div
              v-show="errors.has('login.password')"
              class="field__feedback field__feedback--is-error">
              {{ errors.first('login.password') }}
            </div>
          </div>
        </div>
      </div>
      <div class="card__body">
        <div class="flex-inline w-full text-right">
          <router-link
            to="/password/forgot"
            class="text-sm">Forgot Password?</router-link>
          <button
            :disabled="pending"
            class="btn btn--theme-brand ml-4">Login</button>
        </div>
      </div>
      <div class="card__body text-center text-sm">
        <span class="text-grey-dark">Not a member? </span>
        <router-link to="/signup">Signup</router-link>
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
        email: '',
        password: '',
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
              scope: 'login',
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
