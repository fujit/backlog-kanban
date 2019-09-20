<template>
  <div class="card-list">
    <section class="card-list--header">{{ status.name }}</section>
    <section class="card-list--content">
      <div v-for="task in taskListByStatus" :key="task.id">
        <Card :task="task" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
// import draggable from 'vuedraggable';
import { taskInterface } from '~/store/task/type';
import { statusListInterface } from '~/store/statusList/type';
import Card from '~/components/molecules/Card.vue';

@Component({
  components: {
    Card,
    // draggable,
  },
})
class TskCardList extends Vue {
  @Prop({ type: Object, required: true })
  status: statusListInterface;

  get taskListByStatus(): taskInterface[] {
    // const taskList: taskInterface[] = this.$store.getters['task/sorted'];
    const taskList: taskInterface[] = [
      {
        id: 0,
        name: 'sample1',
        description: 'foobar',
        list_id: 1,
        position: 1,
      },
      {
        id: 1,
        name: 'sample2',
        description: 'hogehoge',
        list_id: 2,
        position: 1,
      },
    ];
    return taskList.filter((element) => element.list_id === this.status.id);
  }
}
export default TskCardList;
</script>
