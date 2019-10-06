<template>
  <section class="card-list">
    <section class="card-list--header">
      <section class="card-list--title">
        <p>{{ status.name }}</p>
      </section>

      <div class="card-list--menu">
        <section v-show="!isShowForm" class="card-list--add" @click="showForm">
          <b-icon icon="plus" size="is-small"></b-icon>
        </section>

        <section class="card-list--dp">
          <b-dropdown aria-role="list">
            <b-icon
              slot="trigger"
              icon="dots-horizontal"
              size="is-small"
            ></b-icon>
            <b-dropdown-item aria-role="listitem" @click="showChangeForm"
              >リスト名を変更する</b-dropdown-item
            >
            <b-dropdown-item aria-role="listitem" @click="deleteStatusList"
              >リストを削除する</b-dropdown-item
            >
          </b-dropdown>
        </section>
      </div>
    </section>

    <section class="card-list--container">
      <section v-show="isShowForm" class="card-list--form">
        <form @submit.prevent="addTask">
          <b-input
            v-model="taskName"
            v-validate="'required|max:20'"
            name="taskName"
            maxlength="20"
          ></b-input>
          <section class="card-list--form-button">
            <b-button type="is-success" native-type="submit">追加</b-button>
            <b-button type="is-light" @click="hideForm()">キャンセル</b-button>
          </section>
        </form>
      </section>

      <section class="card-list--contents">
        <client-only>
          <draggable :id="status.id" group="taskList" @end="changeStatus">
            <div
              v-for="task in taskList"
              :id="task.id"
              :key="task.id"
              class="card-list--cards"
              @click="showModal(task)"
            >
              <Card :title="task.name" />
            </div>
          </draggable>
        </client-only>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Validator } from 'vee-validate';
import { taskInterface } from '~/store/task/type';
import { statusListInterface } from '~/store/statusList/type';
import Card from '~/components/molecules/Card.vue';
import TskCardDetail from '~/components/organisms/TskCardDetail.vue';

@Component({
  components: {
    Card,
    TskCardDetail,
  },
})
class TskCardList extends Vue {
  @Prop({ type: Object, required: true })
  status: statusListInterface;

  @Prop({ type: Array, required: true })
  taskList: taskInterface[];

  taskName: string = '';
  isShowForm: boolean = false;

  /**
   * 次の配置位置を取得
   */
  get nextPosition(): number {
    return (
      this.taskList
        .filter((task) => task.status_id === this.status.id)
        .reduce((a, b) => Math.max(a, b.position), 0) + 1
    );
  }

  /**
   * タスクを追加
   */
  addTask(): void {
    const validator: Validator = this.$validator;
    validator.validateAll().then((result) => {
      if (result) {
        const task: taskInterface = {
          id: this.$store.getters['task/nextId'],
          name: this.taskName.trim(),
          description: '',
          status_id: this.status.id,
          position: this.nextPosition,
          isArchive: false,
        };
        this.$store.dispatch('task/asyncAddTask', task);

        this.hideForm();
      }
    });
  }

  showForm(): void {
    this.isShowForm = true;
  }

  hideForm(): void {
    this.isShowForm = false;
    this.taskName = '';
  }

  showChangeForm(): void {
    this.$buefy.dialog.prompt({
      title: 'リスト名を変更する',
      message: 'リスト名',
      confirmText: '変更する',
      cancelText: 'キャンセル',
      inputAttrs: {
        maxlength: 20,
        value: this.status.name,
      },
      onConfirm: (value: string) => {
        this.updateListName(value);
      },
    });
  }

  /**
   * ステータスリスト名を変更
   *
   * @param name リスト名
   */
  updateListName(name: string) {
    const list: statusListInterface = {
      id: this.status.id,
      name,
      position: this.status.position,
    };

    this.$store.dispatch('statusList/asyncUpdate', list);
  }

  /**
   * ステータスリストを削除
   */
  deleteStatusList() {
    this.$buefy.dialog.confirm({
      title: 'リストを削除する',
      message:
        'リストを削除してもよろしいですか？<br> この操作は取り消しできません。',
      confirmText: 'リストを削除する',
      cancelText: 'キャンセル',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: () => {
        this.$store.dispatch('statusList/asyncDelete', { id: this.status.id });
      },
    });
  }

  /**
   * タスクの状態を変更
   */
  changeStatus(event: any) {
    if (event.to.id === event.from.id) {
      return;
    }

    this.$store.dispatch('task/asyncUpdateStatus', {
      taskId: parseInt(event.item.id, 10),
      toStatusId: parseInt(event.to.id, 10),
    });
  }

  /**
   * 詳細モーダルを開く
   */
  showModal(task: taskInterface): void {
    this.$buefy.modal.open({
      props: {
        task,
      },
      parent: this,
      component: TskCardDetail,
      'can-cancel': false,
    });
  }
}
export default TskCardList;
</script>

<style lang="scss" scoped>
.card-list {
  background-color: #b0ddc2;
  border-radius: 10px;
}

.card-list--header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.card-list--menu {
  display: flex;

  .icon {
    cursor: pointer;
  }
}

.card-list--contienr {
  display: flex;
  flex-direction: column;
}

.card-list--form-button {
  display: flex;
  justify-content: center;

  button {
    width: 50%;

    &:first-child {
      margin-right: 5px;
    }

    &:last-child {
      margin-left: 5px;
    }
  }
}

.card-list--cards {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
</style>
