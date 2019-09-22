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
      <b-input
        v-model="taskName"
        class="card-list--add-form--name"
        name="taskName"
        maxlength="20"
      ></b-input>
      <div class="card-list-add-form-button">
        <b-button type="is-success" @click="addTask()">追加</b-button>
        <b-button type="is-light" @click="hideForm()">キャンセル</b-button>
      </div>
    </section>

    <section :id="status.id">
      <div
        v-for="task in taskListByStatus"
        :key="task.id"
        class="card-list--content"
      >
        <Card :task="task" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { taskInterface } from '~/store/task/type';
import { statusListInterface } from '~/store/statusList/type';
import validate from '~/Utility/Validation';
import Card from '~/components/molecules/Card.vue';

// TODO: 共通化
const required = (value: string) => !!value.trim();
const max = (value: string, limit: number) => value.length <= limit;
const taskNameLimited = 20;

interface validationObject {
  taskName: {
    required: boolean;
    max: boolean;
  };
}

@Component({
  components: {
    Card,
  },
})
class TskCardList extends Vue {
  @Prop({ type: Object, required: true })
  status: statusListInterface;

  taskName: string = '';
  isShowForm: boolean = false;

  get taskList(): taskInterface[] {
    return this.$store.getters['task/sorted'];
  }

  get taskListByStatus(): taskInterface[] {
    return this.taskList.filter(
      (element) => element.status_id === this.status.id
    );
  }

  get validation(): validationObject {
    return {
      taskName: {
        required: required(this.taskName),
        max: max(this.taskName, taskNameLimited),
      },
    };
  }

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
    if (!validate(this.validation)) {
      return;
    }
    const task: taskInterface = {
      id: this.$store.getters['task/nextId'],
      name: this.taskName.trim(),
      description: '',
      status_id: this.status.id,
      position: this.nextPosition,
      isArchive: false,
    };
    this.$store.commit('task/addTask', task);

    this.hideForm();
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

    this.$store.commit('statusList/update', list);
  }

  /**
   * ステータスリストを削除
   */
  deleteStatusList() {
    this.$store.commit('statusList/delete', { id: this.status.id });
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
