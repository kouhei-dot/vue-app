import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

// BootstrapVueを使用するための宣言
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.component('validationObserver', ValidationObserver);
Vue.component('validationProvider', ValidationProvider);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
