<template>
  <div>
    <div class="condition-list">
      <template v-for="(value, name) in conditions">
        <b-taglist :key="name" attached>
          <b-tag type="is-dark">{{ name }}</b-tag>
          <b-tag type="is-info">{{ value }}</b-tag>
        </b-taglist>
      </template>
      <b-button type="is-primary" @click="openConditionDetail">変更</b-button>
    </div>
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
    return this.$store.getters['issue/statusList'].filter(
      (element: status) =>
        this.conditions.statusId &&
        this.conditions.statusId.includes(element.id)
    );
  }

  get conditions(): condition {
    return this.$store.getters['issue/conditions'];
  }

  mounted() {
    this.fetchIssues();
  }

  getIssueListByStatus(statusId: number): issueInterface[] {
    return this.issues.filter((element) => element.status.id === statusId);
  }

  fetchIssues() {
    this.loading = true;
    const conditions = Object.assign(
      { apiKey: process.env.BACKLOG_API_KEY },
      this.conditions
    );

    axios
      .get(`${process.env.BACKLOG_BASE_URL}/api/v2/issues?`, {
        params: conditions,
      })
      .then((res: any) => {
        const issues: issueInterface[] = res.data.map((element: any) => ({
          id: element.id,
          projectId: element.projectId,
          issueKey: element.issueKey,
          issueType: element.issueType,
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

  /**
   * 検索条件を設定するモーダルを開く
   */
  openConditionDetail(): void {
    this.$buefy.modal.open({
      parent: this,
      component: IssueConditionList,
      width: '85%',
      events: {
        update: () => {
          this.fetchIssues();
        },
      },
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
  margin: 20px 0 0 10px;
  display: flex;

  .tags {
    margin-right: 10px;
  }
}
</style>
