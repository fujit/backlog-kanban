<template>
  <a class="close-button" @click="$emit('buttonEvent')">
    <img src="~/assets/img/close_btn.png" />
  </a>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
class CloseButton extends Vue {}

export default CloseButton;
</script>
