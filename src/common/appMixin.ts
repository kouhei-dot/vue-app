import Vue from 'vue'
import { firebase } from '@/plugin/firebase'
import { getAuth } from 'firebase/auth'

export default Vue.extend({
  data() {
    return {
      isLogin: false,
      isMobile: false,
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
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
  methods: {
    async handleResize() {
      if (window.innerWidth <= 992) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },
});
