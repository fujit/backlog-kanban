<template>
  <section class="card-list">
    <section class="card-list--header">
      <section class="card-list--title">
        <p>{{ status.name }}</p>
      </section>
    </section>

    <section class="card-list--contents">
      <client-only>
        <draggable :id="status.id" group="issueList">
          <div
            v-for="issue in issueList"
            :id="issue.id"
            :key="issue.id"
            class="card-list--cards"
          >
            <IssueCard :issue="issue" />
          </div>
        </draggable>
      </client-only>
    </section>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { issueInterface } from '~/store/Issue/type';
import IssueCard from '~/components/molecules/IssueCard.vue';

@Component({
  components: {
    IssueCard,
  },
})
class IssueCardList extends Vue {
  @Prop({ type: Object, required: true })
  status: Object;

  @Prop({ type: Array, required: true })
  issueList: issueInterface[];
}

export default IssueCardList;
</script>
