<template>
  <SignUp />
</template>

<script lang="ts">
import SignUp from "@/components/auth/SignUp.vue";
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
  components: { SignUp },
});
</script>

<!-- <style lang="scss" scoped>
.container {
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style> -->
