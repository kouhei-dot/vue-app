<template>
  <div class="text-center">
    <h2 class="mb-4">This is a board application.</h2>
    <validation-provider name="タスク" rules="required" v-slot="context">
      <b-form @submit.prevent="addTask">
        <b-form-group class="col-lg-6 mx-auto">
          <b-form-input v-model="newTask" placeholder="新しいタスクを追加" type="text" :state="context | validState" />
          <b-form-invalid-feedback class="text-left">{{ context.errors[0] }}</b-form-invalid-feedback>
        </b-form-group>
        <app-action-btn type="submit" :invalid="context.invalid" class="mb-2">追加</app-action-btn>
      </b-form>
    </validation-provider>
    <div class="d-flex mb-4">
      <div class="col-lg-4 mx-auto">
        <b-card
          header="Todo"
          header-bg-variant="dark"
          header-text-variant="white"
          body-bg-variant="secondary"
        >
          <draggable v-model="taskList.todoList" draggable=".card" group="menu">
            <b-card class="my-2" v-for="(todo, i) in taskList.todoList" @click="showModal('todoList', i)" :key="i">
              <span>{{ todo.name }}</span>
            </b-card>
          </draggable>
        </b-card>
      </div>
      <div class="col-lg-4 mx-auto">
        <b-card
          header="Work In Progress"
          header-bg-variant="dark"
          header-text-variant="white"
          body-bg-variant="secondary"
        >
          <draggable v-model="taskList.wipList" draggable=".card" group="menu">
            <b-card class="my-2" v-for="(wip, i) in taskList.wipList" @click="showModal('wipList', i)" :key="i">
              <span>{{ wip.name }}</span>
            </b-card>
          </draggable>
        </b-card>
      </div>
      <div class="col-lg-4 mx-auto">
        <b-card
          header="Done"
          header-bg-variant="dark"
          header-text-variant="white"
          body-bg-variant="secondary"
        >
          <draggable v-model="taskList.doneList" draggable=".card" group="menu">
            <b-card class="my-2" v-for="(done, i) in taskList.doneList" @click="showModal('doneList', i)" :key="i">
              <span>{{ done.name }}</span>
            </b-card>
          </draggable>
        </b-card>
      </div>
    </div>

    <b-modal v-model="isShow" :title="selectedTask.name">
      <validation-observer>
        <validation-provider name="詳細" rules="max:1000" v-slot="context">
          <b-form-group class="col-12" label="詳細">
            <b-form-textarea v-model="selectedTask.detail" :max-rows="10" :state="context | validState" />
            <b-form-invalid-feedback>{{ context.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <validation-provider name="タグ" rules="required" v-slot="context">
          <b-form-group class="col-6">
            <template #label>
              <span>タグ</span>
              <b-icon-tag-fill class="ml-2" />
            </template>
            <div class="d-flex align-items-center">
              <div>
                <b-form-input v-model="newTag" @keypress.enter="addTag(context.invalid)" />
              </div>
              <b-icon-plus-circle @click="addTag(context.invalid)" class="ml-3" scale="1.5" role="button" />
            </div>
          </b-form-group>
        </validation-provider>
        <div class="d-flex flex-wrap">
          <b-form-tag
            class="mt-1"
            pill
            @remove="removeTag(i)"
            variant="dark"
            v-for="(tag, i) in selectedTask.tags"
            :key="i"
          >
            {{ tag }}
          </b-form-tag>
        </div>
        <!-- <div class="mt-3">
          <b-button id="_label" pill variant="dark">
            <b-icon-plus />
          </b-button>
          <b-popover target="_label" :show.sync="isShowPopover">
            <template #title>
              <div class="d-flex justify-content-between align-items-center">
                <span>ラベル</span>
                <b-icon-x role="button" @click="closePopover" font-scale="1.5" />
              </div>
            </template>
            <div class="d-flex align-items-center">
              <b-form-checkbox />
              <span class="rounded py-2 px-5 my-2 bg-primary"></span>
            </div>
            <div class="rounded py-2 px-5 my-2 bg-secondary"></div>
            <div class="rounded py-2 px-5 my-2 bg-success"></div>
            <div class="rounded py-2 px-5 my-2 bg-danger"></div>
            <div class="rounded py-2 px-5 my-2 bg-warning"></div>
            <div class="rounded py-2 px-5 my-2 bg-info"></div>
            <div class="rounded py-2 px-5 my-2 bg-dark"></div>
          </b-popover>
        </div> -->
      </validation-observer>
      <template #modal-footer="{ ok }">
        <div class="float-right">
          <app-action-btn @click="ok">OK</app-action-btn>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import draggable from 'vuedraggable';
import { v4 as uuidv4 } from 'uuid';

/** TODO */
// タイトルの編集
// タスクの色付け機能
// タグやラベルで検索

interface Board {
  todoList: TaskDetail[];
  wipList: TaskDetail[];
  doneList: TaskDetail[];
}

type TaskDetail = {
  id: string;
  name: string;
  detail: string;
  tags: string[];
};

export default Vue.extend({
  name: 'Board',
  components: { draggable },
  data() {
    return {
      taskList: {} as Board,
      isShow: false,
      selectedTask: {} as TaskDetail,
      newTag: '',
      newTask: '',
      isLoading: false,
      isShowPopover: false,
    };
  },
  async mounted() {
    this.taskList = data;
  },
  methods: {
    showModal(key: keyof Board, idx: number) {
      this.selectedTask = this.taskList[key][idx];
      this.isShow = true;
    },
    async addTag(isInvalid: boolean) {
      if (isInvalid) return;
      this.selectedTask.tags.push(this.newTag);
      this.newTag = '';
    },
    async removeTag(idx: number) {
      this.selectedTask.tags.splice(idx, 1);
    },
    async addTask() {
      // APIとの通信が入る
      this.taskList.todoList.push(
        {
          id: uuidv4(),
          name: this.newTask,
          detail: '',
          tags: [],
        },
      );
    },
    // closePopover() {
    //   this.isShowPopover = false;
    // },
  },
});

const data = {
  todoList: [
    {
      id: '1',
      name: 'サーバーレスアーキテクチャを10ページ読む',
      detail: '内容だよ！！！！',
      tags: [],
    },
    {
      id: '2',
      name: 'ダーツを100回投げる',
      detail: '内容だよ！！！！',
      tags: ['darts'],
    },
    {
      id: '3',
      name: '部屋の片付けを10分やる',
      detail: '内容だよ！！！！',
      tags: [],
    },
    {
      id: '4',
      name: 'Trelloっぽいアプリを作成する',
      detail: '内容だよ！！！！',
      tags: ['dev'],
    },
  ],
  wipList: [
    {
      id: '1',
      name: 'ポケモンを捕まえる',
      detail: '内容だよ！！！！',
      tags: ['pokemon'],
    },
    {
      id: '2',
      name: 'Promiseについて調べる',
      detail: '内容だよ！！！！',
      tags: ['study'],
    },
  ],
  doneList: [
    {
      id: '1',
      name: '完了したタスク',
      detail: '内容だよ！！！！',
      tags: [],
    },
  ],
};
</script>

<style scoped>
.card:hover {
  cursor: pointer;
}
</style>
