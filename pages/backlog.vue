<template>
  <div>
    <IssueList />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import IssueList from '~/components/organisms/IssueList.vue';

@Component({
  components: {
    IssueList,
  },
})
class Backlog extends Vue {}

export default Backlog;
</script>
