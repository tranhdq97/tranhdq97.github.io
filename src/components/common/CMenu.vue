<template>
  <el-row :gutter="12">
    <c-meal v-for="meal in meals" :key="meal.id" :meal="meal" />
  </el-row>
</template>

<script lang="ts">
import { ESCart, ESItem } from "@/enums/store";
import { computed, defineComponent, reactive, watch } from "vue";
import { useStore } from "vuex";
import CMeal from "./CMeal.vue";

export default defineComponent({
  components: { CMeal },
  props: ["meals"],
  setup(props) {
    const store = useStore();
    const addMeal = (meal: any) => {
      store.dispatch(ESCart.A_ADD_MEAL, meal);
    };
    const state = reactive({
      quantityInput: {},
    });
    watch(
      () => props.meals,
      () => {
        state.quantityInput = props.meals.reduce(
          (acc: any, meal: any) => ((acc[meal.id] = 0), acc),
          {}
        );
      },
      { deep: true }
    );
    const handleChangeQuantity = (id: any, quantity: any) => {
      store.dispatch(ESItem.A_CHANGE_QUANTITY, { id, quantity });
    };

    return { addMeal, state, handleChangeQuantity };
  },
});
</script>

<style scoped></style>
