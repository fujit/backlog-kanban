<template>
  <form @submit.prevent="updateConditions">
    <template v-for="project in projects">
      <b-checkbox
        :key="project.id"
        v-model="selectedProjects"
        :native-value="project.id"
        :name="project.projectKey"
        >{{ project.name }}</b-checkbox
      >
    </template>

    <br />
    <div class="count-form">
      <b-field label="件数">
        <b-input
          id="count"
          v-model="count"
          type="number"
          min="1"
          max="100"
          placeholder="件数"
        />
      </b-field>
    </div>

    <br />
    <template v-for="status in statusList">
      <b-checkbox
        :key="status.id"
        v-model="selectedStatus"
        :native-value="status.id"
        :name="status.name"
        >{{ status.name }}</b-checkbox
      >
    </template>

    <br />
    <b-radio v-model="assigneeId" :native-value="[ownId]">自分だけ</b-radio>
    <b-radio v-model="assigneeId" :native-value="[]">全員</b-radio>

    <b-button type="is-success" native-type="submit">更新</b-button>
  </form>
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
  assigneeId: number[] = [];

  get conditions(): condition {
    return this.$store.state.issue.conditions;
  }

  get projects(): project[] {
    return this.$store.state.issue.projects;
  }

  get statusList(): status[] {
    return this.$store.state.issue.statusList;
  }

  get ownId(): number {
    if (!process.env.BACKLOG_OWN_ID) {
      return 0;
    }

    return parseInt(process.env.BACKLOG_OWN_ID, 10);
  }

  @Emit('update')
  updateIssues() {}

  updateConditions() {
    const newConditions = Object.assign({}, this.conditions);
    // TODO: １つずつ書くのはたいへん
    newConditions.projectId = this.selectedProjects;
    newConditions.count = this.count;
    newConditions.statusId = this.selectedStatus;
    newConditions.assigneeId = this.assigneeId;

    this.$store.dispatch('issue/asyncUpdateCondition', newConditions);
    this.updateIssues();
  }
}

export default IssueConditionList;
</script>

<style lang="scss" scoped>
.count-form {
  width: 100px;
}
</style>
