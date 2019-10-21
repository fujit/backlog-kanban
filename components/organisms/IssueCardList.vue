<template>
  <section class="card-list">
    <section class="card-list--header">
      <section class="card-list--title">
        <p>{{ status.name }}</p>
      </section>
    </section>

    <section class="card-list--contents">
      <client-only>
        <draggable :id="status.id" group="issueList" @end="updateStatus">
          <div
            v-for="issue in issueList"
            :id="issue.id"
            :key="issue.id"
            class="card-list--cards"
          >
            <IssueCard :issue="issue" @click.native="showModal(issue)" />
          </div>
        </draggable>
      </client-only>
    </section>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import axios from 'axios';
import { issueInterface } from '~/store/issue/type';
import IssueCard from '~/components/molecules/IssueCard.vue';
import IssueCardDetail from '~/components/organisms/IssueCardDetail.vue';

@Component({
  components: {
    IssueCard,
    IssueCardDetail,
  },
})
class IssueCardList extends Vue {
  @Prop({ type: Object, required: true })
  status: Object;

  @Prop({ type: Array, required: true })
  issueList: issueInterface[];

  /**
   * タスクの状態を更新
   */
  updateStatus(event: any) {
    const toID = event.to.id;
    const fromID = event.from.id;
    const issueKey = event.item.id;

    if (toID === fromID || !issueKey) {
      return;
    }

    axios.patch(
      `${process.env.BACKLOG_BASE_URL}/api/v2/issues/${issueKey}?apiKey=${process.env.BACKLOG_API_KEY}&statusId=${toID}`
    );
  }

  showModal(issue: issueInterface) {
    this.$buefy.modal.open({
      props: {
        issue,
      },
      parent: this,
      component: IssueCardDetail,
      width: '85%',
    });
  }
}

export default IssueCardList;
</script>
