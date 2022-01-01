import Vue from 'vue'
import { firebase } from '@/plugin/firebase'
import { getAuth } from 'firebase/auth'

export default Vue.extend({
  data() {
    return {
      isLogin: false,
    };
  },
  beforeMount() {
    getAuth(firebase).onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  },
});
