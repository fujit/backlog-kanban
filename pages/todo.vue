<template>
  <Card :task="task" />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import Card from '~/components/molecules/Card.vue';

export interface taskObject {
  id: number;
  name: string;
  description: string;
  list_id: number;
  position: number;
}

@Component({
  components: {
    Card,
  },
})
class Todo extends Vue {
  title = 'Hello Nuxt project';
  task: taskObject = {
    id: 1,
    name: 'あれこれ',
    description: '# title ## sub あああああああああ',
    list_id: 1,
    position: 1,
  };
}

export default Todo;
</script>
