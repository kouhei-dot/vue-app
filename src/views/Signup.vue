<template>
  <div class="col-8 m-auto">
    <b-card
      class="my-4"
      header="新規登録"
      header-bg-variant="dark"
      header-text-variant="light"
      header-class="font-weight-bold"
    >
      <b-card-body>
        <validation-observer v-slot="{ handleSubmit, invalid }">
          <b-form @submit.prevent="handleSubmit(signup)">
            <validation-provider name="メールアドレス" :rules="{ required: true, email: true }" v-slot="context">
              <b-form-group label="メールアドレス">
                <b-form-input type="text" v-model="email" :state="context | validState" />
                <b-form-invalid-feedback>{{ context.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <validation-provider
              vid="comfirmation"
              name="パスワード"
              :rules="{
                required: true,
                min: 8,
                regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])[a-zA-Z\d]*$/,
              }"
              v-slot="context"
            >
              <b-form-group label="パスワード">
                <b-form-input type="password" v-model="password" :state="context | validState" />
                <b-form-invalid-feedback>{{ context.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <validation-provider
              name="パスワード(確認)"
              :rules="{
                required: true,
                min: 8,
                regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])[a-zA-Z\d]*$/,
                confirmed: 'comfirmation',
              }"
              v-slot="context"
            >
              <b-form-group label="パスワード(確認)">
                <b-form-input type="password" v-model="passwordConfirm" :state="context | validState" />
                <b-form-invalid-feedback>{{ context.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <div class="d-flex justify-content-center">
              <app-action-btn type="submit" :invalid="invalid">登録</app-action-btn>
            </div>
          </b-form>
        </validation-observer>
      </b-card-body>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { firebase } from '@/plugin/firebase';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

export default Vue.extend({
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      isError: false,
    };
  },
  methods: {
    async signup() {
      const auth = getAuth(firebase);
      try {
        const res = await createUserWithEmailAndPassword(auth, this.email, this.password);
        if (res.user) {
          const domain = document.domain;
          const port = window.location.port;
          const actionSetting = { url: `http://${domain}:${port}/` }
          await sendEmailVerification(res.user, actionSetting);
          await this.$bvModal.msgBoxOk('入力されたメールアドレス宛にメールを送信しました。', {
            title: '登録まであと少しです!',
            okVariant: 'success',
          }).then(() => this.$router.push('/'));
        } else {
          this.isError = true;
        }
      } catch (e) {
        this.isError = true;
      }
    },
  },
});
</script>
