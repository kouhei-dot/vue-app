<template>
  <b-overlay class="min-vh-100" :show="isLoading" spinner-type="grow" spinner-variant="info">
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
        <b-card class="mt-3 col-8 slide-fade-item" v-for="(todo, idx) in todoList" :key="`${todo.todoName}${idx}`">
          <div class="d-flex justify-content-between">
            <span class="font-weight-bold">
              <b-form-checkbox v-model="todo.isComplete" class="d-inline"></b-form-checkbox>
              {{ todo.todoName }}
            </span>
            <b-icon-x-circle-fill @click="removeTodo(idx)" role="button" shift-v="-3" />
          </div>
        </b-card>
      </transition-group>
    </div>
  </b-overlay>
</template>

<script lang="ts">
import Vue from 'vue'
import axios, { AxiosResponse } from 'axios';
import { getAuth } from '@firebase/auth';
import { firebase } from '@/plugin/firebase';
import { Todo, TodoRes } from '@/api/TodoApi';
import { BaseGetRes } from '@/api/BaseApi';

export default Vue.extend({
  name: 'Todo',
  data() {
    return {
      todo: '',
      todoList: [] as Todo[],
      isLoading: true,
    }
  },
  async beforeMount() {
    await this.getTodoList();
  },
  methods: {
    async getTodoList(): Promise<void> {
      const user = getAuth(firebase);
      try {
        if (user.currentUser) {
          const res: AxiosResponse<BaseGetRes<TodoRes>> =
            await axios.get(`https://mk26dyc437.execute-api.ap-northeast-1.amazonaws.com/dynamoTestFunc?uid=${user.currentUser.uid}`);
          const data = res.data;
          if (data.Items.length) this.todoList = data.Items[0].todoList;
        } else {
          return;
        }
      } catch (e) {
        this.$bvModal.msgBoxOk('データの取得に失敗しました。', {
          title: 'エラー',
          okVariant: 'danger',
        });
      } finally {
        this.isLoading = false;
      }
    },
    async addTodo(): Promise<void> {
      const user = getAuth(firebase);
      if (user.currentUser) {
        const params = {
          id: user.currentUser.uid,
          todoName: this.todo,
        };
        try {
          const res = await axios.post('https://mk26dyc437.execute-api.ap-northeast-1.amazonaws.com/dynamoTestFunc', params);
          if (res.status === 200) {
            this.todoList.push({
              todoName: this.todo,
              isComplete: false,
            });
            this.todo = '';
          } else {
            this.$bvToast.toast('データの送信に失敗しました', { variant: 'danger' });
          }
        } catch (e) {
          this.$bvToast.toast('データの送信に失敗しました', { variant: 'danger' });
        }
      }
    },
    async removeTodo(idx: number): Promise<void> {
      const user = getAuth(firebase);
      if (user.currentUser) {
        try {
          const res = await axios.delete(
            `https://mk26dyc437.execute-api.ap-northeast-1.amazonaws.com/dynamoTestFunc?uid=${user.currentUser.uid}&idx=${idx}`
          );
          if (res.status === 200) {
            this.todoList.splice(idx, 1);
          } else {
            this.$bvToast.toast('データの送信に失敗しました', { variant: 'danger' });
          }
        } catch (e) {
          this.$bvToast.toast('データの送信に失敗しました', { variant: 'danger' });
        }
      }
    },
  },
})
</script>

<style scoped>
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  position: absolute;
}
.slide-fade-item {
  transition: all .8s ease;
}

.bi-x-circle-fill {
  transition: all .2s  0s ease;
}
.bi-x-circle-fill:hover {
  transform: scale(1.5, 1.5);
}
</style>
