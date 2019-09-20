<template>
  <div class="modal-mask">
    <div class="modal-container">
      <slot @close="close()" />
      <CloseButton @buttonEvent="$emit('close')" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'nuxt-property-decorator';
import CloseButton from '~/components/atoms/CloseButton.vue';

@Component({
  components: {
    CloseButton,
  },
})
class ModalWrapper extends Vue {
  @Emit()
  close() {}
}
export default ModalWrapper;
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  width: 100%;
  height: 1000%;
  background-color: rgba(0, 0, 0, 0.5);

  .modal-container {
    width: 60%;
    height: auto;
    min-height: 300px;
    max-height: 500px;
    margin: 15% auto;
    background-color: white;
    overflow-y: auto;
  }
}
</style>
