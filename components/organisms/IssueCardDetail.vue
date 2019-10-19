<template>
  <div class="card-detail">
    <div class="card-detail--header">
      <p>
        <a :href="originalLink" target="_blank">{{ issue.summary }}</a>
      </p>

      <CloseButton @click.native="$emit('close')" />
    </div>
    <div class="card-detail-content">
      <section class="issue-description">
        <div class="issue-description--content" v-html="htmlDescription"></div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import marked from 'marked';
import CloseButton from '~/components/atoms/CloseButton.vue';
import { issueInterface } from '~/store/Issue/type';

@Component({
  components: {
    CloseButton,
  },
})
class IssueCardDetail extends Vue {
  @Prop({ type: Object, required: true })
  issue: issueInterface;

  get htmlDescription(): string {
    return marked(this.issue.description);
  }

  get originalLink(): string {
    // TODO: 環境変数定義
    return `https://corej.backlog.jp/view/${this.issue.issueKey}`;
  }
}

export default IssueCardDetail;
</script>

<style lang="scss" scoped>
.card-detail {
  background: #ffffff;
  position: relative;

  &--header {
    padding: 10px;

    p {
      font-weight: 600;
    }

    a {
      color: #000000;

      &:hover {
        color: #3273dc;
      }
    }
  }
}

.open-in-new {
  cursor: pointer;
}

.close-button {
  position: absolute;
  top: 2%;
  right: 1%;
}

.card-detail-content {
  padding: 10px;
}

.issue-description {
  width: 100%;

  &--content {
    overflow-wrap: break-word;
    overflow: auto;
  }
}
</style>
