<template>
  <div>
    <form @submit.prevent="updateConditions">
      <template v-for="project in projects">
        <input
          :id="project.projectKey"
          :key="project.id"
          v-model="selectedProjects"
          type="checkbox"
          :name="project.projectKey"
          :value="project.id"
        />
        {{ project.name }}
      </template>

      <br />件数:
      <input v-model="count" type="number" name="count" />

      <br />
      <template v-for="status in statusList">
        <input
          :id="status.id"
          :key="status.id"
          v-model="selectedStatus"
          type="checkbox"
          :name="status.name"
          :value="status.id"
        />
        {{ status.name }}
      </template>

      <br />自分だけ
      <input id="onw-only" v-model="ownOnly" type="checkbox" name="own-only" />
      <b-button type="is-success" native-type="submit">更新</b-button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'nuxt-property-decorator';
import { condition, project, status } from '~/store/issue/type';

@Component
class IssueConditionList extends Vue {
  // TODO: リロード時うまくいかない
  selectedProjects: number[] = this.conditions.projectId || [];
  selectedStatus: number[] = this.conditions.statusId || [];
  count: number = this.conditions.count || 100;
  ownOnly: boolean = true;

  get conditions(): condition {
    return this.$store.state.issue.conditions;
  }

  get projects(): project[] {
    return this.$store.state.issue.projects;
  }

  get statusList(): status[] {
    return this.$store.state.issue.statusList;
  }

  @Emit('update')
  updateIssues() {}

  updateConditions() {
    const newConditions = Object.assign({}, this.conditions);
    // TODO: １つずつ書くのはたいへん
    newConditions.projectId = this.selectedProjects;
    newConditions.count = this.count;
    newConditions.statusId = this.selectedStatus;
    newConditions.assigneeId = [];
    // if (this.ownOnly && process.env.BACKLOG_OWN_ID !== undefined) {
    //   const ownId = parseInt(process.env.BACKLOG_OWN_ID, 10);
    //   newConditions.assigneeId = [ownId];
    // }

    this.$store.dispatch('issue/asyncUpdateCondition', newConditions);
    this.updateIssues();
  }
}

export default IssueConditionList;
</script>
