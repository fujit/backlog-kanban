import { Getters, Mutations, Actions } from 'vuex';
import { S, G, M, A, taskInterface } from './type';

export const state = (): S => ({
  taskList: [],
});

export const getters: Getters<S, G> = {
  sorted(state) {
    const list = state.taskList.slice();
    return list.filter(element => !element.isArchive)
               .sort((a, b) => b.position - a.position);
  },
  nextId(state) {
    return state.taskList.reduce((a, b) => Math.max(a, b.id), 0) + 1;
  }
};

export const mutations: Mutations<S, M> = {
  /**
   * タスクを追加
   * @param state
   * @param payload 新規追加するタスク情報
   */
  addTask(state, payload) {
    state.taskList.push(payload);
  },
  /**
   * タスクを更新
   * @param state
   * @param payload 更新するタスク情報
   */
  updateTask(state, payload) {
    const index = state.taskList.findIndex(
      (element) => element.id === payload.id
    );

    state.taskList[index] = payload;
  },
  /**
   * タスクを削除
   * @param state
   * @param payload 削除するタスクのID
   */
  deleteTask(state, payload) {
    state.taskList = state.taskList.filter(
      (element) => element.id !== payload.id
    );
  },
  /**
   * タスクの状態を更新
   * @param state
   * @param payload タスクのIDと更新先のリストID
   */
  updateStatus(state, payload) {
    const index = state.taskList.findIndex(
      (element: taskInterface) => element.id === payload.taskId
    );

    state.taskList[index].status_id = payload.toStatusId;
  },
};

export const actions: Actions<S, A, G, M> = {
  asyncAddTask(ctx, payload) {
    ctx.commit('addTask', payload);
  },
  asyncUpdateTask(ctx, payload) {
    ctx.commit('updateTask', payload);
  },
  asyncDeleteTask(ctx, payload) {
    ctx.commit('deleteTask', { id: payload.id });
  },
  asyncUpdateStatus(ctx, payload) {
    ctx.commit('updateStatus', { taskId: payload.taskId, toStatusId: payload.toStatusId });
  }
}
