<template>
  <section class="task-description">
    <div class="task-description--menu">
      <span>タスクの詳細</span>
      <div v-show="isPreview" class="edit-button" @click="togglePreview()">
        <CustomButton :value="'編集'" :color="'white'" />
      </div>
    </div>

    <div class="task-description--content">
      <div
        v-show="isPreview"
        class="task-description-form--preview"
        @click="togglePreview()"
      >
        <div v-html="htmlDescription"></div>
      </div>

      <div v-show="!isPreview" class="task-description-form--edit">
        <textarea
          v-model="description"
          class="task-description-form--edit--text"
          name="description"
          autofocus
          rows="10"
          maxlength="300"
        />
      </div>
    </div>

    <div v-show="!isPreview" class="task-description--menu--footer">
      <CustomButton :value="'保存'" :color="'white'" @buttonEvent="save" />
      <CloseButton @buttonEvent="togglePreview" />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import marked from 'marked';
import { taskObject } from '~/pages/todo.vue';
import CustomButton from '~/components/atoms/CustomButton.vue';
import CloseButton from '~/components/atoms/CloseButton.vue';

@Component({
  components: {
    CustomButton,
    CloseButton,
  },
})
class TskCardDetailDescription extends Vue {
  @Prop({ type: Object, required: true })
  task: taskObject;

  isPreview: boolean = true;
  description: string = this.task.description;

  /**
   * Markdown形式の文字列をHTMLに変換したデータ
   */
  get htmlDescription(): string {
    return marked(this.description);
  }

  /**
   * 編集/プレビューを切り替える
   */
  togglePreview(): void {
    this.isPreview = !this.isPreview;
  }

  save(): void {
    const task: taskObject = {
      id: this.task.id,
      name: this.task.name.trim(),
      description: this.task.description,
      list_id: this.task.list_id,
      position: this.task.position,
    };

    console.log(task);
    this.togglePreview();
  }
}
export default TskCardDetailDescription;
</script>

<style lang="scss" scoped>
// TODO: 定数定義
$backgroundColor: aliceblue;
$contentHeight: 350px;

.task-description--menu {
  display: flex;
  margin-bottom: 10px;

  &--footer {
    margin-top: 20px;
  }
}

.edit-button {
  margin-top: 20px;
}

.task-description--content {
  background-color: $backgroundColor;
  margin-right: 10px;
  height: $contentHeight;
}

.task-description-form--edit--text {
  width: 100%;
  height: $contentHeight - 10;
  resize: none;
  background-color: $backgroundColor;
  border: none;
  font-size: 1em;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

  &:focus {
    outline: none;
  }
}

.custom-button {
  margin-right: 10px;
}
</style>
