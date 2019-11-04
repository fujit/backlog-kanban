import { Mutations, Actions, Getters } from 'vuex';
import { S, G, M, A, project } from './type';
import axios from 'axios';

export const state = (): S => ({
  conditions: {
    // デフォルトの検索条件
    statusId: [1, 2, 3],
    count: 100,
    projectId: [110155],
    // createdSince: '2019-08-01',
  },
  projects: [
    {
      id: 110155,
      projectKey: 'MENTIONTRACKER',
      name: 'SocialResearch',
    },
  ],
  milestones: [],
  statusList: [
    { id: 1, name: '未対応' },
    { id: 2, name: '対応中' },
    { id: 3, name: '処理済' },
    { id: 4, name: '完了' },
  ],
});

export const getters: Getters<S, G> = {
  conditions(state) {
    return state.conditions;
  },
  projects(state) {
    return state.projects;
  },
  milestones(state) {
    return state.milestones;
  },
  statusList(state) {
    return state.statusList;
  },
};

export const mutations: Mutations<S, M> = {
  updateCondition(state, conditions) {
    state.conditions = conditions;
  },
  fetchProjects(state, projects) {
    state.projects = projects;
  },
};

export const actions: Actions<S, A, G, M> = {
  asyncUpdateCondition(ctx, conditions) {
    ctx.commit('updateCondition', conditions);
  },
  /**
   * プロジェクト一覧を取得
   * @param ctx
   */
  async asyncFetchProjects(ctx) {
    const res = await axios.get(
      `${process.env.BACKLOG_BASE_URL}/api/v2/projects`,
      {
        params: {
          apiKey: process.env.BACKLOG_API_KEY,
          archived: false,
        },
      }
    );

    const projects: project[] = res.data.map((element: any) => ({
      id: element.id,
      projectKey: element.projectKey,
      name: element.name,
    }));

    ctx.commit('fetchProjects', projects);
  },
};
