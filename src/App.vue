<template>
  <v-app>
    <v-main>
      <ToBuyLists/>
    </v-main>
  </v-app>
</template>

<script>
import ToBuyLists from './components/HomePage';

export default {
  name: 'App',

  components: {
    ToBuyLists,
  },

  data: () => ({
    //
  }),
};
</script>
