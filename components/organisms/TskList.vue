<template>
  <div class="status-list">
    <section v-for="status in statusList" :key="status.id">
      <TskCardList :status="status" />
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { statusListInterface } from '~/store/statusList/type';
import TskCardList from '~/components/organisms/TskCardList.vue';

@Component({
  components: {
    TskCardList,
  },
})
class TskList extends Vue {
  // TODO: vuexで管理
  statusList: statusListInterface[] = [
    { id: 1, name: 'Todo', position: 1 },
    { id: 2, name: 'Doing', position: 2 },
    { id: 3, name: 'Done', position: 3 },
  ];
}

export default TskList;
</script>

<style lang="scss" scoped>
.status-list {
  display: inline-flex;
  margin: 10px;
}
</style>
