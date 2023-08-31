<template>
  <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="my-1"
    ><el-card :body-style="{ padding: '5px' }">
      <h3 class="fw-bold">{{ meal.name }}</h3>
      <span>{{
        meal.price.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })
      }}</span>
      <div style="padding: 14px">
        <el-input-number
          v-model="state.quantityInput"
          :min="0"
          size="mini"
        ></el-input-number>
      </div>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import { ESCart, ESItem } from "@/enums/store";
import { computed, defineComponent, reactive, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: ["meal"],
  setup(props) {
    const store = useStore();
    const addMeal = (meal: any) => {
      store.dispatch(ESCart.A_ADD_MEAL, meal);
    };
    const state = reactive({
      quantityInput: props.meal.quantity,
    });
    watch(
      () => state.quantityInput,
      (quantity: number) => {
        store.dispatch(ESItem.A_CHANGE_QUANTITY, {
          id: props.meal.id,
          quantity,
        });
      }
    );
    watch(
      () => props.meal.quantity,
      (quantity: number) => {
        state.quantityInput = quantity;
      }
    );
    const handleChangeQuantity = (quantity: number) => {
      store.dispatch(ESItem.A_CHANGE_QUANTITY, { id: props.meal.id, quantity });
    };

    return { addMeal, state, handleChangeQuantity };
  },
});
</script>

<style scoped></style>
