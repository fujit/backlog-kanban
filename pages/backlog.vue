<template>
  <div>
    <IssueConditionList />
    <IssueList />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import IssueList from '~/components/organisms/IssueList.vue';
import IssueConditionList from '~/components/organisms/IssueConditionList.vue';

@Component({
  components: {
    IssueList,
    IssueConditionList,
  },
})
class Backlog extends Vue {}

export default Backlog;
</script>
