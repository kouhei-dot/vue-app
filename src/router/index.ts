import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router'
import { firebase } from '@/plugin/firebase'
import { getAuth } from 'firebase/auth'
import Main from '../views/Main.vue'
import BitCoin from '@/components/BitCoin.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Error from '@/views/Error.vue'
import Todo from '@/views/Todo.vue'
import Qiita from '@/views/Qiita.vue'
import Board from '@/views/Board.vue'

Vue.use(VueRouter)

/** ルーティング前のログイン・メール認証済み判定 */
const guardFunc = async (_to: Route, _from: Route, next: NavigationGuardNext<Vue>): Promise<void> => {
  getAuth(firebase).onAuthStateChanged((user) => {
    if (!user) {
      router.push({
        name: 'error',
        params: { msg: 'ログインしてください' }
      });
    } else if (!user.emailVerified) {
      router.push({
        name: 'error',
        params: { msg: 'メール認証を完了させてください' }
      });
    }
    next();
  });
};

const routes: Array<RouteConfig> = [
  {
    path: '/qiita',
    component: Qiita,
    beforeEnter: guardFunc,
  },
  {
    path: '/todo',
    component: Todo,
    beforeEnter: guardFunc,
  },
  {
    path: '/top',
    component: Main,
    beforeEnter: guardFunc,
  },
  {
    path: '/board',
    component: Board,
    beforeEnter: guardFunc,
  },
  {
    path: '/bitcoin',
    component: BitCoin,
    beforeEnter: guardFunc,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/error',
    name: 'error',
    component: Error,
    props: true,
  },
  {
    path: '/',
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
