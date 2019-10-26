<template>
  <div>
    <section class="card">
      <div class="card-text">
        <p class="text-small">{{ issue.issueKey }}</p>
        <p class="text-large card-summary">{{ issue.summary }}</p>

        <div class="card-text--sub">
          <p class="text-small">
            担当者:
            <template v-if="issue.assignee">{{ issue.assignee.name }}</template>
          </p>

          <p class="text-small">
            種別:
            {{ issue.issueType.name }}
          </p>

          <p class="text-small">
            マイルストーン:
            <template v-if="issue.milestone.length > 0">
              {{ issue.milestone[0].name }}
            </template>
          </p>
        </div>
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
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  width: 100%;
  height: 180px;

  &-text {
    padding: 10px;

    &--sub {
      position: absolute;
      bottom: 5%;
    }
  }

  &-summary {
    margin-top: 10px;
  }
}

.text-small {
  font-size: small;
}

.text-large {
  font-size: large;
}
</style>
