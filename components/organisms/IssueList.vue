<template>
  <div class="issue-list">
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
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import IssueCardList from '~/components/organisms/IssueCardList.vue';
import { issueInterface } from '~/store/issue/type';

interface status {
  id: number;
  name: string;
}

@Component({
  components: {
    IssueCardList,
  },
})
class IssueList extends Vue {
  get statusList(): status[] {
    return [
      {
        id: 1,
        name: '未対応',
      },
      {
        id: 2,
        name: '対応中',
      },
      {
        id: 3,
        name: '処理済',
      },
    ];
  }

  get issueList(): issueInterface[] {
    return this.$store.state.issue.issueList;
  }

  getIssueListByStatus(statusId: number): issueInterface[] {
    return this.issueList.filter((element) => element.status.id === statusId);
  }

  created() {
    // TODO: タイミングここで良い？リロードのたびに呼ばれてしまう
    this.$store.dispatch('issue/asyncSetIssueList');
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
}

.tsk-card-list {
  margin-right: 10px;
  padding: 10px;
  width: 100%;
}
</style>
