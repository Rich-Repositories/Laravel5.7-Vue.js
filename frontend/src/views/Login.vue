<template>
  <div class="flex flex-1">
    <div class="container">
      <div class="flex flex-col">
        <div class="w-full my-8"/>
        <div class="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
          <login-wrapper>
            <login-form
              slot-scope="{ callLogin, pending, resErrors }"
              :res-errors="resErrors"
              :pending="pending"
              @submit="callLogin"/>
          </login-wrapper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginWrapper from '@/wrappers/LoginWrapper';
import LoginForm from './login/Form.vue';

export default {

  name: 'Login',

  components: {
    LoginWrapper,
    LoginForm,
  },

};
</script>
