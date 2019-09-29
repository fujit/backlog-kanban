<template>
  <section class="task-name">
    <input
      v-model="taskName"
      v-validate="'required|max:20'"
      :class="'task-name--form ' + taskNameFormName"
      type="text"
      name="taskName"
      value="taskName"
      maxlength="20"
      @focus="togglePreview()"
      @blur="update()"
      @keyup.enter="update()"
    />
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator';

@Component
class TskDetailName extends Vue {
  @Prop({ type: String, required: true })
  name: string;

  taskName: string = this.name;
  isPreview: boolean = true;

  /**
   * タスク名のフォームのclass名
   */
  get taskNameFormName(): string {
    return this.isPreview ? 'task-name--preview' : 'task-name--edit';
  }

  @Emit('update')
  updateTaskName(taskName: string) {}

  /**
   * タスクを更新する
   */
  update(): void {
    this.$validator.validateAll().then((result) => {
      if (result) {
        this.updateTaskName(this.taskName.trim());
        this.isPreview = true;
      }
    });
  }

  /**
   * プレビュー/編集の切り替え
   */
  togglePreview(): void {
    this.isPreview = !this.isPreview;
  }
}

export default TskDetailName;
</script>

<style lang="scss" scoped>
.task-name--form {
  font-size: 1.5em;
  padding: 10px 10px 10px 5px;
  margin: 10px 0;
  width: 50%;
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
