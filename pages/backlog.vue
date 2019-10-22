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
class Backlog extends Vue {
  mounted() {
    this.$store.dispatch('issue/asyncFetchProjects');
  }
}

export default Backlog;
</script>
