import { Mutations, Actions } from 'vuex';
import { S, G, M, A, issueInterface } from './type';
import axios from 'axios';

export const state = (): S => ({
  conditions: {
    count: 100,
    projectId: [109284, 110155],
    statusId: [1, 2, 3],
    assigneeId: [273730],
    sort: 'created',
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
  issueList: [],
});

export const mutations: Mutations<S, M> = {
  updateCondition(state, conditions) {
    state.conditions = conditions;
  },
  setIssueList(state, payload) {
    state.issueList = payload.issueList;
  },
};

export const actions: Actions<S, A, G, M> = {
  asyncUpdateCondition(ctx, conditions) {
    ctx.commit('updateCondition', conditions);
  },
  async asyncSetIssueList(ctx) {
    const conditions = Object.assign(
      { apiKey: process.env.BACKLOG_API_KEY },
      ctx.state.conditions
    );

    await axios
      .get(`${process.env.BACKLOG_BASE_URL}/api/v2/issues?`, {
        params: conditions,
      })
      .then((res: any) => {
        const payload: issueInterface[] = res.data.map((element: any) => ({
          id: element.id,
          projectId: element.projectId,
          issueKey: element.issueKey,
          summary: element.summary,
          description: element.description,
          status: element.status,
          assignee: element.assignee,
          category: element.category,
          milestone: element.milestone,
          startDate: element.startDate,
          dueData: element.dueData,
          estimatedHours: element.estimatedHours,
          actualHours: element.actualHours,
          created: element.created,
          updated: element.updated,
        }));
        ctx.commit('setIssueList', { issueList: payload });
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
