<template>
  <div id="app">
    <Header @logout="showToast"></Header>
    <router-view @signup="showToast" @login="showToast" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '@/components/header.vue'

export default Vue.extend({
  name: 'app',
  components: { Header },
  methods: {
    async showToast(msg: string) {
      this.$bvToast.toast(msg, {
        variant: 'info',
        autoHideDelay: 3000,
      });
    },
  },
})
</script>

<style>
html, body, #app {
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
