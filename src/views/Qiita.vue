<template>
  <b-overlay class="min-vh-100" :show="isLoading" spinner-variant="info" spinner-type="grow">
    <h2>Qiitaの記事検索</h2>
    <!-- <div class="text-muted ml-3">フォームに文字を入力すると、リアルタイム検索します</div> -->
    <b-form-group label="検索" class="ml-3 mt-2">
      <b-form-input type="text" class="col-lg-8" v-model="searchText" />
    </b-form-group>
    <div class="mb-2 col-lg-8 d-flex justify-content-center">
      <app-action-btn @click="search">検索</app-action-btn>
    </div>
    <transition-group name="appear" tag="div">
      <div v-show="!isLoading" v-for="result in searchResults" :key="result.id">
        <a :href="result.url" target="_blank" rel="noopener noreferrer">{{ result.title }}</a>
      </div>
    </transition-group>
  </b-overlay>
</template>

<script lang="ts">
import axios, { AxiosDefaults } from 'axios';
import Vue from 'vue'

interface QiitaSearchRes {
  id: string;
  title: string;
  url: string;
}

export default Vue.extend({
  name: 'Qiita',
  data() {
    return {
      searchText: '',
      searchResults: [] as QiitaSearchRes[],
      isLoading: false,
    };
  },
  methods: {
    async search(): Promise<void> {
      try {
        this.isLoading = true;
        const res: AxiosDefaults<QiitaSearchRes[]> = await axios.get(`https://qiita.com/api/v2/items?query=${this.searchText}`);
        if (res.data) {
          this.searchResults = res.data;
        }
      } catch (e) {
        this.$bvModal.msgBoxOk('検索に失敗しました。お時間を少し空けてご利用ください。', {
          title: 'エラー',
          okVariant: 'danger',
        })
      } finally {
        this.isLoading = false;
      }
    },
  },
  watch: {
    searchText() {
      console.log('input');
    },
  },
})
</script>

<style scoped>
.appear-enter, .appear-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.appear-enter-active, .appear-leave-active {
  transition: all 1s ease;
}
</style>
