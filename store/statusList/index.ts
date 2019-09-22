
import { Getters, Mutations, Actions } from 'vuex';
import { S, G, M, A } from './type';

export const state = ():S => ({
  statusList: [],
});

export const getters: Getters<S, G> = {
  sorted(state) {
    const list = state.statusList.slice();
    return list.sort((a, b) => a.position - b.position);
  },
  nextId(state) {
    return state.statusList.reduce((a, b) => Math.max(a, b.id), 0) + 1;
  },
  nextPosition(state) {
    return state.statusList.reduce((a, b) => Math.max(a, b.position), 0) + 1;
  }
};

export const mutations: Mutations<S, M> = {
  add(state, payload) {
    state.statusList.push(payload);
  },
  update(state, payload) {
    const index = state.statusList.findIndex(
      (element) => element.id === payload.id
    );

    state.statusList[index] = payload;
  },
  delete(state, payload) {
    state.statusList = state.statusList.filter(
      (element) => element.id !== payload.id
    );
  }
};

export const actions: Actions<S, A, G, M> = {
  asyncAdd(ctx, payload) {
    ctx.commit('add', payload);
  },
  asyncUpdate(ctx, payload) {
    ctx.commit('update', payload);
  },
  asyncDelete(ctx, payload) {
    ctx.commit('delete', payload);
  }
}