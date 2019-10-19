<template>
  <div>
    <section class="card">
      <div class="card-title">
        <small>{{ issue.issueKey }}</small>
        <h3>{{ issue.summary }}</h3>

        <p>
          担当者:
          <template v-if="issue.assignee">{{ issue.assignee.name }}</template>
        </p>

        <p>
          マイルストーン:
          <template v-if="issue.milestone.length > 0">
            {{ issue.milestone[0].name }}
          </template>
        </p>

        <small>{{ issue.created | formatDate('YYYY-MM-DD') }}</small>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { issueInterface } from '~/store/issue/type';

@Component
class Card extends Vue {
  @Prop({ type: Object, required: true })
  issue: issueInterface;
}

export default Card;
</script>

<style lang="scss" scoped>
.card {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  width: 100%;
  height: 200px;

  &-title {
    font-size: 18px;
    padding: 10px;
  }
}
</style>
