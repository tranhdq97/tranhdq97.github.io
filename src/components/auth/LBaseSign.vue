<template>
  <div>
    <CEnterField title="Email" @value="(value) => (email = value)" />
    <CEnterField
      title="Password "
      type="password"
      @value="(value) => (password = value)"
    />
    <CButton :title="button_title" @click="func" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CEnterField from "../common/CEnterField.vue";
import CButton from "../common/CButton.vue";
import { useStore } from "vuex";
import { ESAuth } from "@/enums/store";
import { useRouter } from "vue-router";
import { ERouter } from "@/enums/routers";
import { EIDAuthType } from "@/enums/value_id";

export default defineComponent({
  components: { CEnterField, CButton },
  props: {
    button_title: String,
    func_type: Number,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    async function signin() {
      await store.dispatch(ESAuth.A_SIGN_IN, {
        email: email.value,
        password: password.value,
      });
      router.push(ERouter.HOME);
    }
    async function signup() {
      await store.dispatch(ESAuth.A_SIGN_UP, {
        email: email.value,
        password: password.value,
      });
      router.push(ERouter.SIGNIN);
    }
    async function func() {
      if (props.func_type == EIDAuthType.SIGN_IN) {
        signin();
      } else {
        signup();
      }
    }

    return { email, password, func };
  },
});
</script>

<style scoped></style>
