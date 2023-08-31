<template>
  <div>{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    type: String,
  },
});
</script>

<style scoped>
div:hover {
  background: gray;
}
</style>
