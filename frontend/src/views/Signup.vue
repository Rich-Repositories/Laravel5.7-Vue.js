<template>
  <div class="flex flex-1">
    <div class="container">
      <div class="flex flex-col">
        <div class="w-full my-8"/>
        <div class="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
          <signup-wrapper>
            <signup-form
              slot-scope="{ callSignup, pending, resErrors }"
              :res-errors="resErrors"
              :pending="pending"
              @submit="callSignup"/>
          </signup-wrapper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignupWrapper from '@/wrappers/SignupWrapper';
import SignupForm from './signup/Form.vue';

export default {

  name: 'Signup',

  components: {
    SignupWrapper,
    SignupForm,
  },

};
</script>
