<template>
  <section class="task-description">
    <div class="task-description--menu">
      <span>タスクの詳細</span>
      <div v-show="isPreview" class="edit-button" @click="togglePreview()">
        <b-button type="is-success">編集</b-button>
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
          v-model="taskDescription"
          v-validate="'max:300'"
          class="task-description-form--edit--text"
          name="description"
          autofocus
          rows="10"
          maxlength="300"
        />
      </div>
    </div>

    <div v-show="!isPreview" class="task-description--menu--footer">
      <b-button type="is-success" @click="update">保存</b-button>
      <CloseButton @buttonEvent="cancel()" />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator';
import marked from 'marked';
import CloseButton from '~/components/atoms/CloseButton.vue';

@Component({
  components: {
    CloseButton,
  },
})
class TskCardDetailDescription extends Vue {
  @Prop({ type: String, required: true })
  description: string;

  isPreview: boolean = true;
  taskDescription: string = this.description;

  /**
   * Markdown形式の文字列をHTMLに変換したデータ
   */
  get htmlDescription(): string {
    return marked(this.taskDescription);
  }

  /**
   * 編集/プレビューを切り替える
   */
  togglePreview(): void {
    this.isPreview = !this.isPreview;
  }

  @Emit('update')
  updateTaskDescription(description: string) {}

  /**
   * タスクを更新する
   */
  update(): void {
    this.$validator.validateAll().then((result) => {
      if (result) {
        this.updateTaskDescription(this.taskDescription);
        this.togglePreview();
      }
    });
  }

  /**
   * タスクの編集を取り消す
   */
  cancel(): void {
    this.taskDescription = this.description;
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
  align-items: center;
  margin-bottom: 10px;

  &--footer {
    margin-top: 20px;
  }
}

.task-description--content {
  background-color: $backgroundColor;
  margin-right: 10px;
  height: $contentHeight;
  width: 85%;
}

.task-description-form--edit--text {
  width: 100%;
  height: $contentHeight - 10;
  resize: none;
  background-color: $backgroundColor;
  border: none;
  font-size: 1em;

  &:focus {
    outline: none;
  }
}

.edit-button {
  margin-left: 10px;
}

.task-description--menu--footer {
  align-items: center;
  display: flex;
}

.close-button {
  margin-left: 10px;
}
</style>
