<template>
  <div>
    <section class="card" @click="showModal()">
      <div class="card-title">
        <p>{{ task.name }}</p>
      </div>
    </section>
    <!-- TODO: これは一番外に書く。ループの中には書かない -->
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
import { taskObject } from '~/pages/todo.vue';

@Component({
  components: {
    ModalWrapper,
    TskCardDetail,
  },
})
class Card extends Vue {
  isShow: boolean = false;

  @Prop({ type: Object, required: true })
  task: taskObject;

  showModal(): void {
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

  &-title {
    font-size: 18px;
    padding: 20px 10px 10px;
  }
}
</style>
