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
        <validation-observer v-slot="{ handleSubmit, invalid }">
          <b-form @submit.prevent="handleSubmit(signup)">
            <validation-provider name="メールアドレス" :rules="{ required: true, email: true }" v-slot="context">
              <b-form-group label="メールアドレス">
                <b-form-input type="text" v-model="email" :state="context | validState" />
                <b-form-invalid-feedback>{{ context.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <validation-provider name="パスワード" :rules="{ required: true, min: 8 }" v-slot="context">
              <b-form-group label="パスワード">
                <b-form-input type="password" v-model="password" :state="context | validState" />
                <b-form-invalid-feedback>{{ context.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <validation-provider name="パスワード(確認)" :rules="{ required: true, min: 8 }" v-slot="context">
              <b-form-group label="パスワード(確認)">
                <b-form-input type="password" v-model="passwordConfirm" :state="context | validState" />
                <b-form-invalid-feedback>{{ context.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <div class="d-flex justify-content-center">
              <b-button
                class="col-4"
                type="submit"
                :disabled="invalid"
                :variant="invalid ? 'secondary' : 'success'"
                pill
              >
                登録
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
import { CognitoIdentity } from 'aws-sdk';

export default Vue.extend({
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
    };
  },
  methods: {
    async signup() {
      const auth = getAuth(firebase);
      const res = await createUserWithEmailAndPassword(auth, this.email, this.password);
      if (res.user) {
        this.$router.push('/top');
        this.$emit('signup', '登録が完了しました');
      } else {
        this.isError = true;
      }
    },
  },
});
</script>
