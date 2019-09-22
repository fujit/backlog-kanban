<template>
  <div class="card-detail">
    <div class="card-detail--header">
      <TskCardDetailName :task="task" />
      <CloseButton @buttonEvent="close" />
    </div>
    <TskCardDetailDescription :task="task" />
    <div class="card-detail-footer"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { taskInterface } from '~/store/task/type';
import TskCardDetailName from '~/components/molecules/TskCardDetailName.vue';
import TskCardDetailDescription from '~/components/molecules/TskCardDetailDescription.vue';
import CloseButton from '~/components/atoms/CloseButton.vue';

@Component({
  components: {
    TskCardDetailName,
    TskCardDetailDescription,
    CloseButton,
  },
})
class TskCardDetail extends Vue {
  @Prop({ type: Object, required: true })
  task: taskInterface;

  close(): void {
    this.$emit('close');
  }
}

export default TskCardDetail;
</script>

<style lang="scss" scoped>
.card-detail {
  background: #ffffff;
  position: relative;
  padding-left: 10px;
  height: 520px; // 暫定
}

.close-button {
  position: absolute;
  top: 2%;
  right: 1%;
}

.task-name--form {
  margin-right: 10px;
}
</style>
