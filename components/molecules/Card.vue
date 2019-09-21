<template>
  <div>
    <section class="card" @click="showModal()">
      <div class="card-title">
        <p>{{ task.name }}</p>
      </div>
    </section>
    <!-- TODO: ループの外へ -->
    <div v-if="isShow">
      <ModalWrapper @close="closeModal()">
        <TskCardDetail :task="task" @close="closeModal()" />
      </ModalWrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import TskCardDetail from '~/components/organisms/TskCardDetail.vue';
import ModalWrapper from '~/components/molecules/ModalWrapper.vue';
import { taskInterface } from '~/store/task/type';

@Component({
  components: {
    ModalWrapper,
    TskCardDetail,
  },
})
class Card extends Vue {
  @Prop({ type: Object, required: true })
  task: taskInterface;

  /**
   * 詳細モーダルの表示可否
   */
  isShow: boolean = false;

  /**
   * タスク詳細モーダルを表示させる
   *
   */
  showModal(id: number): void {
    this.isShow = true;
  }

  closeModal(): void {
    this.isShow = false;
  }
}

export default Card;
</script>

<style lang="scss" scoped>
.card {
  display: inline-block;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  width: 90%;

  &-title {
    font-size: 18px;
    padding: 10px;
  }
}
</style>
