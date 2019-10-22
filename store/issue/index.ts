import { Mutations, Actions } from 'vuex';
import { S, G, M, A, issueInterface } from './type';
import axios from 'axios';

export const state = (): S => ({
  conditions: {
    // count: 100,
    // projectId: [109284, 110155],
    // statusId: [1, 2, 3],
    // assigneeId: [273730],
    // sort: 'created',
    // createdSince: '2019-08-01',
  },
  // TODO: actionsで都度取得
  projects: [
    { id: 109284, projectKey: 'KEYWORDMAP', name: '【開発部】Keywordmap' },
    { id: 85366, projectKey: 'DEVRANKCHECKER', name: '【開発部】MarketEngine' },
    {
      id: 110155,
      projectKey: 'MENTIONTRACKER',
      name: '【開発部】SocialResearch',
    },
  ],
});

export const mutations: Mutations<S, M> = {
  updateCondition(state, conditions) {
    state.conditions = conditions;
  },
};

export const actions: Actions<S, A, G, M> = {
  asyncUpdateCondition(ctx, conditions) {
    ctx.commit('updateCondition', conditions);
  },
};
