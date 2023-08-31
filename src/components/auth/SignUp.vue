<template>
  <LBaseSign button_title="Sign Up" :func_type="authID.SIGN_UP" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LBaseSign from "@/components/auth/LBaseSign.vue";
import { EIDAuthType } from "@/enums/value_id";

export default defineComponent({
  components: { LBaseSign },
  props: {},
  setup() {
    const authID = EIDAuthType;
    return { authID };
  },
});
</script>

<style scoped></style>
