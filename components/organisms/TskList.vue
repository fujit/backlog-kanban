<template>
  <div class="task-list">
    <client-only>
      <draggable class="status-list" group="statusList">
        <section v-for="status in statusList" :key="status.id">
          <TskCardList :status="status" />
        </section>
      </draggable>
    </client-only>

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
          v-validate="'required|max:20'"
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
import TskCardList from '~/components/organisms/TskCardList.vue';

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

  /**
   * ステータスリストを新規追加
   */
  addStatusList(): void {
    this.$validator.validateAll().then((result) => {
      if (result) {
        const statusListName: statusListInterface = {
          id: this.$store.getters['statusList/nextId'],
          name: this.statusListName.trim(),
          position: this.$store.getters['statusList/nextPosition'],
        };
        this.$store.dispatch('statusList/asyncAdd', statusListName);

        this.hideForm();
      }
    });
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
