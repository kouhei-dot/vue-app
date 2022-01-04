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
      <b-card class="mt-3 col-8" v-for="(todo, idx) in todoList" :key="idx">
        <div class="d-flex justify-content-between">
          <span class="font-weight-bold">
            <b-form-checkbox class="d-inline"></b-form-checkbox>
            {{ todo }}
          </span>
          <b-icon-x-circle-fill @click="removeTodo(idx)" role="button" scale="1" shift-v="-3" />
        </div>
      </b-card>
    </transition-group>
    <div class="mt-4">
      <h5>アイコン回転のアニメーション作ってみた</h5>
      <p class="text-muted">クリックすると回るよ</p>
      <b-icon-chevron-down role="button" scale="1.5" :class="isRotate ? 'up' : 'down'" @click="rotateIcon" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Todo',
  data() {
    return {
      todo: '',
      todoList: [] as string[],
      isRotate: false,
    }
  },
  methods: {
    async addTodo(): Promise<void> {
      this.todoList.push(this.todo);
      this.todo = '';
    },
    async removeTodo(idx: number): Promise<void> {
      this.todoList.splice(idx, 1);
    },
    rotateIcon(): void {
      this.isRotate = !this.isRotate
    },
  },
})
</script>

<style scoped>
.slide-fade-enter {
  transform: translateY(10px);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.bi-x-circle-fill {
  transition: all .2s  0s ease;
}
.bi-x-circle-fill:hover {
  transform: scale(1.5, 1.5);
}
.up {
  transform: rotate(-180deg);
  transition: all .4s 0s ease;
}
.down {
  transform: rotate(0deg);
  transition: all .4s 0s ease;
}
</style>
