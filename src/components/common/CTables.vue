<template>
  <el-row :gutter="12">
    <el-col
      :sx="24"
      :sm="12"
      :md="8"
      :lg="6"
      :xl="4"
      v-for="table in tables"
      :key="table.id"
      class="my-1"
      @click="joinTable(table)"
    >
      <el-card
        class="bg-success"
        :class="{ 'bg-danger': !table.is_available || !!table.in_table_staff }"
      >
        <h1 class="fw-bold">{{ table.name }}</h1>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { ERouterParams } from "@/enums/common";
import { ERouter } from "@/enums/routers";
import { ESCart, ESTable } from "@/enums/store";
import { formURL } from "@/util/url";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  props: ["tables"],
  setup() {
    const router = useRouter();
    const store = useStore();
    const joinTable = async (table: any) => {
      if (table.is_available && !table.in_table_staff) {
        await store.dispatch(ESTable.A_JOIN_TABLE, table.id);
        const URL = formURL(ERouter.TABLE, [
          { key: ERouterParams.INDEX, value: table.id },
        ]);
        router.push(URL);
      }
    };

    return { joinTable };
  },
});
</script>

<style scoped></style>
