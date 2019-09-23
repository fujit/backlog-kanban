<template>
  <section class="task-name">
    <input
      v-model="taskName"
      v-validate="'required|max:20'"
      :class="'task-name--form ' + taskNameFormName"
      type="text"
      name="taskName"
      value="task.name"
      maxlength="20"
      @focus="togglePreview()"
      @blur="save()"
    />
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { taskInterface } from '~/store/task/type';

@Component
class TskDetailName extends Vue {
  @Prop({ type: Object, required: true })
  task: taskInterface;

  taskName: string = this.task.name;
  taskDescription: string = this.task.description;
  taskNameFormName: string = 'task-name--preview';

  /**
   * タスク名のフォームのクラスを変更する
   */
  togglePreview(): void {
    this.taskNameFormName =
      this.taskNameFormName === 'task-name--preview'
        ? 'task-name--edit'
        : 'task-name--preview';
  }

  /**
   * タスクを更新する
   */
  save(): void {
    this.$validator.validateAll().then((result) => {
      if (result) {
        const task: taskInterface = {
          id: this.task.id,
          name: this.taskName.trim(),
          description: this.task.description,
          status_id: this.task.status_id,
          position: this.task.position,
          isArchive: this.task.isArchive,
        };

        this.$store.dispatch('task/asyncUpdateTask', task);

        this.togglePreview();
      }
    });
  }
}

export default TskDetailName;
</script>

<style lang="scss" scoped>
.task-name--form {
  font-size: 1.5em;
  padding: 10px 10px 10px 5px;
  margin: 10px 0;
  width: 400px;
  border: none;

  &:focus {
    outline: none;
  }
}

.task-name--preview {
  cursor: pointer;
}

.task-name--edit {
  border-bottom: 1px solid #757575;
}
</style>
