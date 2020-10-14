<template>
  <div class="flex flex-1">
    <div class="container">
      <div class="flex flex-col">
        <div class="w-full my-8"/>
        <div class="w-full md:w-2/3 lg:w-1/2 mx-auto">
          <password-forgot-form
            :pending="pending"
            :res-errors="resErrors"
            @submit="$emit('request-password-reset-email', arguments[0])"/>
        </div>
        <div class="w-full my-8"/>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordForgotForm from './passwordForgot/Form.vue';

export default {
  name: 'PasswordForgot',
  components: {
    PasswordForgotForm,
  },
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
};
</script>
