<template>
  <div class="d-flex flex-row-reverse mb-2" v-if="isLogin">
    <b-button variant="dark" pill class="mr-2 mt-2" @click="logout">ログアウト</b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { firebase } from '@/plugin/firebase'
import { getAuth } from '@firebase/auth'

export default Vue.extend({
  name: 'Header',
  methods: {
    /** ログアウト処理 */
    async logout() {
      // firebaseのログアウト処理
      await getAuth(firebase).signOut();

      // ログイン画面に遷移させる
      this.$router.push('/');

      // 親コンポーネントにログアウトしたことを通知する
      this.$emit('logout', 'ログアウトしました');
    },
  },
})
</script>
