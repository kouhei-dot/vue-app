<template>
  <div class="Main">
    <b-card>
      <b-card-title>
        <router-link to="/bitcoin">ビットコインレート一覧</router-link>
      </b-card-title>
    </b-card>
    <b-card>
      <b-card-title>
        <router-link to="/login">ログイン</router-link>
      </b-card-title>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Main',
});
</script>
