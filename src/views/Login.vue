<template>
  <div class="col-6 m-auto">
    <b-card
      class="mt-4"
      header="ログイン"
      header-bg-variant="dark"
      header-text-variant="light"
      header-class="font-weight-bold"
    >
      <b-card-body>
        <b-alert v-model="isError" fade variant="info">ログインに失敗しました</b-alert>
        <div class="d-flex flex-row-reverse">
          <b-button class="col-3" variant="success" pill @click="toSignup">新規登録</b-button>
        </div>
        <validation-observer v-slot="{ handleSubmit, invalid }">
          <b-form @submit.prevent="handleSubmit(login)">
            <validation-provider name="メールアドレス" :rules="{ required: true, email: true }" v-slot="context">
              <b-form-group label="メールアドレス">
                <b-form-input type="text" v-model="email" :state="context | validState" />
                <b-form-invalid-feedback>{{ context.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <validation-provider name="パスワード" :rules="{ required: true }" v-slot="context">
              <b-form-group label="パスワード">
                <b-form-input type="password" v-model="password" :state="context | validState" />
                <b-form-invalid-feedback>{{ context.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <div class="d-flex justify-content-center">
              <b-button
                class="col-4"
                type="submit"
                :variant="invalid ? 'secondary' : 'success'"
                :disabled="invalid"
                pill
              >
                ログイン
              </b-button>
            </div>
          </b-form>
        </validation-observer>
      </b-card-body>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async toSignup(): Promise<void> {
      await this.$router.push('/signup');
    },
    async login() {
      alert('Login!!');
    },
  },
});
</script>
