<template>
  <div class="card-detail">
    <TskCardDetailName :task="task" />
    <TskCardDetailDescription :task="task" />
    <div class="card-detail-footer"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import TskCardDetailName from '~/components/molecules/TskCardDetailName.vue';
import TskCardDetailDescription from '~/components/molecules/TskCardDetailDescription.vue';
import { taskInterface } from '~/store/task/type';

@Component({
  components: {
    TskCardDetailName,
    TskCardDetailDescription,
  },
})
class TskCardDetail extends Vue {
  @Prop({ type: Object, required: true })
  task: taskInterface;
}

export default TskCardDetail;
</script>
