<template>
  <div class="d-flex justify-content-between mb-4 bg-dark" v-if="isLogin">
    <router-link to="/top" :tag="isMobile ? 'h3' : 'h2'" role="link" class="text-light ml-2">Vue.js Demo App</router-link>
    <div class="link-container" v-show="!isMobile">
      <router-link to="/bitcoin">ビットコインレート一覧</router-link>
      <router-link to="/todo">Todoリスト</router-link>
      <router-link to="/qiita">Qiitaの記事検索</router-link>
      <router-link to="/board">ボード型タスク管理</router-link>
      <b-button variant="dark" pill class="mr-2 my-2" @click="logout">ログアウト</b-button>
    </div>
    <div v-show="isMobile">
      <b-button variant="dark" pill class="mr-2 my-2" @click="logout">ログアウト</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import appMixin from '@/common/appMixin';
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
  mixins: [appMixin],
})
</script>

<style scoped>
.link-container > a {
  margin: 1.5rem 0.75rem;
}
h2, h3 {
  cursor: pointer;
}
</style>
