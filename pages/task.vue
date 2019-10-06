<template>
  <TskList />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import TskList from '~/components/organisms/TskList.vue';

@Component({
  components: {
    TskList,
  },
})
class Task extends Vue {}

export default Task;
</script>
