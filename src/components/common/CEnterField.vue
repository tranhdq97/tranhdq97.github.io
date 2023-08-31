<template>
  <div>
    <div>{{ title }}</div>
    <input
      :type="type || 'text'"
      @input="$emit('value', value)"
      v-model="value"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    title: String,
    type: String,
  },
  setup() {
    const value = ref("");

    return { value };
  },
});
</script>

<style scoped></style>
