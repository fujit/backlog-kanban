import { Mutations, Actions }  from 'vuex';
import { S, G, M, A, issueInterface } from './type';
import axios from 'axios';
import { taskInterface } from '../task/type';

export const state = (): S => ({
  conditions: {
    count: 100,
  },
  issueList: [],
})

export const mutations: Mutations<S, M> = {
  setIssueList(state, payload) {
    state.issueList = payload.issueList;
  },
}

export const actions: Actions<S, A, G, M> = {
  async asyncSetIssueList(ctx) {
    // いくつかは環境変数に定義
    await axios.get('https://corej.backlog.jp/api/v2/issues?', {
      params: {
        apiKey: '',
        count: 100, // この辺はループで作成(stateの値を見たい)
        projectId: [109284],
        statusId: [1, 2, 3],
      }
    }).then((res: any) => {
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
      ctx.commit('setIssueList', { issueList: payload});
    })
  },
}