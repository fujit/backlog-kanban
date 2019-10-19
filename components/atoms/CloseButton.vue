<template>
  <a class="close-button">
    <b-icon icon="close" size="is-small" type="is-black" />
  </a>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
class CloseButton extends Vue {}

export default CloseButton;
</script>
