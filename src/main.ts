import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja.json'
import * as rules from 'vee-validate/dist/rules'
import '@/common/appFilters'
import mixin from '@/common/appMixin'
import AppActionBtn from '@/components/AppActionBtn.vue'

// BootstrapVueを使用するための宣言
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// 使用するコンポーネントの登録
Vue.component('validationObserver', ValidationObserver);
Vue.component('validationProvider', ValidationProvider);
Vue.component('appActionBtn', AppActionBtn);

Vue.mixin(mixin);

Vue.config.productionTip = false

// バリデーション言語の設定
localize('ja', ja);

// バリデーションルールの設定
for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  });
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
