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
      <b-button type="is-success" @click="save">保存</b-button>
      <CloseButton @buttonEvent="cancel()" />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import marked from 'marked';
import { taskInterface } from '~/store/task/type';
import CloseButton from '~/components/atoms/CloseButton.vue';

@Component({
  components: {
    CloseButton,
  },
})
class TskCardDetailDescription extends Vue {
  @Prop({ type: Object, required: true })
  task: taskInterface;

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

  /**
   * タスクを更新する
   */
  save(): void {
    this.$store.commit('task/updateTask', {
      id: this.task.id,
      name: this.task.name,
      description: this.description,
    });

    this.togglePreview();
  }

  /**
   * タスクの編集を取り消す
   */
  cancel(): void {
    this.description = this.task.description;
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
