<template>
  <el-container>
    <el-header class="px-0 position-sticky top-0 hightIndex">
      <el-card shadow="always">
        <div class="d-flex justify-content-between align-items-center gap-3">
          <h3 class="fw-bold d-none d-sm-inline">Menu</h3>
          <el-badge :value="totalQuantity" class="item">
            <el-select v-model="state.searchType" placeholder="Select">
              <el-option label="All" :value="0"></el-option>
              <el-option label="Pending" :value="1"></el-option>
            </el-select>
          </el-badge>

          <el-input
            v-model="state.searchKeyword"
            placeholder="Search"
            class="input-with-select"
          >
          </el-input>
          <el-badge :value="cartQuantity" class="item">
            <el-button @click="showCart = true">
              <i class="el-icon-shopping-cart-1"></i>
            </el-button>
          </el-badge>

          <el-drawer
            class="position-fixed"
            v-model="showCart"
            size="100%"
            :with-header="false"
          >
            <div class="d-flex justify-content-between align-items-center p-2">
              <h3 class="fw-bold">Cart</h3>

              <i
                class="el-icon-circle-close fs-4"
                @click="showCart = false"
              ></i>
            </div>
            <c-cart :orderItems="orderItems" @change="getOrderItems" />
          </el-drawer>
        </div>
      </el-card>
    </el-header>
    <el-main
      class="d-flex flex-column align-items-center gap-3 justify-content-start pb-5"
    >
      <c-menu class="w-100" :meals="meals"></c-menu>
      <h1 class="fw-bold mb-3">Total: {{ totalPrice }}</h1>
      <el-button
        v-if="!showCart"
        class="position-fixed bottom-0 start-50 translate-middle hightIndex"
        type="warning"
        round
        @click="order"
        >Order</el-button
      >
    </el-main>
  </el-container>
</template>

<script lang="ts">
import CMenu from "@/components/common/CMenu.vue";
import { ESCart, ESItem, ESOrder, ESTable } from "@/enums/store";
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  reactive,
  ref,
  watch,
} from "vue";
import { useStore } from "vuex";
import CCart from "@/components/common/CCart.vue";
import { ElNotification } from "element-plus";

export default defineComponent({
  components: { CMenu, CCart },
  props: ["id"],
  setup(props: any) {
    const store = useStore();
    const meals = computed(() => store.getters[ESItem.G_MEALS]);

    const getOrderItems = () =>
      store.dispatch(ESCart.A_GET_ORDER_ITEMS, props.id);

    const orderItems = computed(() => store.getters[ESCart.G_ORDER_ITEMS]);
    const showCart = ref(false);
    onBeforeUnmount(async () => {
      await store.dispatch(ESTable.A_OUT_TABLE, props.id);
    });
    const state = reactive({
      searchKeyword: "",
      searchType: 0,
    });
    const totalQuantity = computed(() =>
      meals.value.reduce((total: number, meal: any) => {
        if (state.searchType === 0) {
          total++;
        } else {
          total += meal.quantity;
        }
        return total;
      }, 0)
    );
    const mealOrdering = computed(() =>
      store.getters[ESItem.G_ALL_MEALS].filter((meal: any) => meal.quantity > 0)
    );
    const totalPrice = computed(() =>
      mealOrdering.value
        .filter((meal: any) => meal.quantity > 0)
        .reduce(
          (total: number, meal: any) => (
            (total += meal.quantity * meal.price), total
          ),
          0
        )
        .toLocaleString("vi", { style: "currency", currency: "VND" })
    );
    const cartQuantity = computed(() => store.getters[ESCart.G_TOTAL_QUANTITY]);
    const order = () => {
      const order_items = mealOrdering.value.map((meal: any) => ({
        item_id: meal.id,
        quantity: meal.quantity,
      }));
      if (order_items.length > 0) {
        store.dispatch(ESOrder.A_ORDER, { table_id: props.id, order_items });
      } else {
        ElNotification({
          title: "Error",
          message: "Chưa chọn món",
          type: "error",
        });
      }
    };
    store.dispatch(ESItem.A_GET_MEALS);
    getOrderItems();

    watch(
      () => state.searchKeyword,
      (keyword: string) => {
        store.dispatch(ESItem.A_CHANGE_KEYWORD, keyword);
      }
    );
    watch(
      () => state.searchType,
      (quantity: number) => {
        store.dispatch(ESItem.A_CHANGE_QUANTITY_SEARCH, quantity);
      }
    );
    return {
      meals,
      orderItems,
      showCart,
      state,
      totalQuantity,
      totalPrice,
      order,
      cartQuantity,
      getOrderItems,
    };
  },
});
</script>
<style scoped>
.hightIndex {
  z-index: 2;
}
</style>
