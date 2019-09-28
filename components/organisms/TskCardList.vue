<template>
  <div class="card-list">
    <section class="card-list--header">
      <div class="card-list--title">
        <p>{{ status.name }}</p>
      </div>

      <div v-show="!isShowForm" class="card-list--add" @click="showForm()">
        <b-icon icon="plus" size="is-small"></b-icon>
      </div>

      <div class="card-list--menu">
        <b-dropdown aria-role="list">
          <b-icon
            slot="trigger"
            icon="dots-horizontal"
            size="is-small"
          ></b-icon>
          <b-dropdown-item aria-role="listitem" @click="showChangeForm()"
            >リスト名を変更する</b-dropdown-item
          >
          <b-dropdown-item aria-role="listitem" @click="deleteStatusList()"
            >リストを削除する</b-dropdown-item
          >
        </b-dropdown>
      </div>
    </section>

    <section v-show="isShowForm" class="card-list-form">
      <form @submit.prevent="addTask">
        <b-input
          v-model="taskName"
          v-validate="'required|max:20'"
          class="card-list--add-form--name"
          name="taskName"
          maxlength="20"
        ></b-input>
        <div class="card-list-add-form-button">
          <b-button type="is-success" native-type="submit">追加</b-button>
          <b-button type="is-light" @click="hideForm()">キャンセル</b-button>
        </div>
      </form>
    </section>
    <client-only>
      <draggable :id="status.id" group="taskList" @end="changeStatus">
        <div
          v-for="task in taskList"
          :id="task.id"
          :key="task.id"
          class="card-list--content"
        >
          <Card :task="task" />
        </div>
      </draggable>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Validator } from 'vee-validate';
import { taskInterface } from '~/store/task/type';
import { statusListInterface } from '~/store/statusList/type';
import Card from '~/components/molecules/Card.vue';

@Component({
  components: {
    Card,
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
    this.$store.dispatch('statusList/asyncDelete', { id: this.status.id });
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
}
export default TskCardList;
</script>

<style lang="scss" scoped>
.card-list {
  background-color: #b0ddc2;
  width: 280px; // TODO: ブラウザサイズによって可変
  border-radius: 10px;
  padding: 10px 0;
  margin: 5px;
  text-align: center;
  position: relative;
}

.card-list--header {
  display: inline-flex;
}

.card-list--title {
  margin-bottom: 10px;
}

.card-list--add {
  position: absolute;
  top: 3.5%;
  right: 15%;
  cursor: pointer;
}

.card-list--menu {
  position: absolute;
  top: 3.5%;
  right: 5%;
  cursor: pointer;
}

.card-list-form {
  width: 90%;
  margin: 0 auto;
}

.card-list-add-form-button button {
  width: 48.5%;
  margin: 5px 0;
}

.card-list--content {
  margin: 10px 0;
}
</style>
