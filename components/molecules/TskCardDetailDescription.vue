<template>
  <section class="task-description">
    <div v-show="isPreview">
      <div
        v-if="taskDescription"
        class="task-description-content--preview"
        @click="togglePreview"
      >
        <div v-html="htmlDescription"></div>
      </div>
      <template v-if="!taskDescription">
        <b-button type="is-success" @click="togglePreview">詳細を追加</b-button>
      </template>
    </div>

    <div v-show="!isPreview" class="task-description-content--edit">
      <b-input
        v-model="taskDescription"
        custom-class="has-fixed-size"
        type="textarea"
        autofocus
        rows="15"
      ></b-input>
      <div v-show="!isPreview" class="task-description-content--footer">
        <b-button type="is-success" @click="update">保存</b-button>
        <CloseButton class="close-button" @buttonEvent="cancel()" />
      </div>
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
$backgroundColor: aliceblue;
$contentWidth: 85%;

.task-description {
  width: 85%;

  &-content--preview {
    cursor: pointer;
    height: 400px;
    overflow-wrap: break-word;
    overflow: auto;
  }

  &-content--edit {
    height: 100%;
  }

  &-content--footer {
    padding: 10px 0;
    display: flex;
    align-items: center;
  }
}

.close-button {
  margin-left: 10px;
}
</style>
