<template>
  <b-overlay class="min-vh-100" :show="isLoading" spinner-type="grow" spinner-variant="info">
    <div class="col-lg-8 m-auto">
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
            <app-action-btn @click="toSignup">新規登録</app-action-btn>
          </div>
          <validation-observer v-slot="{ handleSubmit, invalid }">
            <b-form @submit.prevent="handleSubmit(login)">
              <validation-provider name="メールアドレス" :rules="{ required: true, email: true }" v-slot="context">
                <b-form-group label="メールアドレス">
                  <b-form-input type="text" v-model="email" :state="context | validState" />
                  <b-form-invalid-feedback>{{ context.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider
                name="パスワード"
                :rules="{
                  required: true,
                  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])[a-zA-Z\d]*$/,
                  min: 8
                }"
                v-slot="context"
              >
                <b-form-group label="パスワード">
                  <b-form-input type="password" v-model="password" :state="context | validState" />
                  <b-form-invalid-feedback>{{ context.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <div class="d-flex justify-content-center">
                <template v-if="isLogin">
                  <app-action-btn @click="$router.push('/top')">トップへ</app-action-btn>
                </template>
                <template v-else>
                  <app-action-btn type="submit" :invalid="invalid">ログイン</app-action-btn>
                </template>
              </div>
            </b-form>
          </validation-observer>
        </b-card-body>
      </b-card>
    </div>
  </b-overlay>
</template>

<script lang="ts">
import Vue from 'vue';
import appMixin from '@/common/appMixin';
import { firebase } from '@/plugin/firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      isError: false,
      isLoading: false,
    };
  },
  methods: {
    async toSignup(): Promise<void> {
      await this.$router.push('/signup');
    },
    async login() {
      this.isLoading = true;
      const auth = getAuth(firebase);
      try {
        const res = await signInWithEmailAndPassword(auth, this.email, this.password);
        if (res.user) {
          this.$router.push('/top');
          if (res.user.emailVerified) {
            this.$emit('login', 'ログインしました');
          }
        }
      } catch (e) {
        console.log(e);
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
  mixins: [appMixin],
});
</script>
