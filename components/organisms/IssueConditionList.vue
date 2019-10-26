<template>
  <div class="modal-content">
    <form @submit.prevent="updateConditions">
      <template v-for="project in projects">
        <b-checkbox
          :key="project.id"
          v-model="selectedProjects"
          :native-value="project.id"
          :name="project.projectKey"
          @input="updateMilestones()"
          >{{ project.name }}</b-checkbox
        >
      </template>

      <br />
      <div class="count-form">
        <b-field label="件数">
          <b-input
            id="count"
            v-model="count"
            type="number"
            min="1"
            max="100"
            placeholder="件数"
          />
        </b-field>
      </div>

      <br />
      <template v-for="status in statusList">
        <b-checkbox
          :key="status.id"
          v-model="selectedStatus"
          :native-value="status.id"
          :name="status.name"
          >{{ status.name }}</b-checkbox
        >
      </template>

      <br />
      <b-taginput
        v-model="selectedMilstones"
        :data="filteredMilstones"
        autocomplete
        :open-on-focus="true"
        field="displayName"
        icon="label"
        placeholder="Add a milestone"
        @typing="getFilteredTags"
      ></b-taginput>

      <br />
      <b-radio v-model="assigneeId" :native-value="[ownId]">自分だけ</b-radio>
      <b-radio v-model="assigneeId" :native-value="[]">全員</b-radio>
      <b-button type="is-success" native-type="submit">更新</b-button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'nuxt-property-decorator';
import axios from 'axios';
import { condition, project, status, milestone } from '~/store/issue/type';

@Component
class IssueConditionList extends Vue {
  // TODO: リロード時うまくいかない
  selectedProjects: number[] = this.conditions.projectId || [];
  selectedStatus: number[] = this.conditions.statusId || [];
  count: number = this.conditions.count || 100;
  assigneeId: number[] = [this.ownId];
  milestones: milestone[] = [];
  selectedMilstones: milestone[] = [];
  filteredMilstones: milestone[] = this.milestones;

  get conditions(): condition {
    return this.$store.state.issue.conditions;
  }

  get projects(): project[] {
    return this.$store.state.issue.projects;
  }

  get statusList(): status[] {
    return this.$store.state.issue.statusList;
  }

  get ownId(): number {
    if (!process.env.BACKLOG_OWN_ID) {
      return 0;
    }

    return parseInt(process.env.BACKLOG_OWN_ID, 10);
  }

  async mounted() {
    await this.updateMilestones();

    this.selectedMilstones = this.milestones.filter(
      (milestone) =>
        this.conditions.milestoneId &&
        this.conditions.milestoneId.includes(milestone.id)
    );
  }

  /**
   * 選択できるマイルストーンを更新する
   */
  async updateMilestones() {
    const milestones = await Promise.all(
      await this.selectedProjects.map((id) => this.getMilestones(id))
    );
    this.milestones = this.filteredMilstones = milestones.flat();
  }

  /**
   * マイルストーン一覧を取得
   */
  async getMilestones(projectId: number): Promise<milestone[]> {
    const res = await axios.get(
      `${process.env.BACKLOG_BASE_URL}/api/v2/projects/${projectId}/versions`,
      {
        params: {
          apiKey: process.env.BACKLOG_API_KEY,
        },
      }
    );

    return res.data.map((element: any) => {
      const projectName = this.getProjectName(element.projectId);

      return {
        id: element.id,
        projectId: element.projectId,
        name: element.name,
        displayOrder: element.displayOrder,
        displayName: `${projectName}: ${element.name}`,
      };
    });
  }

  /**
   * 選択できるタグを絞り込んで表示する
   * @param text 入力値
   */
  getFilteredTags(text: string): void {
    this.filteredMilstones = this.milestones.filter((milestone) =>
      milestone.name
        .toString()
        .toLowerCase()
        .includes(text.toLowerCase())
    );
  }

  /**
   * idに対応するプロジェクト名を取得
   *
   * @param id プロジェクトID
   */
  getProjectName(id: number): string {
    const project = this.projects.filter((project) => project.id === id);
    return project.length > 0 ? project[0].name : '';
  }

  @Emit('update')
  updateIssues() {}

  updateConditions() {
    const newConditions = Object.assign({}, this.conditions);
    // TODO: １つずつ書くのはたいへん
    newConditions.projectId = this.selectedProjects;
    newConditions.count = this.count;
    newConditions.statusId = this.selectedStatus;
    newConditions.assigneeId = this.assigneeId;
    newConditions.milestoneId = this.selectedMilstones.map(
      (milestone) => milestone.id
    );

    this.$store.dispatch('issue/asyncUpdateCondition', newConditions);
    this.updateIssues();
    this.$emit('close');
  }
}

export default IssueConditionList;
</script>

<style lang="scss" scoped>
// TODO: 他のモーダルとの共通化
.modal-content {
  background: #ffffff;
  height: 400px;
  padding: 20px;
}
.count-form {
  width: 100px;
}
</style>
