<template>
  <div class="Main">
    <BitCoin></BitCoin>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BitCoin from '@/components/BitCoin.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'Main',
  components: {
    BitCoin,
  },
});
</script>
