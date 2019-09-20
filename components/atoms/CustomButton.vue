<template>
  <button class="button custom-button" :style="customStyle">
    {{ value }}
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
class CustomButton extends Vue {
  @Prop({ type: String, required: true })
  value: string;

  // TODO: 色もどこかに定義する
  @Prop({ type: String, default: '#4caf50' })
  backgroundColor: string;

  @Prop({ type: String, default: 'black' })
  color: string;

  customStyle: Object = {
    'background-color': this.backgroundColor,
    color: this.color,
  };
}
export default CustomButton;
</script>

<style lang="scss" scoped>
.custom-button {
  padding: 5px 10px;
  border-radius: 5px;
  transition: 0.3s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  font-size: 15px;
  text-align: center;

  &:hover {
    box-shadow: 1px 6px 15px rgba(0, 0, 0, 0.5);
  }
}
</style>
