<template>
  <div>
    <section class="card">
      <div class="card-title">
        <p>{{ task.name }}</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { taskInterface } from '~/store/task/type';
import TskCardDetail from '~/components/organisms/TskCardDetail.vue';

@Component({
  components: {
    TskCardDetail,
  },
})
class Card extends Vue {
  @Prop({ type: Object, required: true })
  task: taskInterface;
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

  &-title {
    font-size: 18px;
    padding: 10px;
  }
}
</style>
