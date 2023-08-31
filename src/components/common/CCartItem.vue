<template>
  <el-card
    :body-style="{
      display: 'flex',
      'justify-content': 'space-between',
      'align-items': 'center',
    }"
  >
    <h1 class="fw-bold">{{ orderItem.item__name }}</h1>
    <div class="d-flex gap-3">
      <h1 class="fw-bold">{{ orderItem.quantity }}</h1>
      <el-dropdown>
        <el-button plain><i class="el-icon-more"></i> </el-button>

        <template v-slot:dropdown>
          <el-card>
            <el-dropdown-item @click="state.dialogFormVisible = true"
              >Edit</el-dropdown-item
            >
            <el-dropdown-item>Change Table</el-dropdown-item>
            <el-dropdown-item @click="handleRemove">Remove</el-dropdown-item>
          </el-card>
        </template>
      </el-dropdown>
    </div>

    <!-- <div class="d-flex gap-2 align-items-center">
      <el-input-number
        :disabled="!state.editting"
        v-model="state.quantity"
        :min="1"
      ></el-input-number>
      <el-button
        v-if="state.editting"
        type="success"
        circle
        @click="handleChangeQuantity"
        ><i class="el-icon-check"></i
      ></el-button>
      <el-button
        v-if="state.editting"
        type="danger"
        circle
        @click="state.editting = false"
        class="m-0"
        ><i class="el-icon-close"></i
      ></el-button>

      <el-button v-else type="warning" circle @click="state.editting = true"
        ><i class="el-icon-edit"></i
      ></el-button>

      <el-button type="danger" circle class="m-0" @click="handleRemove"
        ><i class="el-icon-delete"
      /></el-button>
    </div> -->
  </el-card>
  <el-dialog
    class="position-fixed top-50 start-50 translate-middle"
    title="Edit"
    v-model="state.dialogFormVisible"
    style="min-width: 350px"
  >
    <el-form :model="form">
      <el-form-item label="Meal" :label-width="formLabelWidth">
        <el-select v-model="state.form.item_id" placeholder="Select" filterable>
          <el-option
            v-for="meal in meals"
            :key="meal.id"
            :label="meal.name"
            :value="meal.id"
          >
            <span style="float: left">{{ meal.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              meal.price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Quantity" :label-width="formLabelWidth">
        <el-input-number
          v-model="state.form.quantity"
          :min="1"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <template v-slot:footer
      ><span class="dialog-footer">
        <el-button @click="state.dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleChangeQuantity"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ESCart, ESItem, ESOrderItem } from "@/enums/store";
import { computed, defineComponent, reactive, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: ["orderItem"],
  emits: ["change"],
  setup(props, { emit }) {
    const store = useStore();
    const state = reactive({
      quantity: props.orderItem.quantity,
      mealId: props.orderItem.item__id,
      editting: false,
      dialogFormVisible: false,
      form: {
        item_id: props.orderItem.item__id,
        quantity: props.orderItem.quantity,
      },
    });
    const meals = computed(() => store.getters[ESItem.G_ALL_MEALS]);
    const handleChangeQuantity = async () => {
      await store.dispatch(ESOrderItem.A_CHANGE_QUANTITY, {
        id: props.orderItem.id,
        data: state.form,
      });
      emit("change");
      state.dialogFormVisible = false;
    };
    const handleRemove = async () => {
      await store.dispatch(ESOrderItem.A_REMOVE, props.orderItem.id);
      emit("change");
    };
    return { state, handleChangeQuantity, meals, handleRemove };
  },
});
</script>

<style scoped>
.el-select__input {
  display: none;
}
</style>
