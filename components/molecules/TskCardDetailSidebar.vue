<template>
  <!-- TODO: 文字を左寄せ -->
  <div class="side-bar-content">
    <div class="side-bar-item">
      <b-button type="is-danger" icon-left="delete" @click="deleteTask()"
        >削除</b-button
      >
    </div>

    <div class="side-bar-item">
      <b-button type="is-light" icon-left="archive" @click="archive()"
        >アーカイブ</b-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'nuxt-property-decorator';

@Component
class TskCardDetailSidebar extends Vue {
  @Emit()
  del() {}

  @Emit()
  archive() {}

  deleteTask() {
    this.$buefy.dialog.confirm({
      title: 'タスクを削除する',
      message:
        'タスクを削除してもよろしいですか？<br> この操作は取り消しできません。',
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
  display: flex;
  flex-direction: column;
}

.side-bar-item {
  button {
    width: 100%;
  }

  &:nth-of-type(n + 2) {
    margin-top: 10px;
  }
}
</style>
