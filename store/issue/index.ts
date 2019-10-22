import { Mutations, Actions } from 'vuex';
import { S, G, M, A, issueInterface } from './type';

export const state = (): S => ({
  conditions: {
    // count: 100,
    // statusId: [1, 2, 3],
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
  statusList: [
    { id: 1, name: '未対応' },
    { id: 2, name: '対応中' },
    { id: 3, name: '処理済' },
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
