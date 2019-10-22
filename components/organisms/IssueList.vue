<template>
  <div>
    <IssueConditionList class="condition-list" @update="fetchIssues" />
    <div class="issue-list">
      <template v-if="loading">
        <p>Loading...</p>
      </template>
      <template v-else>
        <client-only>
          <draggable class="status-list" group="statusList">
            <template v-for="status in statusList">
              <IssueCardList
                :key="status.id"
                :status="status"
                :issue-list="getIssueListByStatus(status.id)"
                class="tsk-card-list"
              />
            </template>
          </draggable>
        </client-only>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import axios from 'axios';
import IssueCardList from '~/components/organisms/IssueCardList.vue';
import IssueConditionList from '~/components/organisms/IssueConditionList.vue';
import { issueInterface, condition, status } from '~/store/issue/type';

@Component({
  components: {
    IssueCardList,
    IssueConditionList,
  },
})
class IssueList extends Vue {
  issues: issueInterface[] = [];
  loading: boolean = true;

  /**
   * 状態一覧のうち、条件に指定したものだけを取得
   */
  get statusList(): status[] {
    return this.$store.state.issue.statusList.filter((element: status) =>
      this.$store.state.issue.conditions.statusId.includes(element.id)
    );
  }

  get conditions(): condition {
    return this.$store.state.issue.conditions;
  }

  getIssueListByStatus(statusId: number): issueInterface[] {
    return this.issues.filter((element) => element.status.id === statusId);
  }

  mounted() {
    this.fetchIssues();
  }

  fetchIssues() {
    this.loading = true;
    const conditions = Object.assign(
      { apiKey: process.env.BACKLOG_API_KEY },
      this.conditions
    );

    console.log('conditions -> ', this.conditions);
    console.log(localStorage.getItem('task-app'));
    console.log('store -> ', this.$store.state.issue);

    axios
      .get(`${process.env.BACKLOG_BASE_URL}/api/v2/issues?`, {
        params: conditions,
      })
      .then((res: any) => {
        const issues: issueInterface[] = res.data.map((element: any) => ({
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
        this.issues = issues;
        this.loading = false;
      })
      .catch((error) => {
        // TODO:
        console.error(error);
      });
  }
}

export default IssueList;
</script>

<style lang="scss" scoped>
.issue-list {
  display: flex;
  align-items: flex-start;
  margin: 10px 0 0 10px;
}

.status-list {
  display: flex;
  width: 100%;
}

.tsk-card-list {
  margin-right: 10px;
  padding: 10px;
  width: 100%;
}

.condition-list {
  margin: 10px;
}
</style>
