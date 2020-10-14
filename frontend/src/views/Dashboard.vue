<template>
  <div class="dashboard">
    <v-container>
      <v-row>
        <navigation/>
      </v-row>
    </v-container>
    <v-container>
      <v-row flow="vertical">
        <v-spacer xl/>
        <v-col>
          <heading>Dashboard Page</heading>
        </v-col>
        <v-spacer xl/>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import VContainer from '@/components/Grid/VContainer';
import VRow from '@/components/Grid/VRow';
import VCol from '@/components/Grid/VCol';
import VSpacer from '@/components/Grid/VSpacer';
import Heading from '@/components/Typography/Heading';
import Navigation from './dashboard/Navigation.vue';

export default {
  name: 'Dashboard',
  components: {
    VContainer,
    VRow,
    VCol,
    VSpacer,
    Heading,
    Navigation,
  },
};
</script>
