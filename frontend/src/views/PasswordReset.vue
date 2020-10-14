<template>
  <div class="flex flex-1">
    <div class="container">
      <div class="flex flex-col">
        <div class="w-full my-8"/>
        <div class="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
          <password-reset-form
            :pending="pending"
            @submit="$emit('request-password-reset', arguments[0])"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordResetForm from './passwordReset/Form.vue';

export default {
  name: 'PasswordReset',
  components: {
    PasswordResetForm,
  },
  props: {
    pending: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    const { token = null } = this.$route.query;
    if (token) {
      return this.$emit('request-password-reset-token', token);
    }
    return this.$router.push({ name: 'password.forgot' });
  },
};
</script>
