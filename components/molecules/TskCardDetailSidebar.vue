<template>
  <!-- TODO: 文字を左寄せ -->
  <div class="side-bar-content">
    <div class="side-bar-item">
      <b-button type="is-danger" icon-left="delete" @click="deleteTask()"
        >削除</b-button
      >
    </div>

    <div class="side-bar-item">
      <b-button type="is-light" icon-left="archive">アーカイブ</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'nuxt-property-decorator';

@Component
class TskCardDetailSidebar extends Vue {
  @Emit()
  del() {}

  deleteTask() {
    this.$buefy.dialog.confirm({
      title: 'タスクを削除する',
      message:
        'タスクを削除してもよろしいですか？<br> この動作は取り消しできません。',
      confirmText: 'タスクを削除する',
      cancelText: 'キャンセル',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: () => {
        this.$buefy.toast.open('タスクを削除しました');
        this.del();
      },
    });
  }
}
export default TskCardDetailSidebar;
</script>

<style lang="scss" scoped>
.side-bar-content {
  height: 100%;
  position: absolute;
  top: 0;
  right: 0%;
  margin-right: 10px;
}

.side-bar-item {
  margin: 10px 0;

  button {
    width: 100%;
  }
}
</style>
