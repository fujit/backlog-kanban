<template>
  <div class="card-detail">
    <div class="card-detail--header">
      <TskCardDetailName :name="task.name" @update="updateTaskName" />
      <CloseButton @buttonEvent="close" />
    </div>
    <div class="card-detail-content">
      <TskCardDetailDescription :task="task" />
      <TskCardDetailSidebar @del="deleteTask()" @archive="archiveTask()" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { taskInterface } from '~/store/task/type';
import TskCardDetailName from '~/components/molecules/TskCardDetailName.vue';
import TskCardDetailDescription from '~/components/molecules/TskCardDetailDescription.vue';
import TskCardDetailSidebar from '~/components/molecules/TskCardDetailSidebar.vue';
import CloseButton from '~/components/atoms/CloseButton.vue';

@Component({
  components: {
    TskCardDetailName,
    TskCardDetailDescription,
    TskCardDetailSidebar,
    CloseButton,
  },
})
class TskCardDetail extends Vue {
  @Prop({ type: Object, required: true })
  task: taskInterface;

  /**
   * タスク名を更新する
   *
   * @param taskName タスク名
   */
  updateTaskName(taskName: string): void {
    const task: taskInterface = {
      id: this.task.id,
      name: taskName,
      description: this.task.description,
      status_id: this.task.status_id,
      position: this.task.position,
      isArchive: this.task.isArchive,
    };

    this.$store.dispatch('task/asyncUpdateTask', task);
  }

  deleteTask(): void {
    this.$store.dispatch('task/asyncDeleteTask', {
      id: this.task.id,
    });

    this.close();
  }

  archiveTask(): void {
    const task: taskInterface = {
      id: this.task.id,
      name: this.task.name,
      description: this.task.description,
      status_id: this.task.status_id,
      position: this.task.position,
      isArchive: true,
    };

    this.$store.dispatch('task/asyncUpdateTask', task);
    this.close();
  }

  close(): void {
    this.$emit('close');
  }
}

export default TskCardDetail;
</script>

<style lang="scss" scoped>
.card-detail {
  background: #ffffff;
  position: relative;
  padding-left: 10px;
  height: 520px; // 暫定
}

.close-button {
  position: absolute;
  top: 2%;
  right: 1%;
}

.task-name--form {
  margin-right: 10px;
}

.card-detail-content {
  position: relative;
}
</style>
