<template>
  <div class="col-6 m-auto">
    <b-card
      class="my-4"
      header="新規登録"
      header-bg-variant="dark"
      header-text-variant="light"
      header-class="font-weight-bold"
    >
      <b-card-body>
        <b-form>
          <b-form-group label="メールアドレス">
            <b-form-input type="text" v-model="email" />
          </b-form-group>
          <b-form-group label="パスワード">
            <b-form-input type="password" v-model="password" />
          </b-form-group>
          <b-form-group label="パスワード(確認)">
            <b-form-input type="password" v-model="password" />
          </b-form-group>
          <div class="d-flex justify-content-center">
            <b-button class="col-4" variant="success" pill>登録</b-button>
          </div>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
    };
  },
});
</script>
