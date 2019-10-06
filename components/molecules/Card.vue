<template>
  <div>
    <section class="card">
      <div class="card-title">
        <p>{{ title }}</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
class Card extends Vue {
  @Prop({ type: String, required: true })
  title: string;
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
