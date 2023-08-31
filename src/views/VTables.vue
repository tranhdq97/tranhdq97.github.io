<template>
  <c-tables :tables="tables" />
</template>

<script lang="ts">
import { ESTable } from "@/enums/store";
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import CTables from "@/components/common/CTables.vue";

export default defineComponent({
  components: {
    CTables,
  },
  setup() {
    const store = useStore();
    const tables = computed(() => store.getters[ESTable.G_TABLES]);
    store.dispatch(ESTable.A_GET_TABLES);
    return { tables };
  },
});
</script>
<style scoped></style>
