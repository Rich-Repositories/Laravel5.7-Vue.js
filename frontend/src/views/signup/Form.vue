<template>
  <form
    data-vv-scope="signup"
    @submit.prevent="onSubmit('signup')">
    <div class="card card--theme-secondary">
      <div class="card__header">
        <h4 class="text-brand font-light">Signup</h4>
        <p class="text-grey-dark">Please fill this form to create an account</p>
      </div>
      <div class="card__body">
        <div class="flex -mx-3 mb-4">
          <div class="w-1/2 px-3">
            <div class="field">
              <label
                for="signupFirstName"
                class="field__label">First Name</label>
              <input
                v-validate="'required'"
                id="signupFirstName"
                v-model="credentials.firstName"
                :disabled="pending"
                :class="{ 'field__control--has-error': errors.has('signup.firstName') }"
                type="text"
                name="firstName"
                class="field__control">
              <div
                v-show="errors.has('signup.firstName')"
                class="field__feedback field__feedback--is-error">
                {{ errors.first('signup.firstName') }}
              </div>
            </div>
          </div>
          <div class="w-1/2 px-3">
            <div class="field">
              <label
                for="signupLastName"
                class="field__label">Last Name</label>
              <input
                v-validate="'required'"
                id="signupLastName"
                v-model="credentials.lastName"
                :disabled="pending"
                :class="{ 'field__control--has-error': errors.has('signup.lastName') }"
                type="text"
                name="lastName"
                class="field__control">
              <div
                v-show="errors.has('signup.lastName')"
                class="field__feedback field__feedback--is-error">
                {{ errors.first('signup.lastName') }}
              </div>
            </div>
          </div>
        </div>
        <div class="w-full">
          <div class="field">
            <label
              for="signupEmail"
              class="field__label">Email</label>
            <input
              v-validate="'required|email'"
              id="signupEmail"
              v-model="credentials.email"
              :disabled="pending"
              :class="{ 'field__control--has-error': errors.has('signup.email') }"
              type="email"
              name="email"
              class="field__control">
            <div
              v-show="errors.has('signup.email')"
              class="field__feedback field__feedback--is-error">
              {{ errors.first('signup.email') }}
            </div>
          </div>
          <div class="field">
            <label
              for="signupPassword"
              class="field__label">Password</label>
            <input
              v-validate="'required|confirmed:passwordConfirmation'"
              id="signupPassword"
              v-model="credentials.password"
              :disabled="pending"
              :class="{ 'field__control--has-error': errors.has('signup.password') }"
              type="password"
              name="password"
              class="field__control">
            <div
              v-show="errors.has('signup.password')"
              class="field__feedback field__feedback--is-error">
              {{ errors.first('signup.password') }}
            </div>
          </div>
          <div class="field">
            <label
              for="signupPasswordConfirmation"
              class="field__label">Password Confirmation</label>
            <input
              id="signupPasswordConfirmation"
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
            class="btn btn--theme-brand ml-4">Signup</button>
        </div>
      </div>
      <div class="card__body text-center text-sm">
        <span class="text-grey-dark">Already a member? </span>
        <router-link to="/login">Login</router-link>
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
        firstName: '',
        lastName: '',
        email: '',
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
              scope: 'signup',
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
