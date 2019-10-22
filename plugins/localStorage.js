import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'task-app',
      paths: ['task', 'statusList', 'issue.conditions'],
    })(store);
  });
};
