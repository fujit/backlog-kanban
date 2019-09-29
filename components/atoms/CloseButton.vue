<template>
  <a class="close-button" @click="$emit('buttonEvent')">
    <b-icon icon="close" size="is-small" type="is-black"></b-icon>
  </a>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
class CloseButton extends Vue {}

export default CloseButton;
</script>
