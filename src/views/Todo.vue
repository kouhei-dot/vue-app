<template>
  <div class="col-8">
    <h1 class="mb-4">My Todo List</h1>
    <validation-observer v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addTodo)">
        <validation-provider name="Todo" rules="required">
          <b-form-group label="Todo">
            <b-form-input type="text" v-model="todo" />
          </b-form-group>
        </validation-provider>
        <div class="d-flex flex-row-reverse">
          <app-action-btn type="submit">追加</app-action-btn>
        </div>
      </b-form>
    </validation-observer>
    <h2 class="mt-4">My Todo</h2>
    <transition-group name="slide-fade" tag="div">
      <b-card class="mt-3 col-8" v-for="(todo, idx) in todoList" :key="`${idx}${todo}`">
        <div class="d-flex justify-content-between">
          <span class="font-weight-bold">
            <b-form-checkbox class="d-inline"></b-form-checkbox>
            {{ todo }}
          </span>
          <b-icon-x-circle-fill @click="removeTodo(idx)" role="button" shift-v="-3" />
        </div>
      </b-card>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios, { AxiosResponse } from 'axios';
import { firebase } from '@/plugin/firebase';
import { getAuth } from '@firebase/auth';
import { mount } from '@vue/test-utils';

interface TodoRes {
  Items: {
    id: number;
    userId: string;
    skill: string[];
  }[];
}

export default Vue.extend({
  name: 'Todo',
  data() {
    return {
      todo: '',
      todoList: [] as string[],
    }
  },
  async beforeMount() {
    const res: AxiosResponse<TodoRes> = await axios.get('https://mk26dyc437.execute-api.ap-northeast-1.amazonaws.com/dynamoTestFunc?TableName=todos');
    const data = res.data;
    this.todoList = data.Items[0].skill;
  },
  methods: {
    async addTodo(): Promise<void> {
      // const user = getAuth(firebase).currentUser
      // if (user) {
      //   const data = {
      //     userId: user.uid,
      //     todo: this.todo,
      //   };
      //   try {
      //     await axios.post('https://mk26dyc437.execute-api.ap-northeast-1.amazonaws.com/dynamoTestFunc', data);
      //     this.$bvModal.msgBoxOk('', {
      //       title: '完了',
      //       okVariant: 'success',
      //     });
      //   } catch (e) {
      //     this.$bvModal.msgBoxOk('操作が完了しませんでした。もう一度やり直してください。', {
      //       title: 'エラー',
      //       okVariant: 'warning',
      //     });
      //   }
      // } else {
      //   this.$bvModal.msgBoxOk('ログインしていません。お手数ですが、再度ログインしてください。', {
      //     title: 'エラー',
      //     okVariant: 'warning',
      //   }).then(() => this.$router.push('/'));
      // }
      this.todoList.push(this.todo);
      this.todo = '';
    },
    async removeTodo(idx: number): Promise<void> {
      this.todoList.splice(idx, 1);
    },
  },
})
</script>

<style scoped>
.slide-fade-enter, .slide-fade-leave {
  transform: translateY(10px);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all 3.0s ease;
}
.bi-x-circle-fill {
  transition: all .2s  0s ease;
}
.bi-x-circle-fill:hover {
  transform: scale(1.5, 1.5);
}
</style>
