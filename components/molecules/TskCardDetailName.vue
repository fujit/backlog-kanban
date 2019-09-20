<template>
  <section class="task-name">
    <input
      v-model="taskName"
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
import { taskObject } from '~/pages/todo.vue';
import validate from '~/Utility/Validation.ts';

// validation rule
const required = (value: string) => !!value.trim();
const max = (value: string, limit: number) => value.length <= limit;
const taskNameLimited = 20;

interface validationObject {
  taskName: {
    required: boolean;
    max: boolean;
  };
}

@Component
class TskDetailName extends Vue {
  @Prop({ type: Object, required: true })
  task: taskObject;

  taskName: string = this.task.name;
  taskDescription: string = this.task.description;
  taskNameFormName: string = 'task-name--preview';

  get validation(): validationObject {
    return {
      taskName: {
        required: required(this.taskName),
        max: max(this.taskName, taskNameLimited),
      },
    };
  }

  /**
   * タスク名のフォームのクラスを変更する
   */
  togglePreview(): void {
    this.taskNameFormName =
      this.taskNameFormName === 'task-name--preview'
        ? 'task-name--edit'
        : 'task-name--preview';
  }

  save(): void {
    if (!validate(this.validation)) {
      return;
    }

    const task: taskObject = {
      id: this.task.id,
      name: this.taskName.trim(),
      description: this.task.description,
      list_id: this.task.list_id,
      position: this.task.position,
    };

    console.log(task);

    // TODO: vuexの関数
    this.togglePreview();
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
