<template>
  <div>
    <b-card-group deck>
      <b-card :img-src="require('@/assets/markus-winkler-Q2J2qQsoYH8-unsplash.jpg')">
        <b-card-title>
          <router-link to="/todo">Todoリスト</router-link>
        </b-card-title>
        <b-card-body>
          <div>
            Todo管理を行うことが出来るページです。<br>
            バックエンドはAWS Lambda(Node.js)です。<br>
            DBはDynamoDBを使用してます。
          </div>
        </b-card-body>
      </b-card>
      <b-card :img-src="require('@/assets/pierre-borthiry-vBCVcWUyvyM-unsplash.jpg')">
        <b-card-title>
          <router-link to="/bitcoin">ビットコインレート一覧</router-link>
        </b-card-title>
        <b-card-body>
          <div>CoindeskというwebAPIを用いてビットコインレートの一覧を取得するページです。</div>
        </b-card-body>
      </b-card>
      <b-card :img-src="require('@/assets/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg')">
        <b-card-title>
          <router-link to="/qiita">Qiitaの記事検索</router-link>
        </b-card-title>
        <b-card-body>
          <div>
            QiitaAPIというwebAPIを用いて、Qiita内の記事の検索を行うことができるページです。<br>
            <span class="text-danger">APIに負荷をかけないように、短時間で過度な回数の検索はお控え下さい。</span>
          </div>
        </b-card-body>
      </b-card>
      <b-card :img-src="require('@/assets/eden-constantino-OXmym9cuaEY-unsplash.jpg')">
        <b-card-title>
          <router-link to="/board">ボード型タスク管理</router-link>
        </b-card-title>
        <b-card-body>
          <div>Trelloみたいな感じでタスク管理を行えるページです。</div>
        </b-card-body>
      </b-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Main',
});
</script>
