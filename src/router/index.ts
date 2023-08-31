import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import VSignUp from "@/views/VSignUp.vue";
import VSignIn from "@/views/VSignIn.vue";
import VHome from "@/views/VHome.vue";
// import VSetting from "@/views/VSetting.vue";
import VTables from "@/views/VTables.vue";
import VTable from "@/views/VTable.vue";
// import VStaffs from "@/views/VStaffs.vue";
// import VStaff from "@/views/VStaff.vue";
// import VMenu from "@/views/VMenu.vue";
// import VMeal from "@/views/VMeal.vue";
import { ERouter, ERouterName } from "@/enums/routers";
import { EMessage } from "@/enums/common";
// import { EIDStaffType } from "@/enums/value_id";
import { ESAuth } from "@/enums/store";
import { IFStaff } from "@/interfaces/staff";
import store from "@/store";
import i18n from "@/i18n";
import { EIDStaffType } from "@/enums/value_id";

const routes: Array<RouteRecordRaw> = [
  {
    path: ERouter.HOME,
    name: ERouterName.HOME,
    component: VHome,
    meta: {
      authRequired: true,
    },
  },
  {
    path: ERouter.SIGNUP,
    name: ERouterName.SIGNUP,
    component: VSignUp,
  },
  {
    path: ERouter.SIGNIN,
    name: ERouterName.SIGNIN,
    component: VSignIn,
  },
  // {
  //   path: ERouter.SETTING,
  //   name: ERouterName.SETTING,
  //   component: VSetting,
  //   meta: {
  //     authRequired: true,
  //     notAllowedRoles: [EIDStaffType.EMPLOYEE, EIDStaffType.UNAPPROVED],
  //   },
  // },
  {
    path: ERouter.TABLES,
    name: ERouterName.TABLES,
    component: VTables,
    meta: {
      authRequired: true,
      notAllowedRoles: [EIDStaffType.UNAPPROVED],
    },
  },
  {
    path: ERouter.TABLE,
    name: ERouterName.TABLE,
    component: VTable,
    props: true,
    meta: {
      authRequired: true,
      notAllowedRoles: [EIDStaffType.UNAPPROVED],
    },
  },
  // {
  //   path: ERouter.STAFFS,
  //   name: ERouterName.STAFFS,
  //   component: VStaffs,
  //   meta: {
  //     authRequired: true,
  //     notAllowedRoles: [EIDStaffType.UNAPPROVED, EIDStaffType.EMPLOYEE],
  //   },
  // },
  // {
  //   path: ERouter.STAFF,
  //   name: ERouterName.STAFF,
  //   component: VStaff,
  //   meta: {
  //     authRequired: true,
  //     notAllowedRoles: [EIDStaffType.UNAPPROVED],
  //     selfViewRoles: [EIDStaffType.EMPLOYEE],
  //   },
  // },
  // {
  //   path: ERouter.MENU,
  //   name: ERouterName.MENU,
  //   component: VMenu,
  //   meta: {
  //     authRequired: false,
  //   },
  // },
  // {
  //   path: ERouter.MEAL,
  //   name: ERouterName.MEAL,
  //   component: VMeal,
  //   meta: {
  //     authRequired: false,
  //   },
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const user: IFStaff = store.getters[ESAuth.G_USER];
  if (
    to.matched.some(
      (record) => record?.meta?.authRequired && record?.meta?.notAllowedRoles
    )
  ) {
    const notAllowedRoleList = (to.meta.notAllowedRoles as number[]) || [];
    if (user && notAllowedRoleList.includes(user?.type?.id || -1)) {
      alert(i18n.t(EMessage.PERMISSION_DENIED));
    } else if (!user) {
      router.push(ERouter.SIGNIN);
    } else next();
  } else if (to.matched.some((record) => record?.meta?.authRequired)) {
    if (!user) {
      router.push(ERouter.SIGNIN);
    } else next();
  } else next();
});

export default router;
