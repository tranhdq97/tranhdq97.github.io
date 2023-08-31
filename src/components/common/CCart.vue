<template>
  <div>
    <c-cart-item
      v-for="item in orderItems"
      :key="item.id"
      :orderItem="item"
      @change="$emit('change')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CCartItem from "./CCartItem.vue";

export default defineComponent({
  components: { CCartItem },
  props: ["orderItems"],
});
</script>

<style scoped></style>
