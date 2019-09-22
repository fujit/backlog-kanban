<template>
  <div class="task-list">
    <section class="status-list">
      <section v-for="status in statusList" :key="status.id">
        <TskCardList :status="status" />
      </section>
    </section>

    <section class="status-list-add">
      <b-button
        type="is-success"
        class="status-list-add-button"
        @click="showForm()"
        >リストを追加</b-button
      >
      <div v-show="isShowForm" class="status-list-add-form">
        <b-input
          v-model="statusListName"
          name="statusListName"
          maxlength="20"
        ></b-input>
        <div class="status-list-add-form-button">
          <b-button type="is-success" @click="addStatusList()">追加</b-button>
          <b-button type="is-light" @click="hideForm()">キャンセル</b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { statusListInterface } from '~/store/statusList/type';
import validate from '~/Utility/Validation';
import TskCardList from '~/components/organisms/TskCardList.vue';

const required = (value: string) => !!value.trim();
const max = (value: string, limit: number) => value.length <= limit;
const statusListNameLimited = 20;

interface validationObject {
  taskName: {
    required: boolean;
    max: boolean;
  };
}

@Component({
  components: {
    TskCardList,
  },
})
class TskList extends Vue {
  isShowForm: boolean = false;
  statusListName: string = '';

  get statusList(): statusListInterface[] {
    return this.$store.getters['statusList/sorted'];
  }

  get validation(): validationObject {
    return {
      taskName: {
        required: required(this.statusListName),
        max: max(this.statusListName, statusListNameLimited),
      },
    };
  }

  /**
   * ステータスリストを新規追加
   */
  addStatusList(): void {
    if (!validate(this.validation)) {
      return;
    }

    const statusListName: statusListInterface = {
      id: this.$store.getters['statusList/nextId'],
      name: this.statusListName.trim(),
      position: this.$store.getters['statusList/nextPosition'],
    };
    this.$store.commit('statusList/add', statusListName);

    this.hideForm();
  }

  showForm(): void {
    this.isShowForm = true;
  }

  hideForm(): void {
    this.isShowForm = false;
    this.statusListName = '';
  }
}

export default TskList;
</script>

<style lang="scss" scoped>
.task-list {
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
}

.status-list {
  display: inline-flex;
}

.status-list-add {
  margin: 5px;

  &-button {
    margin-bottom: 10px;
  }
}
</style>
