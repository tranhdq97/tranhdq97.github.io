<template>
  <SignIn />
</template>

<script lang="ts">
import SignIn from "@/components/auth/SignIn.vue";
import { ERouter } from "@/enums/routers";
import { EAssets, ECommon, EPlaceHolder } from "@/enums/common";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    return {
      ECommon,
      EPlaceHolder,
      ERouter,
      router,
      email,
      password,
      EAssets,
    };
  },
  components: { SignIn },
});
</script>
<!-- <style lang="scss" scoped>
.container {
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style> -->
