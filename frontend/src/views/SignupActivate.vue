<template>
  <div class="flex flex-1">
    <div class="container">
      <div class="flex flex-col">
        <div class="w-full my-8"/>
        <div
          v-if="activated"
          class="w-full md:w-2/3 lg:w-1/2 mx-auto">
          <h3 class="text-success font-light">Account activated!</h3>
          <div class="my-4"/>
          <p class="text-grey-darkest">You have succesfully activated your account.
          If you are not automatically redirected within 15 seconds,
          click "Continue to Login Page" to proceed.</p>
          <div class="my-8"/>
          <router-link
            to="/login" class="btn btn--theme-brand"
            replace>Continue to Login Page</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupActivate',
  props: {
    token: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      activated: false,
    };
  },
  created() {
    this.$store.dispatch('auth/activate', this.token)
      .then(() => {
        this.activated = true;
        window.setTimeout(this.goToLoginPage, 15000);
      })
      .catch(() => {
        this.$router.push('/');
      });
  },
  methods: {
    goToLoginPage() {
      this.$router.replace('/login');
    },
  },
};
</script>
