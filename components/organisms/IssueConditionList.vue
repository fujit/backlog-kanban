<template>
  <div>
    <form @submit.prevent="reFetch">
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
      <b-button type="is-success" native-type="submit">更新</b-button>
    </form>
    {{ conditions }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'nuxt-property-decorator';
import { condition, project } from '~/store/issue/type';

@Component
class IssueConditionList extends Vue {
  selectedProjects: number[] = this.conditions.projectId || [];

  get conditions(): condition {
    return this.$store.state.issue.conditions;
  }

  get projects(): project[] {
    return this.$store.state.issue.projects;
  }

  @Emit('update')
  updateIssues() {}

  reFetch() {
    const newConditions = Object.assign({}, this.conditions);
    newConditions.projectId = this.selectedProjects;
    this.$store.dispatch('issue/asyncUpdateCondition', newConditions);
    this.updateIssues();
  }
}

export default IssueConditionList;
</script>
